package kr.co.causwv2.twa;

final class AppVisibilityTracker {
    private static volatile boolean isForeground = false;

    private AppVisibilityTracker() {}

    static boolean isForeground() {
        return isForeground;
    }

    static void setForeground(boolean foreground) {
        isForeground = foreground;
    }
}
