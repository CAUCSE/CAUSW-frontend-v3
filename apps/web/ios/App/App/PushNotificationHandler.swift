import UIKit
import Capacitor
import FirebaseMessaging
import UserNotifications

final class PushNotificationHandler: NSObject, UNUserNotificationCenterDelegate {
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
        bridgeProvider()?.notificationRouter.pushNotificationHandler?.didReceive(response: response)
        completionHandler()
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
