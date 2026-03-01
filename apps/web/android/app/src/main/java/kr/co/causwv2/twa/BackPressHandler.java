package kr.co.causwv2.twa;

import android.app.Activity;
import android.os.Handler;
import android.widget.Toast;
import android.webkit.WebView;

final class BackPressHandler {
    private static final int BACK_PRESS_TIMEOUT = 2000;

    private final Activity activity;
    private final WebView webView;
    private final Handler handler = new Handler();

    private boolean backPressedOnce = false;
    private final Runnable resetBackPress = new Runnable() {
        @Override
        public void run() {
            backPressedOnce = false;
        }
    };

    BackPressHandler(Activity activity, WebView webView) {
        this.activity = activity;
        this.webView = webView;
    }

    void handleBackPress() {
        if (webView != null && webView.canGoBack()) {
            activity.onBackPressed();
            return;
        }

        if (backPressedOnce) {
            activity.finishAffinity();
            return;
        }

        backPressedOnce = true;
        Toast.makeText(activity, "한 번 더 누르면 종료됩니다.", Toast.LENGTH_SHORT).show();
        handler.postDelayed(resetBackPress, BACK_PRESS_TIMEOUT);
    }

    void cleanup() {
        handler.removeCallbacks(resetBackPress);
    }
}
