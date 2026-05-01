package kr.co.causwv2.twa;

import android.app.Activity;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;
import android.webkit.WebView;

import org.json.JSONException;
import org.json.JSONObject;

final class BackPressHandler {
    private static final int BACK_PRESS_TIMEOUT = 2000;
    private static final String HOME_PATH = "/home";
    private static final String SIGN_IN_PATH = "/auth/sign-in";
    private static final String BACK_STATE_SCRIPT =
        "(function(){"
            + "return JSON.stringify({"
            + "historyLength: window.history.length,"
            + "pathname: window.location.pathname"
            + "});"
            + "})();";
    private static final String GO_BACK_SCRIPT =
        "(function(){ window.history.back(); return true; })();";

    private final Activity activity;
    private final WebView webView;
    private final Handler handler = new Handler(Looper.getMainLooper());

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
            webView.goBack();
            return;
        }

        if (webView != null) {
            webView.evaluateJavascript(BACK_STATE_SCRIPT, value -> {
                if (shouldNavigateBack(value)) {
                    webView.evaluateJavascript(GO_BACK_SCRIPT, null);
                    return;
                }

                handleExitBackPress();
            });
            return;
        }

        handleExitBackPress();
    }

    void cleanup() {
        handler.removeCallbacks(resetBackPress);
    }

    private void handleExitBackPress() {
        if (backPressedOnce) {
            activity.finishAffinity();
            return;
        }

        backPressedOnce = true;
        Toast.makeText(activity, "한 번 더 누르면 종료됩니다.", Toast.LENGTH_SHORT).show();
        handler.postDelayed(resetBackPress, BACK_PRESS_TIMEOUT);
    }

    private boolean shouldNavigateBack(String rawValue) {
        if (rawValue == null || rawValue.isEmpty() || "null".equals(rawValue)) {
            return false;
        }

        try {
            String normalized = rawValue;
            if (normalized.startsWith("\"") && normalized.endsWith("\"")) {
                normalized = normalized.substring(1, normalized.length() - 1);
            }
            normalized = normalized.replace("\\\"", "\"");

            JSONObject state = new JSONObject(normalized);
            String pathname = state.optString("pathname", "");
            int historyLength = state.optInt("historyLength", 0);

            if (HOME_PATH.equals(pathname) || SIGN_IN_PATH.equals(pathname)) {
                return false;
            }

            return historyLength > 1;
        } catch (JSONException ignored) {
            return false;
        }
    }
}
