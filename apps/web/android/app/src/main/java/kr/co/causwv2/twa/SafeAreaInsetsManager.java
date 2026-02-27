package kr.co.causwv2.twa;

import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

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
            Insets insets = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout()
            );
            applyInsetsToWebViewFrame(insets);
            return windowInsets;
        });
        ViewCompat.requestApplyInsets(rootView);
    }

    private void applyInsetsToWebViewFrame(Insets insets) {
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
}
