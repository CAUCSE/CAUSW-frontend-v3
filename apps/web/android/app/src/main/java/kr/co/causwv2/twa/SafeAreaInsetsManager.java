package kr.co.causwv2.twa;

import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.Bridge;
import com.getcapacitor.WebViewListener;

import java.util.Locale;

/**
 * 시스템 바 inset 처리.
 *
 * - 상단/좌우: WebView margin으로 밀어 웹 콘텐츠가 상태바에 가리지 않게 한다.
 * - 하단: WebView가 네비게이션 바 영역까지 확장되도록 margin을 두지 않고,
 *   inset 값을 CSS 변수(--safe-area-inset-bottom)로 주입해 웹이 여백을 처리하게 한다.
 *   Android WebView는 env(safe-area-inset-bottom)으로 시스템 바 inset을 노출하지 않기 때문이다.
 */
final class SafeAreaInsetsManager {
    private static final String SAFE_AREA_BOTTOM_CSS_VARIABLE = "--safe-area-inset-bottom";

    private final View rootView;
    private final WebView webView;
    private final Bridge bridge;
    private int lastBottomInsetPx = -1;

    SafeAreaInsetsManager(View rootView, WebView webView, Bridge bridge) {
        this.rootView = rootView;
        this.webView = webView;
        this.bridge = bridge;
    }

    void setup() {
        if (rootView == null) {
            return;
        }
        ViewCompat.setOnApplyWindowInsetsListener(rootView, (view, windowInsets) -> {
            Insets insets = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout()
            );
            applyInsetsToWebViewFrame(insets);
            lastBottomInsetPx = insets.bottom;
            injectBottomInsetToWeb();
            return windowInsets;
        });
        ViewCompat.requestApplyInsets(rootView);

        if (bridge != null) {
            // 전체 페이지 로드(초기 진입, 새로고침)마다 document가 새로 만들어지므로 다시 주입한다.
            bridge.addWebViewListener(new WebViewListener() {
                @Override
                public void onPageLoaded(WebView loadedWebView) {
                    injectBottomInsetToWeb();
                }
            });
        }
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

    private void injectBottomInsetToWeb() {
        if (webView == null || lastBottomInsetPx < 0) {
            return;
        }

        float density = webView.getResources().getDisplayMetrics().density;
        float bottomInsetCssPx = lastBottomInsetPx / density;
        String script = String.format(
            Locale.US,
            "document.documentElement.style.setProperty('%s', '%.2fpx');",
            SAFE_AREA_BOTTOM_CSS_VARIABLE,
            bottomInsetCssPx
        );
        webView.evaluateJavascript(script, null);
    }
}
