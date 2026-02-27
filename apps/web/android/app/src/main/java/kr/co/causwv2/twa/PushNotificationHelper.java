package kr.co.causwv2.twa;

import android.util.Log;

import com.google.firebase.messaging.FirebaseMessaging;

final class PushNotificationHelper {
    private static final String TAG = "FCM_TEST";

    void fetchAndLogToken() {
        FirebaseMessaging.getInstance().getToken()
            .addOnCompleteListener(task -> {
                if (!task.isSuccessful()) {
                    Log.w(TAG, "FCM 토큰 가져오기 실패", task.getException());
                    return;
                }

                String token = task.getResult();
                System.out.println("📍 [FCM 토큰]: " + token);
                Log.d(TAG, "📍 [FCM 토큰]: " + token);
            });
    }
}
