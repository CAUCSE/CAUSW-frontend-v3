package kr.co.causwv2.twa;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;

import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.auth.api.signin.GoogleSignInStatusCodes;
import com.google.android.gms.common.api.CommonStatusCodes;
import com.kakao.sdk.common.model.ClientError;
import com.kakao.sdk.common.model.ClientErrorCause;
import com.kakao.sdk.auth.model.OAuthToken;
import com.kakao.sdk.user.UserApiClient;

import org.json.JSONException;
import org.json.JSONObject;

import kotlin.Unit;
import kotlin.jvm.functions.Function2;

final class SocialLoginCoordinator {
    interface ResultDispatcher {
        void dispatch(
            String provider,
            String requestId,
            String accessToken,
            String idToken,
            String authorizationCode,
            String codeVerifier,
            String platform,
            String errorCode,
            String message
        );
    }

    private static final String TAG = "SOCIAL_LOGIN";
    private static final int RC_GOOGLE_SIGN_IN = 9001;

    private final Activity activity;
    private final ResultDispatcher dispatcher;
    private final String googleWebClientId;

    private String pendingGoogleRequestId = null;
    private GoogleSignInClient googleSignInClient = null;

    SocialLoginCoordinator(Activity activity, ResultDispatcher dispatcher, String googleWebClientId) {
        this.activity = activity;
        this.dispatcher = dispatcher;
        this.googleWebClientId = googleWebClientId;
    }

    private void dispatch(
        String provider,
        String requestId,
        String accessToken,
        String idToken,
        String errorCode,
        String message
    ) {
        dispatcher.dispatch(
            provider,
            requestId,
            accessToken,
            idToken,
            null,
            null,
            null,
            errorCode,
            message
        );
    }

    private void dispatch(
        String provider,
        String requestId,
        String accessToken,
        String idToken,
        String authorizationCode,
        String codeVerifier,
        String platform,
        String errorCode,
        String message
    ) {
        dispatcher.dispatch(
            provider,
            requestId,
            accessToken,
            idToken,
            authorizationCode,
            codeVerifier,
            platform,
            errorCode,
            message
        );
    }

    void registerJavascriptInterfaces(WebView webView) {
        if (webView == null) {
            return;
        }
        SocialLoginBridge bridge = new SocialLoginBridge();
        webView.addJavascriptInterface(bridge, "AndroidSocialLogin");
        webView.addJavascriptInterface(bridge, "CauswSocialLoginBridge");
    }

