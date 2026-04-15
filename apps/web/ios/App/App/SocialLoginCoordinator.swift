import UIKit
import WebKit
import AuthenticationServices
import KakaoSDKUser
import KakaoSDKAuth
import KakaoSDKCommon
import GoogleSignIn

final class SocialLoginCoordinator: NSObject, WKScriptMessageHandler, ASAuthorizationControllerDelegate, ASAuthorizationControllerPresentationContextProviding {
    private let socialLoginMessageHandlerNames = ["causwSocialLogin", "socialLogin"]
    private let kakaoNativeAppKeyProvider: () -> String
    private let googleClientIdProvider: () -> String
    private let windowProvider: () -> UIWindow?
    private let webViewProvider: () -> WKWebView?

    private var pendingAppleRequestId: String?

    init(
        kakaoNativeAppKeyProvider: @escaping () -> String,
        googleClientIdProvider: @escaping () -> String,
        windowProvider: @escaping () -> UIWindow?,
        webViewProvider: @escaping () -> WKWebView?
    ) {
        self.kakaoNativeAppKeyProvider = kakaoNativeAppKeyProvider
        self.googleClientIdProvider = googleClientIdProvider
        self.windowProvider = windowProvider
        self.webViewProvider = webViewProvider
    }

    func registerMessageHandlers() {
        guard let webView = webViewProvider() else { return }
        let userContentController = webView.configuration.userContentController
        for handlerName in socialLoginMessageHandlerNames {
            userContentController.removeScriptMessageHandler(forName: handlerName)
            userContentController.add(self, name: handlerName)
        }
    }

    func handleOpenURL(_ url: URL) -> Bool {
        if GIDSignIn.sharedInstance.handle(url) {
            return true
        }
        if AuthApi.isKakaoTalkLoginUrl(url) {
            return AuthController.handleOpenUrl(url: url)
        }
        return false
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard socialLoginMessageHandlerNames.contains(message.name) else { return }
        guard let body = message.body as? [String: Any] else { return }

        let provider = body["provider"] as? String
        let requestId = body["requestId"] as? String

        guard let provider, let requestId else {
            dispatchSocialLoginResult(
                provider: "kakao",
                requestId: requestId ?? "",
                accessToken: nil,
                idToken: nil,
                errorCode: "INVALID_PAYLOAD",
                message: "Missing provider or requestId."
            )
            return
        }

        switch provider {
        case "kakao":
            loginWithKakao(requestId: requestId)
        case "google":
            loginWithGoogle(requestId: requestId)
        case "apple":
            loginWithApple(requestId: requestId)
        default:
            dispatchSocialLoginResult(
                provider: provider,
                requestId: requestId,
                accessToken: nil,
                idToken: nil,
                errorCode: "UNSUPPORTED_PROVIDER",
                message: "Unsupported provider on iOS bridge."
            )
        }
    }

    private func loginWithKakao(requestId: String) {
        let completion: (OAuthToken?, Error?) -> Void = { [weak self] token, error in
            guard let self else { return }
            if let error {
                if self.isKakaoLoginCancelled(error) {
                    self.dispatchSocialLoginResult(
                        provider: "kakao",
                        requestId: requestId,
                        accessToken: nil,
                        idToken: nil,
                        errorCode: "KAKAO_LOGIN_CANCELLED",
                        message: "Kakao login cancelled."
                    )
                    return
                }
                self.dispatchSocialLoginResult(
                    provider: "kakao",
                    requestId: requestId,
                    accessToken: nil,
                    idToken: nil,
                    errorCode: "KAKAO_LOGIN_FAILED",
                    message: error.localizedDescription
                )
                return
            }

            guard let accessToken = token?.accessToken, !accessToken.isEmpty else {
                self.dispatchSocialLoginResult(
                    provider: "kakao",
                    requestId: requestId,
                    accessToken: nil,
                    idToken: nil,
                    errorCode: "EMPTY_ACCESS_TOKEN",
                    message: "Kakao access token is empty."
                )
                return
            }

            self.dispatchSocialLoginResult(
                provider: "kakao",
                requestId: requestId,
                accessToken: accessToken,
                idToken: nil,
                errorCode: nil,
                message: nil
            )
        }

        if UserApi.isKakaoTalkLoginAvailable() {
            UserApi.shared.loginWithKakaoTalk(completion: completion)
        } else {
            UserApi.shared.loginWithKakaoAccount(completion: completion)
        }
    }

    private func loginWithGoogle(requestId: String) {
        let googleClientId = googleClientIdProvider()
        guard !googleClientId.isEmpty else {
            dispatchSocialLoginResult(
                provider: "google",
                requestId: requestId,
                accessToken: nil,
                idToken: nil,
                errorCode: "GOOGLE_CLIENT_ID_MISSING",
                message: "Google client id is missing."
            )
            return
        }

        guard let rootViewController = windowProvider()?.rootViewController else {
            dispatchSocialLoginResult(
                provider: "google",
                requestId: requestId,
                accessToken: nil,
                idToken: nil,
                errorCode: "PRESENTING_VIEW_CONTROLLER_MISSING",
                message: "Unable to find presenting view controller."
            )
            return
        }

        GIDSignIn.sharedInstance.configuration = GIDConfiguration(clientID: googleClientId)

        GIDSignIn.sharedInstance.signIn(withPresenting: rootViewController) { [weak self] result, error in
            guard let self else { return }

            if let error {
                self.dispatchSocialLoginResult(
                    provider: "google",
                    requestId: requestId,
                    accessToken: nil,
                    idToken: nil,
                    errorCode: "GOOGLE_LOGIN_FAILED",
                    message: error.localizedDescription
                )
                return
            }

            guard let idToken = result?.user.idToken?.tokenString,
                  !idToken.isEmpty else {
                self.dispatchSocialLoginResult(
                    provider: "google",
                    requestId: requestId,
                    accessToken: nil,
                    idToken: nil,
                    errorCode: "EMPTY_ID_TOKEN",
                    message: "Google id token is empty."
                )
                return
            }

            self.dispatchSocialLoginResult(
                provider: "google",
                requestId: requestId,
                accessToken: nil,
                idToken: idToken,
                errorCode: nil,
                message: nil
            )
        }
    }

