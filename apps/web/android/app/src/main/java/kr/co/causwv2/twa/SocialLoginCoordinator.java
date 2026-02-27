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
        void dispatch(String provider, String requestId, String accessToken, String errorCode, String message);
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

        if (resultCode == Activity.RESULT_CANCELED) {
            dispatcher.dispatch(
                "google",
                requestId,
                null,
                "GOOGLE_LOGIN_CANCELLED",
                "Google login cancelled."
            );
            return true;
        }

        try {
            GoogleSignInAccount account =
                GoogleSignIn.getSignedInAccountFromIntent(data).getResult(ApiException.class);
            String idToken = account != null ? account.getIdToken() : null;

            if (idToken == null || idToken.isEmpty()) {
                dispatcher.dispatch(
                    "google",
                    requestId,
                    null,
                    "EMPTY_ACCESS_TOKEN",
                    "Google id token is empty."
                );
                return true;
            }

            dispatcher.dispatch("google", requestId, idToken, null, null);
        } catch (ApiException e) {
            if (e.getStatusCode() == GoogleSignInStatusCodes.SIGN_IN_CANCELLED
                || e.getStatusCode() == CommonStatusCodes.CANCELED) {
                dispatcher.dispatch(
                    "google",
                    requestId,
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
            dispatcher.dispatch(
                "google",
                requestId,
                null,
                "GOOGLE_LOGIN_FAILED",
                e.getStatusCode() + ": " + e.getMessage()
            );
        } catch (Exception e) {
            Log.e(
                TAG,
                "Google login failed with unexpected error. packageName="
                    + activity.getPackageName()
                    + ", webClientId="
                    + googleWebClientId
                    + ", requestId="
                    + requestId,
                e
            );
            dispatcher.dispatch(
                "google",
                requestId,
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
        Log.d(TAG, "Bridge request received. payload=" + payloadJson);
        final JSONObject payload;
        try {
            payload = new JSONObject(payloadJson);
        } catch (JSONException e) {
            dispatcher.dispatch("kakao", "", null, "INVALID_PAYLOAD", "Invalid JSON payload.");
            return;
        }

        String provider = payload.optString("provider", "");
        String requestId = payload.optString("requestId", "");

        if (provider.isEmpty() || requestId.isEmpty()) {
            dispatcher.dispatch(
                "kakao",
                requestId,
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
            dispatcher.dispatch(
                "apple",
                requestId,
                null,
                "APPLE_LOGIN_UNSUPPORTED",
                "Apple login is not supported on Android."
            );
            return;
        }

        dispatcher.dispatch(
            provider,
            requestId,
            null,
            "UNSUPPORTED_PROVIDER",
            "Unsupported provider on Android bridge."
        );
    }

    private void loginWithKakao(String requestId) {
        Function2<OAuthToken, Throwable, Unit> callback = (token, error) -> {
            if (error != null) {
                if (isKakaoLoginCancelled(error)) {
                    dispatcher.dispatch(
                        "kakao",
                        requestId,
                        null,
                        "KAKAO_LOGIN_CANCELLED",
                        "Kakao login cancelled."
                    );
                    return Unit.INSTANCE;
                }
                dispatcher.dispatch(
                    "kakao",
                    requestId,
                    null,
                    "KAKAO_LOGIN_FAILED",
                    error.getMessage()
                );
                return Unit.INSTANCE;
            }

            String accessToken = token != null ? token.getAccessToken() : null;
            if (accessToken == null || accessToken.isEmpty()) {
                dispatcher.dispatch(
                    "kakao",
                    requestId,
                    null,
                    "EMPTY_ACCESS_TOKEN",
                    "Kakao access token is empty."
                );
                return Unit.INSTANCE;
            }

            dispatcher.dispatch("kakao", requestId, accessToken, null, null);
            return Unit.INSTANCE;
        };

        UserApiClient.getInstance().loginWithKakaoAccount(activity, callback);
    }

    private void loginWithGoogle(String requestId) {
        Log.d(TAG, "Google login requested. requestId=" + requestId);
        if (googleWebClientId == null || googleWebClientId.isEmpty()) {
            dispatcher.dispatch(
                "google",
                requestId,
                null,
                "GOOGLE_CLIENT_ID_MISSING",
                "Google web client id is missing."
            );
            return;
        }

        GoogleSignInOptions options = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .requestIdToken(googleWebClientId)
            .build();

        googleSignInClient = GoogleSignIn.getClient(activity, options);
        pendingGoogleRequestId = requestId;

        googleSignInClient.signOut().addOnCompleteListener(task -> {
            Log.d(
                TAG,
                "Google signOut completed. success="
                    + task.isSuccessful()
                    + ", requestId="
                    + requestId
            );
            Intent signInIntent = googleSignInClient.getSignInIntent();
            Log.d(TAG, "Launching Google sign-in intent. requestId=" + requestId);
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
}
