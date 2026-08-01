import UIKit
import Capacitor
import FirebaseMessaging
import UserNotifications

final class PushNotificationHandler: NSObject, UNUserNotificationCenterDelegate {
    private let maxBridgeWaitAttempts = 10
    private let bridgeWaitInterval: TimeInterval = 0.2

    private let bridgeProvider: () -> CAPBridgeProtocol?

    init(bridgeProvider: @escaping () -> CAPBridgeProtocol? = { nil }) {
        self.bridgeProvider = bridgeProvider
    }

    func configure(application: UIApplication) {
        UNUserNotificationCenter.current().delegate = self
        application.registerForRemoteNotifications()
    }

    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
    ) {
        let userInfo = notification.request.content.userInfo
        Messaging.messaging().appDidReceiveMessage(userInfo)
        _ = bridgeProvider()?.notificationRouter.pushNotificationHandler?.willPresent(notification: notification)
        completionHandler([.alert, .sound, .badge])
    }

    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        let userInfo = response.notification.request.content.userInfo
        Messaging.messaging().appDidReceiveMessage(userInfo)
        forwardDidReceive(response: response)
        completionHandler()
    }

    /// 완전 종료 상태에서 알림을 탭해 앱이 새로 뜨는 경우, 이 델리게이트 콜백이
    /// Capacitor 브릿지(webView)가 아직 준비되기 전에 먼저 호출될 수 있다.
    /// 그 시점엔 bridgeProvider()가 nil이라 이벤트가 조용히 유실되므로,
    /// 브릿지가 생길 때까지 짧게 재시도한다.
    private func forwardDidReceive(response: UNNotificationResponse, attempt: Int = 0) {
        guard let pushNotificationHandler = bridgeProvider()?.notificationRouter.pushNotificationHandler else {
            guard attempt < maxBridgeWaitAttempts else { return }
            DispatchQueue.main.asyncAfter(deadline: .now() + bridgeWaitInterval) { [weak self] in
                self?.forwardDidReceive(response: response, attempt: attempt + 1)
            }
            return
        }
        pushNotificationHandler.didReceive(response: response)
    }

    func didRegisterForRemoteNotifications(with deviceToken: Data) {
        Messaging.messaging().apnsToken = deviceToken
        Messaging.messaging().token(completion: { (token, error) in
            if let error = error {
                NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
            } else if let token = token {
                NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: token)
            }
        })
    }

    func didFailToRegisterForRemoteNotifications(with error: Error) {
        NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
    }
}
