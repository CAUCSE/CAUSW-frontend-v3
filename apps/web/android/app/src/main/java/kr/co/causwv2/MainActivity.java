package kr.co.causwv2.twa;

import android.os.Bundle;
import android.os.Handler;
import android.webkit.WebView;
import android.widget.Toast;


import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

private boolean backPressedOnce = false;
    private static final int BACK_PRESS_TIMEOUT = 2000;

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
    

    WebView webView = getBridge().getWebView();
    if (webView != null) {
      webView.getSettings().setTextZoom(100);
    }
  }

    @Override
    public void onBackPressed() {
        // 웹뷰의 뒤로 가기 히스토리가 있는지 먼저 확인
        if (getBridge().getWebView().canGoBack()) {
            super.onBackPressed();
            return; // 이전 페이지로 이동하고 함수 종료
        }

        // 더 이상 돌아갈 페이지가 없을 때 (최초 진입 화면일 때)
        if (backPressedOnce) {
            super.onBackPressed();
            finishAffinity();
            return;
        }

        this.backPressedOnce = true;

        handler.postDelayed(resetBackPress, BACK_PRESS_TIMEOUT);
    }

    @Override
  public void onDestroy() {
        super.onDestroy();
        handler.removeCallbacks(resetBackPress);
    }
}