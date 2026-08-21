package kr.co.causwv2.twa;

import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import androidx.core.view.ViewCompat;

final class SafeAreaInsetsManager {
    private final View rootView;
    private final WebView webView;

    SafeAreaInsetsManager(View rootView, WebView webView) {
        this.rootView = rootView;
        this.webView = webView;
    }

    void setup() {
        if (rootView == null) {
            return;
        }
        ViewCompat.setOnApplyWindowInsetsListener(rootView, (view, windowInsets) -> {
            applyEdgeToEdgeWebViewFrame();
            return windowInsets;
        });
        ViewCompat.requestApplyInsets(rootView);
    }

    private void applyEdgeToEdgeWebViewFrame() {
        if (webView == null) {
            return;
        }

        webView.setPadding(0, 0, 0, 0);
        ViewGroup.LayoutParams lp = webView.getLayoutParams();
        if (!(lp instanceof ViewGroup.MarginLayoutParams)) {
            return;
        }

        ViewGroup.MarginLayoutParams marginLp = (ViewGroup.MarginLayoutParams) lp;
        if (marginLp.leftMargin == 0
            && marginLp.topMargin == 0
            && marginLp.rightMargin == 0
            && marginLp.bottomMargin == 0) {
            return;
        }

        marginLp.setMargins(0, 0, 0, 0);
        webView.setLayoutParams(marginLp);
    }
}
