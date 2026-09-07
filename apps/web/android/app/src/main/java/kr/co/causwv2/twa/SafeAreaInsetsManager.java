package kr.co.causwv2.twa;

import android.net.Uri;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.webkit.ScriptHandler;
import androidx.webkit.WebViewCompat;
import androidx.webkit.WebViewFeature;

import com.getcapacitor.Bridge;
import com.getcapacitor.WebViewListener;

import java.util.Collections;
import java.util.Locale;

/**
 * 시스템 바 inset 처리.
 *
 * - 상단/좌우: WebView margin으로 밀어 웹 콘텐츠가 상태바에 가리지 않게 한다.
 * - 하단: WebView가 네비게이션 바 영역까지 확장되도록 margin을 두지 않고,
 *   inset 값을 CSS 변수(--safe-area-inset-bottom)로 주입해 웹이 여백을 처리하게 한다.
 *   Android WebView는 env(safe-area-inset-bottom)으로 시스템 바 inset을 노출하지 않기 때문이다.
 *
 * 주입은 document start 스크립트(첫 페인트부터 반영)와 evaluateJavascript(이미 로드된 문서 갱신)를
 * 함께 쓴다. 서버 HTML에는 없는 인라인 스타일이므로 웹 layout.tsx에서 hydration 경고를 억제한다.
 */
final class SafeAreaInsetsManager {
    private static final String TAG = "SafeAreaInsets";
    private static final String SAFE_AREA_BOTTOM_CSS_VARIABLE = "--safe-area-inset-bottom";

    private final View rootView;
    private final WebView webView;
    private final Bridge bridge;
    private int lastBottomInsetPx = -1;
    private String allowedOriginRule;
    private ScriptHandler documentStartScriptHandler;

    SafeAreaInsetsManager(View rootView, WebView webView, Bridge bridge) {
        this.rootView = rootView;
        this.webView = webView;
        this.bridge = bridge;
    }

    void setup() {
        if (rootView == null) {
            return;
        }

        allowedOriginRule = resolveAllowedOriginRule();

        ViewCompat.setOnApplyWindowInsetsListener(rootView, (view, windowInsets) -> {
            Insets insets = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout()
            );
            applyInsetsToWebViewFrame(insets);
            updateBottomInset(insets.bottom);
            return windowInsets;
        });
        ViewCompat.requestApplyInsets(rootView);

        if (bridge != null) {
            // document start 스크립트가 없거나(WebView 105 미만) 등록 전에 시작된 로드를 보정한다.
            bridge.addWebViewListener(new WebViewListener() {
                @Override
                public void onPageLoaded(WebView loadedWebView) {
                    injectBottomInsetToWeb();
                }
            });
        }
    }

    void cleanup() {
        removeDocumentStartInjection();
    }

    private void applyInsetsToWebViewFrame(Insets insets) {
        if (webView == null) {
            return;
        }

        ViewGroup.LayoutParams lp = webView.getLayoutParams();
        if (!(lp instanceof ViewGroup.MarginLayoutParams)) {
            webView.setPadding(insets.left, insets.top, insets.right, 0);
            return;
        }

        ViewGroup.MarginLayoutParams marginLp = (ViewGroup.MarginLayoutParams) lp;
        if (marginLp.leftMargin == insets.left
            && marginLp.topMargin == insets.top
            && marginLp.rightMargin == insets.right
            && marginLp.bottomMargin == 0) {
            return;
        }

        marginLp.setMargins(insets.left, insets.top, insets.right, 0);
        webView.setLayoutParams(marginLp);
    }

    private void updateBottomInset(int bottomInsetPx) {
        if (lastBottomInsetPx == bottomInsetPx) {
            return;
        }

        lastBottomInsetPx = bottomInsetPx;
        registerDocumentStartInjection();
        injectBottomInsetToWeb();
    }

    private void injectBottomInsetToWeb() {
        if (webView == null || lastBottomInsetPx < 0) {
            return;
        }

        webView.evaluateJavascript(buildInjectionScript(), null);
    }

    /** 아직 커밋되지 않은 네비게이션부터 값이 적용되도록 스크립트를 새 값으로 교체 등록한다. */
    private void registerDocumentStartInjection() {
        if (webView == null || lastBottomInsetPx < 0 || allowedOriginRule == null) {
            return;
        }
        if (!WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT)) {
            return;
        }

        removeDocumentStartInjection();

        try {
            documentStartScriptHandler = WebViewCompat.addDocumentStartJavaScript(
                webView,
                buildInjectionScript(),
                Collections.singleton(allowedOriginRule)
            );
        } catch (IllegalArgumentException e) {
            Log.w(TAG, "Failed to register document start script for " + allowedOriginRule, e);
        }
    }

    private void removeDocumentStartInjection() {
        if (documentStartScriptHandler == null) {
            return;
        }

        documentStartScriptHandler.remove();
        documentStartScriptHandler = null;
    }

    private String buildInjectionScript() {
        float density = webView.getResources().getDisplayMetrics().density;
        float bottomInsetCssPx = lastBottomInsetPx / density;
        // document start 시점에는 documentElement가 아직 없을 수 있다.
        return String.format(
            Locale.US,
            "(function(){var root=document.documentElement;"
                + "if(root)root.style.setProperty('%s','%.2fpx');})();",
            SAFE_AREA_BOTTOM_CSS_VARIABLE,
            bottomInsetCssPx
        );
    }

    /** origin 규칙은 경로/쿼리 없는 scheme://host[:port] 형태여야 한다. */
    private String resolveAllowedOriginRule() {
        if (bridge == null) {
            return null;
        }

        String appUrl = bridge.getAppUrl();
        if (appUrl == null) {
            return null;
        }

        return Uri.parse(appUrl).buildUpon().path(null).fragment(null).clearQuery().build().toString();
    }
}
