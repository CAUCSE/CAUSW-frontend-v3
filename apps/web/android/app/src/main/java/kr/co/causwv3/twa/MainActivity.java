//TODO: 기능 구현 완료되면 필요한 로그 빼고 삭제하기
//TODO : 로그인 연결 후 알림 창 알림 잘 뜨는지 확인
//TODO : 취소 버튼 눌러서 앱 종료 deprecated된거 확인하기
package kr.co.causwv3.twa;

import android.os.Bundle;
import android.os.Handler;
import android.util.Log; // ⭐️ 추가
import android.webkit.WebView;
import android.widget.Toast;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.messaging.FirebaseMessaging; // ⭐️ 추가

public class MainActivity extends BridgeActivity {

    private boolean backPressedOnce = false;
    private static final int BACK_PRESS_TIMEOUT = 2000;
    private static final String TAG = "FCM_TEST"; // ⭐️ 로그 필터용 태그

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
        }
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