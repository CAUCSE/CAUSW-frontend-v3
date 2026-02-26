//TODO: 기능 구현 완료되면 필요한 로그 빼고 삭제하기
//TODO : 로그인 연결 후 알림 창 알림 잘 뜨는지 확인
//TODO : 취소 버튼 눌러서 앱 종료 deprecated된거 확인하기
package kr.co.causwv2.twa;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log; // ⭐️ 추가
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.core.view.WindowInsetsControllerCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowCompat;

import com.getcapacitor.BridgeActivity;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.firebase.messaging.FirebaseMessaging; // ⭐️ 추가
import com.kakao.sdk.auth.model.OAuthToken;
import com.kakao.sdk.common.KakaoSdk;
import com.kakao.sdk.common.util.Utility;
import com.kakao.sdk.user.UserApiClient;

import org.json.JSONException;
import org.json.JSONObject;

import kotlin.Unit;
import kotlin.jvm.functions.Function2;

public class MainActivity extends BridgeActivity {

    private boolean backPressedOnce = false;
    private static final int BACK_PRESS_TIMEOUT = 2000;
    private static final int RC_GOOGLE_SIGN_IN = 9001;
    private static final String TAG = "FCM_TEST"; // ⭐️ 로그 필터용 태그
    private static final String SOCIAL_LOGIN_TAG = "SOCIAL_LOGIN";
    private static final String KAKAO_NATIVE_APP_KEY = "4535709d7c684cff31a42bb2b522eed9";
    private static final String GOOGLE_WEB_CLIENT_ID =
        "1086770319771-hp040om1msg7r4o25u895b1pos47jkjt.apps.googleusercontent.com";
    private String pendingGoogleRequestId = null;
    private GoogleSignInClient googleSignInClient = null;

    private final Runnable resetBackPress = new Runnable() {
        @Override
        public void run() {
            backPressedOnce = false;
        }
    };

    private final Handler handler = new Handler();

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(true); // 상태바 아이콘 검정색
        controller.setAppearanceLightNavigationBars(true); // 네비게이션바(홈버튼) 아이콘 검정색
        setupNativeSafeAreaInsets();
        KakaoSdk.init(this, KAKAO_NATIVE_APP_KEY);
        Log.d(SOCIAL_LOGIN_TAG, "Kakao key hash: " + Utility.INSTANCE.getKeyHash(this));

        // ⭐️ FCM 토큰을 가져와서 로그에 출력하는 코드
        FirebaseMessaging.getInstance().getToken()
            .addOnCompleteListener(task -> {
                if (!task.isSuccessful()) {
                    Log.w(TAG, "FCM 토큰 가져오기 실패", task.getException());
                    return;
                }

                // 새로운 FCM 토큰 가져오기 성공
                String token = task.getResult();

                // 📍 Logcat에서 'FCM_TEST' 또는 'FCM 토큰'으로 검색하세요!
                System.out.println("📍 [FCM 토큰]: " + token);
                Log.d(TAG, "📍 [FCM 토큰]: " + token);
            });