    private func loginWithApple(requestId: String) {
        if #available(iOS 13.0, *) {
            pendingAppleRequestId = requestId

            let provider = ASAuthorizationAppleIDProvider()
            let request = provider.createRequest()
            request.requestedScopes = [.fullName, .email]

            let authorizationController = ASAuthorizationController(authorizationRequests: [request])
            authorizationController.delegate = self
            authorizationController.presentationContextProvider = self
            authorizationController.performRequests()
            return
        }

        dispatchSocialLoginResult(
            provider: "apple",
            requestId: requestId,
            accessToken: nil,
            idToken: nil,
            errorCode: "APPLE_LOGIN_UNAVAILABLE",
            message: "Apple login requires iOS 13 or later."
        )
    }

    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        guard let requestId = pendingAppleRequestId else { return }
        pendingAppleRequestId = nil

        guard let appleCredential = authorization.credential as? ASAuthorizationAppleIDCredential else {
            dispatchSocialLoginResult(
                provider: "apple",
                requestId: requestId,
                accessToken: nil,
                idToken: nil,
                errorCode: "APPLE_CREDENTIAL_MISSING",
                message: "Apple credential is missing."
            )
            return
        }

        guard let identityTokenData = appleCredential.identityToken,
              let identityToken = String(data: identityTokenData, encoding: .utf8),
              !identityToken.isEmpty else {
            dispatchSocialLoginResult(
                provider: "apple",
                requestId: requestId,
                accessToken: nil,
                idToken: nil,
                errorCode: "EMPTY_ID_TOKEN",
                message: "Apple identity token is empty."
            )
            return
        }

        dispatchSocialLoginResult(
            provider: "apple",
            requestId: requestId,
            accessToken: nil,
            idToken: identityToken,
            errorCode: nil,
            message: nil
        )
    }

    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        guard let requestId = pendingAppleRequestId else { return }
        pendingAppleRequestId = nil

        if isAppleLoginCancelled(error) {
            dispatchSocialLoginResult(
                provider: "apple",
                requestId: requestId,
                accessToken: nil,
                idToken: nil,
                errorCode: "APPLE_LOGIN_CANCELLED",
                message: "Apple login cancelled."
            )
            return
        }

        dispatchSocialLoginResult(
            provider: "apple",
            requestId: requestId,
            accessToken: nil,
            idToken: nil,
            errorCode: "APPLE_LOGIN_FAILED",
            message: error.localizedDescription
        )
    }

    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        return windowProvider() ?? ASPresentationAnchor()
    }

    private func dispatchSocialLoginResult(
        provider: String,
        requestId: String,
        accessToken: String?,
        idToken: String?,
        errorCode: String?,
        message: String?
    ) {
        guard let webView = webViewProvider() else {
            return
        }

        var payload: [String: Any] = [
            "provider": provider,
            "requestId": requestId
        ]

        if let accessToken {
            payload["accessToken"] = accessToken
        }
        if let idToken {
            payload["idToken"] = idToken
        }
        if let errorCode {
            payload["errorCode"] = errorCode
        }
        if let message {
            payload["message"] = message
        }

        guard JSONSerialization.isValidJSONObject(payload),
              let data = try? JSONSerialization.data(withJSONObject: payload),
              let jsonString = String(data: data, encoding: .utf8) else {
            return
        }

        let callbackScript =
            "window.__CAUSW_ON_NATIVE_SOCIAL_LOGIN__ && window.__CAUSW_ON_NATIVE_SOCIAL_LOGIN__(\(jsonString));"
        let eventScript =
            "window.dispatchEvent(new CustomEvent('causw:social-login-result', { detail: \(jsonString) }));"

        DispatchQueue.main.async {
            webView.evaluateJavaScript(callbackScript, completionHandler: nil)
            webView.evaluateJavaScript(eventScript, completionHandler: nil)
        }
    }

    private func isKakaoLoginCancelled(_ error: Error) -> Bool {
        if let sdkError = error as? SdkError, sdkError.isClientFailed {
            return sdkError.getClientError().reason == .Cancelled
        }
        let nsError = error as NSError
        if nsError.code == ASWebAuthenticationSessionError.canceledLogin.rawValue {
            return true
        }
        return nsError.localizedDescription.lowercased().contains("cancel")
    }

    private func isAppleLoginCancelled(_ error: Error) -> Bool {
        if let authError = error as? ASAuthorizationError {
            return authError.code == .canceled
        }
        let nsError = error as NSError
        return nsError.domain == ASAuthorizationError.errorDomain
            && nsError.code == ASAuthorizationError.canceled.rawValue
    }
}
