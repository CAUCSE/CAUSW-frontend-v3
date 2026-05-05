package kr.co.causwv2.twa;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebView;

import androidx.core.view.WindowInsetsControllerCompat;
import androidx.core.view.WindowCompat;

import kr.co.causw.R;

import com.getcapacitor.BridgeActivity;
import com.kakao.sdk.common.KakaoSdk;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends BridgeActivity {

    private static final String SOCIAL_LOGIN_TAG = "SOCIAL_LOGIN";

    private SocialLoginCoordinator socialLoginCoordinator;
    private SafeAreaInsetsManager safeAreaInsetsManager;
    private BackPressHandler backPressHandler;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(true); // 상태바 아이콘 검정색
        controller.setAppearanceLightNavigationBars(true); // 네비게이션바(홈버튼) 아이콘 검정색

        WebView webView = getBridge().getWebView();
        safeAreaInsetsManager = new SafeAreaInsetsManager(findViewById(android.R.id.content), webView);
        safeAreaInsetsManager.setup();

        String kakaoNativeAppKey = getString(R.string.kakao_native_app_key);
        String googleServerClientId = getString(R.string.google_server_client_id);
        KakaoSdk.init(this, kakaoNativeAppKey);

        socialLoginCoordinator = new SocialLoginCoordinator(
            this,
            this::dispatchSocialLoginResult,
            googleServerClientId
        );

        if (webView != null) {
            webView.getSettings().setTextZoom(100);
            socialLoginCoordinator.registerJavascriptInterfaces(webView);
        }

        backPressHandler = new BackPressHandler(this, webView);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (socialLoginCoordinator != null
            && socialLoginCoordinator.handleActivityResult(requestCode, resultCode, data)) {
            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    private void dispatchSocialLoginResult(
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
        runOnUiThread(() -> {
            WebView webView = getBridge() != null ? getBridge().getWebView() : null;
            if (webView == null) {
                return;
            }

            if (errorCode != null) {
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
                if (idToken != null) payload.put("idToken", idToken);
                if (authorizationCode != null) payload.put("authorizationCode", authorizationCode);
                if (codeVerifier != null) payload.put("codeVerifier", codeVerifier);
                if (platform != null) payload.put("platform", platform);
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

    @Override
    public void onBackPressed() {
        if (backPressHandler != null) {
            backPressHandler.handleBackPress();
            return;
        }
        super.onBackPressed();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (backPressHandler != null) {
            backPressHandler.cleanup();
        }
    }
}