        WebView webView = getBridge().getWebView();
        if (webView != null) {
            webView.getSettings().setTextZoom(100);
            SocialLoginBridge bridge = new SocialLoginBridge();
            webView.addJavascriptInterface(bridge, "AndroidSocialLogin");
            webView.addJavascriptInterface(bridge, "CauswSocialLoginBridge");
        }
    }

    private final class SocialLoginBridge {
        @JavascriptInterface
        public void requestSocialLogin(String payloadJson) {
            runOnUiThread(() -> handleSocialLoginRequest(payloadJson));
        }
    }

    private void handleSocialLoginRequest(String payloadJson) {
        Log.d(SOCIAL_LOGIN_TAG, "Bridge request received. payload=" + payloadJson);
        final JSONObject payload;
        try {
            payload = new JSONObject(payloadJson);
        } catch (JSONException e) {
            dispatchSocialLoginResult("kakao", "", null, "INVALID_PAYLOAD", "Invalid JSON payload.");
            return;
        }

        String provider = payload.optString("provider", "");
        String requestId = payload.optString("requestId", "");

        if (provider.isEmpty() || requestId.isEmpty()) {
            dispatchSocialLoginResult(
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

        dispatchSocialLoginResult(
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
                dispatchSocialLoginResult(
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
                dispatchSocialLoginResult(
                    "kakao",
                    requestId,
                    null,
                    "EMPTY_ACCESS_TOKEN",
                    "Kakao access token is empty."
                );
                return Unit.INSTANCE;
            }

            dispatchSocialLoginResult("kakao", requestId, accessToken, null, null);
            return Unit.INSTANCE;
        };

        // 계정 로그인 경로로 고정: 카카오톡 앱 SSO 자동 로그인 분기를 사용하지 않음.
        UserApiClient.getInstance().loginWithKakaoAccount(this, callback);
    }

    private void loginWithGoogle(String requestId) {
        Log.d(SOCIAL_LOGIN_TAG, "Google login requested. requestId=" + requestId);
        if (GOOGLE_WEB_CLIENT_ID == null || GOOGLE_WEB_CLIENT_ID.isEmpty()) {
            dispatchSocialLoginResult(
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
            .requestIdToken(GOOGLE_WEB_CLIENT_ID)
            .build();

        googleSignInClient = GoogleSignIn.getClient(this, options);
        pendingGoogleRequestId = requestId;

        googleSignInClient.signOut().addOnCompleteListener(task -> {
            Log.d(
                SOCIAL_LOGIN_TAG,
                "Google signOut completed. success="
                    + task.isSuccessful()
                    + ", requestId="
                    + requestId
            );
            Intent signInIntent = googleSignInClient.getSignInIntent();
            Log.d(SOCIAL_LOGIN_TAG, "Launching Google sign-in intent. requestId=" + requestId);
            startActivityForResult(signInIntent, RC_GOOGLE_SIGN_IN);
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Log.d(
            SOCIAL_LOGIN_TAG,
            "onActivityResult called. requestCode="
                + requestCode
                + ", resultCode="
                + resultCode
                + ", hasData="
                + (data != null)
        );

        if (requestCode != RC_GOOGLE_SIGN_IN) {
            return;
        }

        String requestId = pendingGoogleRequestId != null ? pendingGoogleRequestId : "";
        pendingGoogleRequestId = null;

        try {
            GoogleSignInAccount account =
                GoogleSignIn.getSignedInAccountFromIntent(data).getResult(ApiException.class);
            String idToken = account != null ? account.getIdToken() : null;

            if (idToken == null || idToken.isEmpty()) {
                dispatchSocialLoginResult(
                    "google",
                    requestId,
                    null,
                    "EMPTY_ACCESS_TOKEN",
                    "Google id token is empty."
                );
                return;
            }

            dispatchSocialLoginResult("google", requestId, idToken, null, null);
        } catch (ApiException e) {
            Log.e(
                SOCIAL_LOGIN_TAG,
                "Google login failed. statusCode="
                    + e.getStatusCode()
                    + ", message="
                    + e.getMessage()
                    + ", packageName="
                    + getPackageName()
                    + ", webClientId="
                    + GOOGLE_WEB_CLIENT_ID
                    + ", requestId="
                    + requestId,
                e
            );
            dispatchSocialLoginResult(
                "google",
                requestId,
                null,
                "GOOGLE_LOGIN_FAILED",
                e.getStatusCode() + ": " + e.getMessage()
            );
        } catch (Exception e) {
            Log.e(
                SOCIAL_LOGIN_TAG,
                "Google login failed with unexpected error. packageName="
                    + getPackageName()
                    + ", webClientId="
                    + GOOGLE_WEB_CLIENT_ID
                    + ", requestId="
                    + requestId,
                e
            );
            dispatchSocialLoginResult(
                "google",
                requestId,
                null,
                "GOOGLE_LOGIN_FAILED",
                e.getMessage()
            );
        }
    }

    private void dispatchSocialLoginResult(
        String provider,
        String requestId,
        String accessToken,
        String errorCode,
        String message
    ) {
        runOnUiThread(() -> {
            WebView webView = getBridge() != null ? getBridge().getWebView() : null;
            if (webView == null) {
                return;
            }

            if (accessToken != null && !accessToken.isEmpty()) {
                Log.d(
                    SOCIAL_LOGIN_TAG,
                    "Social login success. provider="
                        + provider
                        + ", requestId="
                        + requestId
                        + ", accessToken="
                        + accessToken
                );
            } else if (errorCode != null) {
                Log.e(
                    SOCIAL_LOGIN_TAG,
                    "Social login failed. provider="
                        + provider
                        + ", requestId="
                        + requestId
                        + ", errorCode="
                        + errorCode
                        + ", message="
                        + message
                );
            }

            JSONObject payload = new JSONObject();
            try {
                payload.put("provider", provider);
                payload.put("requestId", requestId);
                if (accessToken != null) payload.put("accessToken", accessToken);
                if (errorCode != null) payload.put("errorCode", errorCode);
                if (message != null) payload.put("message", message);
            } catch (JSONException e) {
                Log.e(SOCIAL_LOGIN_TAG, "Failed to build social login payload", e);
                return;
            }

            String payloadLiteral = payload.toString();
            String callbackScript =
                "window.__CAUSW_ON_NATIVE_SOCIAL_LOGIN__ && window.__CAUSW_ON_NATIVE_SOCIAL_LOGIN__("
                    + payloadLiteral
                    + ");";
            String eventScript =
                "window.dispatchEvent(new CustomEvent('causw:social-login-result', { detail: "
                    + payloadLiteral
                    + " }));";

            webView.evaluateJavascript(callbackScript, null);
            webView.evaluateJavascript(eventScript, null);
        });
    }

    private void setupNativeSafeAreaInsets() {
        View rootView = findViewById(android.R.id.content);
        if (rootView == null) {
            return;
        }

        ViewCompat.setOnApplyWindowInsetsListener(rootView, (view, windowInsets) -> {
            Insets insets = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout()
            );
            applyInsetsToWebViewFrame(insets);
            return windowInsets;
        });

        ViewCompat.requestApplyInsets(rootView);
    }

    private void applyInsetsToWebViewFrame(Insets insets) {
        WebView webView = getBridge() != null ? getBridge().getWebView() : null;
        if (webView == null) {
            return;
        }

        ViewGroup.LayoutParams lp = webView.getLayoutParams();
        if (!(lp instanceof ViewGroup.MarginLayoutParams)) {
            webView.setPadding(insets.left, insets.top, insets.right, insets.bottom);
            return;
        }

        ViewGroup.MarginLayoutParams marginLp = (ViewGroup.MarginLayoutParams) lp;
        if (marginLp.leftMargin == insets.left
            && marginLp.topMargin == insets.top
            && marginLp.rightMargin == insets.right
            && marginLp.bottomMargin == insets.bottom) {
            return;
        }

        marginLp.setMargins(insets.left, insets.top, insets.right, insets.bottom);
        webView.setLayoutParams(marginLp);
    }

    @Override
    public void onBackPressed() {
        if (getBridge().getWebView().canGoBack()) {
            super.onBackPressed();
            return;
        }

        if (backPressedOnce) {
            finishAffinity();
            return;
        }

        this.backPressedOnce = true;
        Toast.makeText(this, "한 번 더 누르면 종료됩니다.", Toast.LENGTH_SHORT).show();
        handler.postDelayed(resetBackPress, BACK_PRESS_TIMEOUT);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        handler.removeCallbacks(resetBackPress);
    }
}
