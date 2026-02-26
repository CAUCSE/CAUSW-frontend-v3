import UIKit
import Capacitor
import FirebaseCore
import FirebaseMessaging
import UserNotifications
import WebKit
import KakaoSDKCommon
import KakaoSDKAuth
import KakaoSDKUser
import GoogleSignIn
  // TODO: 어느 정도 개발이 되면 필요한 log찍는 코드 빼고 print문 제거하기
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate, WKScriptMessageHandler {

    var window: UIWindow?
    private var didDetachWebViewConstraints = false
    private var safeAreaRecalcWorkItem: DispatchWorkItem?
    private let socialLoginMessageHandlerNames = ["causwSocialLogin", "socialLogin"]
    private let kakaoNativeAppKey = "4535709d7c684cff31a42bb2b522eed9"
    private let googleClientId = "1079571986006-lm19q7c395k7mvabrkq8vr64ci9qvb5i.apps.googleusercontent.com"

    private struct SafeAreaSnapshot: Equatable {
        let size: CGSize
        let origin: CGPoint
    }

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        KakaoSDK.initSDK(appKey: kakaoNativeAppKey)
        FirebaseApp.configure()
        UNUserNotificationCenter.current().delegate = self
        
        //이 문장이 있어야 'didRegisterForRemoteNotifications~~'가 호출됨 
        application.registerForRemoteNotifications()
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleDeviceOrientationDidChange),
            name: UIDevice.orientationDidChangeNotification,
            object: nil
        )
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleDidBecomeActive),
            name: UIApplication.didBecomeActiveNotification,
            object: nil
        )
        UIDevice.current.beginGeneratingDeviceOrientationNotifications()
        DispatchQueue.main.async {
            self.configureBridgeWebView()
            self.startSafeAreaRecalculationCycle()
        }
        return true
    }

    @objc private func handleDeviceOrientationDidChange() {
        let orientation = UIDevice.current.orientation
        if isUnsupportedUpsideDownEvent(orientation) {
            return
        }
        startSafeAreaRecalculationCycle()
    }

    @objc private func handleDidBecomeActive() {
        startSafeAreaRecalculationCycle()
    }

    private func configureBridgeWebView() {
        guard let bridgeViewController = self.window?.rootViewController as? CAPBridgeViewController,
              let webView = bridgeViewController.webView else {
            return
        }

        window?.backgroundColor = .white
        bridgeViewController.view.backgroundColor = .white
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.isOpaque = true
        webView.backgroundColor = .white
        webView.scrollView.backgroundColor = .white
        webView.translatesAutoresizingMaskIntoConstraints = true
        webView.autoresizingMask = []
        webView.alpha = 0
        registerSocialLoginMessageHandlers(on: webView)

        if !didDetachWebViewConstraints {
            detachWebViewConstraints(webView)
            didDetachWebViewConstraints = true
        }
    }

    private func registerSocialLoginMessageHandlers(on webView: WKWebView) {
        let userContentController = webView.configuration.userContentController
        for handlerName in socialLoginMessageHandlerNames {
            userContentController.removeScriptMessageHandler(forName: handlerName)
            userContentController.add(self, name: handlerName)
        }
    }

    private func startSafeAreaRecalculationCycle() {
        safeAreaRecalcWorkItem?.cancel()
        setBridgeWebViewVisible(false)
        recalculateSafeAreaUntilStable(remainingAttempts: 40, lastSnapshot: nil, stableCount: 0)
    }

    private func recalculateSafeAreaUntilStable(
        remainingAttempts: Int,
        lastSnapshot: SafeAreaSnapshot?,
        stableCount: Int
    ) {
        let workItem = DispatchWorkItem { [weak self] in
            guard let self else { return }
            guard let bridgeViewController = self.window?.rootViewController as? CAPBridgeViewController,
                  let webView = bridgeViewController.webView else {
                return
            }

            bridgeViewController.view.layoutIfNeeded()
            let safeFrameInBridge = bridgeViewController.view.safeAreaLayoutGuide.layoutFrame

            let hasValidBounds = safeFrameInBridge.width > 0 && safeFrameInBridge.height > 0
            let snapshot = SafeAreaSnapshot(
                size: safeFrameInBridge.size,
                origin: safeFrameInBridge.origin
            )

            let nextStableCount = (snapshot == lastSnapshot) ? (stableCount + 1) : 1
            if hasValidBounds && nextStableCount >= 3 {
                webView.frame = safeFrameInBridge
                self.setBridgeWebViewVisible(true)
                return
            }

            if remainingAttempts <= 0 {
                if hasValidBounds {
                    webView.frame = safeFrameInBridge
                }
                self.setBridgeWebViewVisible(true)
                return
            }

            self.recalculateSafeAreaUntilStable(
                remainingAttempts: remainingAttempts - 1,
                lastSnapshot: snapshot,
                stableCount: nextStableCount
            )
        }

        safeAreaRecalcWorkItem = workItem
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.06, execute: workItem)
    }

    private func isUnsupportedUpsideDownEvent(_ orientation: UIDeviceOrientation) -> Bool {
        guard orientation == .portraitUpsideDown else { return false }
        guard UIDevice.current.userInterfaceIdiom == .phone else { return false }
        return !isInterfaceOrientationSupported("UIInterfaceOrientationPortraitUpsideDown")
    }

    private func isInterfaceOrientationSupported(_ orientationValue: String) -> Bool {
        guard let values = Bundle.main.object(forInfoDictionaryKey: "UISupportedInterfaceOrientations") as? [String] else {
            return true
        }
        return values.contains(orientationValue)
    }

    private func setBridgeWebViewVisible(_ visible: Bool) {
        guard let bridgeViewController = self.window?.rootViewController as? CAPBridgeViewController,
              let webView = bridgeViewController.webView else {
            return
        }
        webView.alpha = visible ? 1 : 0
    }

    private func detachWebViewConstraints(_ webView: UIView) {
        guard let superview = webView.superview else { return }
        let relatedConstraints = superview.constraints.filter { constraint in
            (constraint.firstItem as? UIView) == webView || (constraint.secondItem as? UIView) == webView
        }
        NSLayoutConstraint.deactivate(relatedConstraints)
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
        default:
            dispatchSocialLoginResult(
                provider: provider,
                requestId: requestId,
                accessToken: nil,
                errorCode: "UNSUPPORTED_PROVIDER",
                message: "Unsupported provider on iOS bridge."
            )
        }
    }

    private func loginWithKakao(requestId: String) {
        let completion: (OAuthToken?, Error?) -> Void = { [weak self] token, error in
            guard let self else { return }
            if let error {
                self.dispatchSocialLoginResult(
                    provider: "kakao",
                    requestId: requestId,
                    accessToken: nil,
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
                    errorCode: "EMPTY_ACCESS_TOKEN",
                    message: "Kakao access token is empty."
                )
                return
            }

            self.dispatchSocialLoginResult(
                provider: "kakao",
                requestId: requestId,
                accessToken: accessToken,
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
        guard !googleClientId.isEmpty else {
            dispatchSocialLoginResult(
                provider: "google",
                requestId: requestId,
                accessToken: nil,
                errorCode: "GOOGLE_CLIENT_ID_MISSING",
                message: "Google client id is missing."
            )
            return
        }

        guard let rootViewController = window?.rootViewController else {
            dispatchSocialLoginResult(
                provider: "google",
                requestId: requestId,
                accessToken: nil,
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
                    errorCode: "GOOGLE_LOGIN_FAILED",
                    message: error.localizedDescription
                )
                return
            }

            guard let accessToken = result?.user.accessToken.tokenString,
                  !accessToken.isEmpty else {
                self.dispatchSocialLoginResult(
                    provider: "google",
                    requestId: requestId,
                    accessToken: nil,
                    errorCode: "EMPTY_ACCESS_TOKEN",
                    message: "Google access token is empty."
                )
                return
            }

            self.dispatchSocialLoginResult(
                provider: "google",
                requestId: requestId,
                accessToken: accessToken,
                errorCode: nil,
                message: nil
            )
        }
    }

    private func dispatchSocialLoginResult(
        provider: String,
        requestId: String,
        accessToken: String?,
        errorCode: String?,
        message: String?
    ) {
        guard let bridgeViewController = self.window?.rootViewController as? CAPBridgeViewController,
              let webView = bridgeViewController.webView else {
            return
        }

        var payload: [String: Any] = [
            "provider": provider,
            "requestId": requestId
        ]

        if let accessToken {
            payload["accessToken"] = accessToken
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
    
    
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
            
            //  알림이 잘 왔는지 확인하는 로그
            let userInfo = notification.request.content.userInfo
        
            // Firebase Messaging에 알림 정보를 전달합니다.
            Messaging.messaging().appDidReceiveMessage(userInfo)
            
            // 알림을 화면에 표시합니다.
            completionHandler([.alert, .sound, .badge])
        }
    //사용자가 알림을 탭했을 때 호출됩니다.
       func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
           
           //  알림 탭 액션 로그
           let userInfo = response.notification.request.content.userInfo
         
           
           // Firebase Messaging에 알림 정보를 전달합니다.
           Messaging.messaging().appDidReceiveMessage(userInfo)
           
           completionHandler()
       }
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        print("📍 APNs 등록 성공! 토큰 생성 시작...")
        Messaging.messaging().apnsToken = deviceToken
        Messaging.messaging().token(completion: { (token, error) in
            if let error = error {
                NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
            print("FCM 토큰 에러: \(error)\(error.localizedDescription)")
            } else if let token = token {
                NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: token)
            print("FCM 토큰: \(token)")
            }
        })
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
       print("❌ APNs 등록 실패: \(error.localizedDescription)")
      NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
    }
    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
        safeAreaRecalcWorkItem?.cancel()
        UIDevice.current.endGeneratingDeviceOrientationNotifications()
        NotificationCenter.default.removeObserver(self)
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        if GIDSignIn.sharedInstance.handle(url) {
            return true
        }

        if AuthApi.isKakaoTalkLoginUrl(url) {
            return AuthController.handleOpenUrl(url: url)
        }

        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

}
