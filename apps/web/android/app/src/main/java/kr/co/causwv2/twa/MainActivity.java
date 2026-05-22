package kr.co.causwv2.twa;

import android.content.Intent;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.Log;
import android.view.View;
import android.view.ViewTreeObserver;
import android.view.ViewGroup;
import android.webkit.WebView;
import android.widget.FrameLayout;

import androidx.core.view.WindowInsetsControllerCompat;
import androidx.core.view.WindowCompat;

import kr.co.causw.R;

import com.getcapacitor.BridgeActivity;
import com.kakao.sdk.common.KakaoSdk;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends BridgeActivity {

    private static final String SOCIAL_LOGIN_TAG = "SOCIAL_LOGIN";
    private static final long MIN_OVERLAY_DISPLAY_MS = 250L;

    private SocialLoginCoordinator socialLoginCoordinator;
    private SafeAreaInsetsManager safeAreaInsetsManager;
    private BackPressHandler backPressHandler;
    private View rootView;
    private View launchOverlay;
    private WebView webView;
    private boolean hasDismissedLaunchOverlay = false;
    private long overlayShownAtMs = 0L;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(true); // 상태바 아이콘 검정색
        controller.setAppearanceLightNavigationBars(true); // 네비게이션바(홈버튼) 아이콘 검정색

        webView = getBridge().getWebView();
        rootView = findViewById(android.R.id.content);
        launchOverlay = createLaunchOverlay();
        overlayShownAtMs = SystemClock.elapsedRealtime();
        safeAreaInsetsManager = new SafeAreaInsetsManager(rootView, webView);
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
            observeFirstContentDraw(webView);
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

    @Override
    public void onResume() {
        super.onResume();
        AppVisibilityTracker.setForeground(true);
    }

    @Override
    public void onPause() {
        AppVisibilityTracker.setForeground(false);
        super.onPause();
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
        AppVisibilityTracker.setForeground(false);
        super.onDestroy();
        if (backPressHandler != null) {
            backPressHandler.cleanup();
        }
    }

    private void observeFirstContentDraw(WebView targetWebView) {
        targetWebView
            .getViewTreeObserver()
            .addOnPreDrawListener(new ViewTreeObserver.OnPreDrawListener() {
                @Override
                public boolean onPreDraw() {
                    if (hasDismissedLaunchOverlay) {
                        removeThisListener(targetWebView, this);
                        return true;
                    }

                    boolean hasPageStarted = targetWebView.getUrl() != null;
                    boolean hasRenderableContent =
                        targetWebView.getProgress() > 0 && targetWebView.getContentHeight() > 0;

                    if (!hasPageStarted || !hasRenderableContent) {
                        return true;
                    }

                    removeThisListener(targetWebView, this);
                    dismissLaunchOverlay();
                    return true;
                }
            });
    }

    private void removeThisListener(WebView targetWebView, ViewTreeObserver.OnPreDrawListener listener) {
        ViewTreeObserver observer = targetWebView.getViewTreeObserver();
        if (observer.isAlive()) {
            observer.removeOnPreDrawListener(listener);
        }
    }

    private View createLaunchOverlay() {
        if (!(rootView instanceof ViewGroup)) {
            return null;
        }

        FrameLayout overlay = new FrameLayout(this);
        overlay.setBackgroundColor(0xFF000000);
        overlay.setLayoutParams(
            new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
        );
        ((ViewGroup) rootView).addView(overlay);
        return overlay;
    }

    private void dismissLaunchOverlay() {
        runOnUiThread(() -> {
            if (hasDismissedLaunchOverlay
                || launchOverlay == null
                || launchOverlay.getVisibility() != View.VISIBLE) {
                return;
            }

            long elapsed = SystemClock.elapsedRealtime() - overlayShownAtMs;
            if (elapsed < MIN_OVERLAY_DISPLAY_MS) {
                launchOverlay.postDelayed(this::dismissLaunchOverlay, MIN_OVERLAY_DISPLAY_MS - elapsed);
                return;
            }

            hasDismissedLaunchOverlay = true;
            launchOverlay.setVisibility(View.GONE);
            launchOverlay.setAlpha(1f);
        });
    }
}