    boolean handleActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode != RC_GOOGLE_SIGN_IN) {
            return false;
        }

        String requestId = pendingGoogleRequestId != null ? pendingGoogleRequestId : "";
        pendingGoogleRequestId = null;

        try {
            GoogleSignInAccount account =
                GoogleSignIn.getSignedInAccountFromIntent(data).getResult(ApiException.class);
            String idToken = account != null ? account.getIdToken() : null;
            String authorizationCode = account != null ? account.getServerAuthCode() : null;

            if (idToken == null || idToken.isEmpty()) {
                dispatch(
                    "google",
                    requestId,
                    null,
                    null,
                    "EMPTY_ID_TOKEN",
                    "Google id token is empty."
                );
                return true;
            }

            if (authorizationCode == null || authorizationCode.isEmpty()) {
                dispatch(
                    "google",
                    requestId,
                    null,
                    null,
                    "EMPTY_AUTHORIZATION_CODE",
                    "Google authorization code is empty."
                );
                return true;
            }

            dispatch(
                "google",
                requestId,
                null,
                idToken,
                authorizationCode,
                null,
                "android",
                null,
                null
            );
        } catch (ApiException e) {
            if (e.getStatusCode() == GoogleSignInStatusCodes.SIGN_IN_CANCELLED
                || e.getStatusCode() == CommonStatusCodes.CANCELED) {
                dispatch(
                    "google",
                    requestId,
                    null,
                    null,
                    "GOOGLE_LOGIN_CANCELLED",
                    "Google login cancelled."
                );
                return true;
            }
            Log.e(
                TAG,
                "Google login failed. statusCode="
                    + e.getStatusCode()
                    + ", resultCode="
                    + resultCode
                    + ", message="
                    + e.getMessage()
                    + ", packageName="
                    + activity.getPackageName()
                    + ", webClientId="
                    + googleWebClientId
                    + ", requestId="
                    + requestId,
                e
            );
            dispatch(
                "google",
                requestId,
                null,
                null,
                "GOOGLE_LOGIN_FAILED",
                e.getStatusCode() + ": " + e.getMessage()
            );
        } catch (Exception e) {
            Log.e(
                TAG,
                "Google login failed with unexpected error. resultCode="
                    + resultCode
                    + ", packageName="
                    + activity.getPackageName()
                    + ", webClientId="
                    + googleWebClientId
                    + ", requestId="
                    + requestId,
                e
            );
            dispatch(
                "google",
                requestId,
                null,
                null,
                "GOOGLE_LOGIN_FAILED",
                e.getMessage()
            );
        }
        return true;
    }

    private final class SocialLoginBridge {
        @JavascriptInterface
        public void requestSocialLogin(String payloadJson) {
            activity.runOnUiThread(() -> handleSocialLoginRequest(payloadJson));
        }
    }

    private void handleSocialLoginRequest(String payloadJson) {
        final JSONObject payload;
        try {
            payload = new JSONObject(payloadJson);
        } catch (JSONException e) {
            dispatch("kakao", "", null, null, "INVALID_PAYLOAD", "Invalid JSON payload.");
            return;
        }

        String provider = payload.optString("provider", "");
        String requestId = payload.optString("requestId", "");

        if (provider.isEmpty() || requestId.isEmpty()) {
            dispatch(
                "kakao",
                requestId,
                null,
                null,
                "INVALID_PAYLOAD",
                "Missing provider or requestId."
            );
            return;
        }

        if ("kakao".equals(provider)) {
            loginWithKakao(requestId);
            return;
        }

        if ("google".equals(provider)) {
            loginWithGoogle(requestId);
            return;
        }

        if ("apple".equals(provider)) {
            dispatch(
                "apple",
                requestId,
                null,
                null,
                "APPLE_LOGIN_UNSUPPORTED",
                "Apple login is not supported on Android."
            );
            return;
        }

        dispatch(
            provider,
            requestId,
            null,
            null,
            "UNSUPPORTED_PROVIDER",
            "Unsupported provider on Android bridge."
        );
    }

    private void loginWithKakao(String requestId) {
        if (UserApiClient.getInstance().isKakaoTalkLoginAvailable(activity)) {
            loginWithKakaoTalk(requestId);
        } else {
            loginWithKakaoAccount(requestId, false);
        }
    }

    private void loginWithKakaoTalk(String requestId) {
        Function2<OAuthToken, Throwable, Unit> callback = (token, error) -> {
            if (error != null) {
                if (isKakaoLoginCancelled(error)) {
                    dispatch(
                        "kakao",
                        requestId,
                        null,
                        null,
                        "KAKAO_LOGIN_CANCELLED",
                        "Kakao login cancelled."
                    );
                    return Unit.INSTANCE;
                }
                // KakaoTalk 앱에 로그인 정보가 없거나 인증 실패 시 계정 로그인으로 fallback
                activity.runOnUiThread(() -> loginWithKakaoAccount(requestId, true));
                return Unit.INSTANCE;
            }

            return handleKakaoToken(requestId, token);
        };

        UserApiClient.getInstance().loginWithKakaoTalk(activity, callback);
    }

    private void loginWithKakaoAccount(String requestId, boolean fallbackFromTalk) {
        Function2<OAuthToken, Throwable, Unit> callback = (token, error) -> {
            if (error != null) {
                if (isKakaoLoginCancelled(error)) {
                    dispatch(
                        "kakao",
                        requestId,
                        null,
                        null,
                        "KAKAO_LOGIN_CANCELLED",
                        "Kakao login cancelled."
                    );
                    return Unit.INSTANCE;
                }
                if (fallbackFromTalk && isKakaoTalkAccountNotConnected(error)) {
                    dispatch(
                        "kakao",
                        requestId,
                        null,
                        null,
                        "KAKAO_LOGIN_ACCOUNT_REQUIRED",
                        "KakaoTalk account is not connected. Please log in with Kakao account."
                    );
                    return Unit.INSTANCE;
                }
                dispatch(
                    "kakao",
                    requestId,
                    null,
                    null,
                    "KAKAO_LOGIN_FAILED",
                    error.getMessage()
                );
                return Unit.INSTANCE;
            }

            return handleKakaoToken(requestId, token);
        };

        UserApiClient.getInstance().loginWithKakaoAccount(activity, callback);
    }

    private Unit handleKakaoToken(String requestId, OAuthToken token) {
        String accessToken = token != null ? token.getAccessToken() : null;
        if (accessToken == null || accessToken.isEmpty()) {
            dispatch(
                "kakao",
                requestId,
                null,
                null,
                "EMPTY_ACCESS_TOKEN",
                "Kakao access token is empty."
            );
            return Unit.INSTANCE;
        }

        dispatch("kakao", requestId, accessToken, null, null, null);
        return Unit.INSTANCE;
    }

    private void loginWithGoogle(String requestId) {
        if (googleWebClientId == null || googleWebClientId.isEmpty()) {
            dispatch(
                "google",
                requestId,
                null,
                null,
                "GOOGLE_CLIENT_ID_MISSING",
                "Google web client id is missing."
            );
            return;
        }

        GoogleSignInOptions options = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .requestIdToken(googleWebClientId)
            .requestServerAuthCode(googleWebClientId)
            .build();

        googleSignInClient = GoogleSignIn.getClient(activity, options);
        pendingGoogleRequestId = requestId;

        googleSignInClient.signOut().addOnCompleteListener(task -> {
            Intent signInIntent = googleSignInClient.getSignInIntent();
            activity.startActivityForResult(signInIntent, RC_GOOGLE_SIGN_IN);
        });
    }

    private boolean isKakaoLoginCancelled(Throwable error) {
        if (error instanceof ClientError) {
            ClientError clientError = (ClientError) error;
            return clientError.getReason() == ClientErrorCause.Cancelled;
        }
        String message = error.getMessage();
        return message != null && message.toLowerCase().contains("cancel");
    }

    private boolean isKakaoTalkAccountNotConnected(Throwable error) {
        String message = error.getMessage();
        if (message == null) {
            return false;
        }
        String normalized = message.toLowerCase();
        return normalized.contains("not connected to kakao account")
            || normalized.contains("not connected");
    }
}
