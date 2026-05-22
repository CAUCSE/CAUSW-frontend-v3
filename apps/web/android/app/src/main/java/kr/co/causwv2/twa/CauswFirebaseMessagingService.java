package kr.co.causwv2.twa;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.text.TextUtils;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Map;

import kr.co.causw.R;

public class CauswFirebaseMessagingService extends FirebaseMessagingService {
    private static final String DEFAULT_CHANNEL_ID = "default_channel_id";
    private static final String DEFAULT_CHANNEL_NAME = "Default Notifications";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        if (!AppVisibilityTracker.isForeground()) {
            return;
        }

        String title = getNotificationTitle(remoteMessage);
        String body = getNotificationBody(remoteMessage);

        if (TextUtils.isEmpty(title) && TextUtils.isEmpty(body)) {
            return;
        }

        ensureNotificationChannel();

        Intent launchIntent = getPackageManager().getLaunchIntentForPackage(getPackageName());
        if (launchIntent == null) {
            return;
        }

        launchIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);

        PendingIntent contentIntent = PendingIntent.getActivity(
            this,
            0,
            launchIntent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, DEFAULT_CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(body)
            .setStyle(new NotificationCompat.BigTextStyle().bigText(body))
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_MESSAGE)
            .setAutoCancel(true)
            .setContentIntent(contentIntent)
            .setDefaults(NotificationCompat.DEFAULT_ALL);

        NotificationManagerCompat.from(this)
            .notify((int) System.currentTimeMillis(), builder.build());
    }

    private void ensureNotificationChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return;
        }

        NotificationManager manager =
            (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null || manager.getNotificationChannel(DEFAULT_CHANNEL_ID) != null) {
            return;
        }

        NotificationChannel channel = new NotificationChannel(
            DEFAULT_CHANNEL_ID,
            DEFAULT_CHANNEL_NAME,
            NotificationManager.IMPORTANCE_HIGH
        );
        channel.setDescription(DEFAULT_CHANNEL_NAME);
        manager.createNotificationChannel(channel);
    }

    private String getNotificationTitle(RemoteMessage remoteMessage) {
        RemoteMessage.Notification notification = remoteMessage.getNotification();
        if (notification != null && !TextUtils.isEmpty(notification.getTitle())) {
            return notification.getTitle();
        }

        return remoteMessage.getData().getOrDefault("title", getApplicationInfo().loadLabel(getPackageManager()).toString());
    }

    private String getNotificationBody(RemoteMessage remoteMessage) {
        RemoteMessage.Notification notification = remoteMessage.getNotification();
        if (notification != null && !TextUtils.isEmpty(notification.getBody())) {
            return notification.getBody();
        }

        Map<String, String> data = remoteMessage.getData();
        String body = data.get("body");
        if (!TextUtils.isEmpty(body)) {
            return body;
        }

        return data.getOrDefault("message", "");
    }
}
