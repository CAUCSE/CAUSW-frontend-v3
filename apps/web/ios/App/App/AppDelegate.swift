import UIKit
import Capacitor
import FirebaseCore
import KakaoSDKCommon

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    private lazy var safeAreaManager: SafeAreaManager = {
        SafeAreaManager(bridgeViewControllerProvider: { [weak self] in
            self?.bridgeViewController()
        })
    }()

    private lazy var socialLoginCoordinator: SocialLoginCoordinator = {
        SocialLoginCoordinator(
            kakaoNativeAppKeyProvider: { [weak self] in
                self?.infoPlistString(forKey: "CAUSWKakaoNativeAppKey") ?? ""
            },
            googleClientIdProvider: { [weak self] in
                self?.infoPlistString(forKey: "CAUSWGoogleClientID") ?? ""
            },
            windowProvider: { [weak self] in
                self?.window
            },
            webViewProvider: { [weak self] in
                self?.bridgeViewController()?.webView
            }
        )
    }()

    private let pushNotificationHandler = PushNotificationHandler()

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        KakaoSDK.initSDK(appKey: infoPlistString(forKey: "CAUSWKakaoNativeAppKey"))
        FirebaseApp.configure()
        pushNotificationHandler.configure(application: application)
        
        print("✅ Running bundle id:", Bundle.main.bundleIdentifier ?? "nil")
        print("✅ Display name:", Bundle.main.object(forInfoDictionaryKey: "CFBundleDisplayName") ?? "nil")
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleDeviceOrientationDidChange),
            name: UIDevice.orientationDidChangeNotification,
            object: nil
        )
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleDidBecomeActive),
            name: UIApplication.didBecomeActiveNotification,
            object: nil
        )
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(handleWillEnterForeground),
            name: UIApplication.willEnterForegroundNotification,
            object: nil
        )
        UIDevice.current.beginGeneratingDeviceOrientationNotifications()

        DispatchQueue.main.async {
            self.configureBridgeWebView()
            self.safeAreaManager.startSafeAreaRecalculationCycle()
        }
        return true
    }

    @objc private func handleDeviceOrientationDidChange() {
        let orientation = UIDevice.current.orientation
        if isUnsupportedUpsideDownEvent(orientation) {
            return
        }
        safeAreaManager.startSafeAreaRecalculationCycle()
    }

    @objc private func handleDidBecomeActive() {
        safeAreaManager.startSafeAreaRecalculationCycle()
    }

    @objc private func handleWillEnterForeground() {
        safeAreaManager.startSafeAreaRecalculationCycle()
    }

    private func bridgeViewController() -> CAPBridgeViewController? {
        window?.rootViewController as? CAPBridgeViewController
    }

    private func configureBridgeWebView() {
        guard let bridgeViewController = bridgeViewController(),
              bridgeViewController.webView != nil else {
            return
        }
        print("🌐 WebView current URL:", bridgeViewController.webView?.url?.absoluteString ?? "nil")
        window?.backgroundColor = .white
        safeAreaManager.configureBridgeWebViewAppearance()
        socialLoginCoordinator.registerMessageHandlers()
    }

    private func isUnsupportedUpsideDownEvent(_ orientation: UIDeviceOrientation) -> Bool {
        guard orientation == .portraitUpsideDown else { return false }
        guard UIDevice.current.userInterfaceIdiom == .phone else { return false }
        return !isInterfaceOrientationSupported("UIInterfaceOrientationPortraitUpsideDown")
    }

    private func isInterfaceOrientationSupported(_ orientationValue: String) -> Bool {
        guard let values = Bundle.main.object(forInfoDictionaryKey: "UISupportedInterfaceOrientations") as? [String] else {
            return true
        }
        return values.contains(orientationValue)
    }

    private func infoPlistString(forKey key: String) -> String {
        if let value = Bundle.main.object(forInfoDictionaryKey: key) as? String,
           !value.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            return value
        }
        return ""
    }

    func applicationWillTerminate(_ application: UIApplication) {
        UIDevice.current.endGeneratingDeviceOrientationNotifications()
        NotificationCenter.default.removeObserver(self)
    }

    func application(
        _ app: UIApplication,
        open url: URL,
        options: [UIApplication.OpenURLOptionsKey: Any] = [:]
    ) -> Bool {
        if socialLoginCoordinator.handleOpenURL(url) {
            return true
        }
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(
        _ application: UIApplication,
        continue userActivity: NSUserActivity,
        restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
    ) -> Bool {
        return ApplicationDelegateProxy.shared.application(
            application,
            continue: userActivity,
            restorationHandler: restorationHandler
        )
    }

    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        pushNotificationHandler.didRegisterForRemoteNotifications(with: deviceToken)
    }

    func application(
        _ application: UIApplication,
        didFailToRegisterForRemoteNotificationsWithError error: Error
    ) {
        pushNotificationHandler.didFailToRegisterForRemoteNotifications(with: error)
    }
}
