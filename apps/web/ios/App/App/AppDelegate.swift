import UIKit
import Capacitor
import FirebaseCore
import KakaoSDKCommon
import WebKit

private let minimumLaunchOverlayDisplayTime: TimeInterval = 0.25

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    private var webViewLoadingObserver: NSKeyValueObservation?
    private var webViewProgressObserver: NSKeyValueObservation?
    private var hasCompletedInitialWebViewLoad = false

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
            googleServerClientIdProvider: { [weak self] in
                self?.infoPlistString(forKey: "CAUSWGoogleServerClientID") ?? ""
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
    private let launchOverlayCoordinator = LaunchOverlayCoordinator()

    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        KakaoSDK.initSDK(appKey: infoPlistString(forKey: "CAUSWKakaoNativeAppKey"))
        FirebaseApp.configure()
        pushNotificationHandler.configure(application: application)

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
              let webView = bridgeViewController.webView else {
            return
        }
        let overlayContainerView: UIView = window ?? bridgeViewController.view
        launchOverlayCoordinator.installOverlayIfNeeded(in: overlayContainerView)
        observeInitialWebViewLoad(for: webView)
        window?.backgroundColor = .black
        safeAreaManager.configureBridgeWebViewAppearance(backgroundColor: .black)
        socialLoginCoordinator.registerMessageHandlers()
    }

    private func observeInitialWebViewLoad(for webView: WKWebView) {
        hasCompletedInitialWebViewLoad = false
        webViewLoadingObserver?.invalidate()
        webViewProgressObserver?.invalidate()

        let dismissIfReady = { [weak self, weak webView] in
            guard let self, let webView else { return }
            guard !self.hasCompletedInitialWebViewLoad else { return }
            guard webView.url != nil else { return }
            guard !webView.isLoading, webView.estimatedProgress >= 1 else { return }

            self.hasCompletedInitialWebViewLoad = true
            self.window?.backgroundColor = .white
            self.safeAreaManager.configureBridgeWebViewAppearance(backgroundColor: .white)
            self.safeAreaManager.startSafeAreaRecalculationCycle()
            self.launchOverlayCoordinator.dismissOverlay()
            self.webViewLoadingObserver?.invalidate()
            self.webViewProgressObserver?.invalidate()
        }

        webViewLoadingObserver = webView.observe(\.isLoading, options: [.new]) { _, _ in
            dismissIfReady()
        }

        webViewProgressObserver = webView.observe(\.estimatedProgress, options: [.new]) { _, _ in
            dismissIfReady()
        }
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

final class LaunchOverlayCoordinator: NSObject {
    private weak var overlayView: UIView?
    private var overlayShownAt: CFTimeInterval = CACurrentMediaTime()

    func installOverlayIfNeeded(in containerView: UIView) {
        guard overlayView == nil else { return }

        let overlay = UIView()
        overlay.translatesAutoresizingMaskIntoConstraints = false
        overlay.backgroundColor = .black

        let imageView = UIImageView(image: UIImage(named: "LogoSplash"))
        imageView.translatesAutoresizingMaskIntoConstraints = false
        imageView.contentMode = .scaleAspectFit

        overlay.addSubview(imageView)
        containerView.addSubview(overlay)

        NSLayoutConstraint.activate([
            overlay.leadingAnchor.constraint(equalTo: containerView.leadingAnchor),
            overlay.trailingAnchor.constraint(equalTo: containerView.trailingAnchor),
            overlay.topAnchor.constraint(equalTo: containerView.topAnchor),
            overlay.bottomAnchor.constraint(equalTo: containerView.bottomAnchor),
            imageView.centerXAnchor.constraint(equalTo: overlay.centerXAnchor),
            imageView.centerYAnchor.constraint(equalTo: overlay.centerYAnchor),
            imageView.widthAnchor.constraint(equalToConstant: 288),
            imageView.heightAnchor.constraint(equalToConstant: 288),
        ])

        overlayView = overlay
        overlayShownAt = CACurrentMediaTime()
    }

    func dismissOverlay(animated: Bool = false) {
        guard let overlayView else { return }

        let elapsed = CACurrentMediaTime() - overlayShownAt
        if elapsed < minimumLaunchOverlayDisplayTime {
            DispatchQueue.main.asyncAfter(deadline: .now() + (minimumLaunchOverlayDisplayTime - elapsed)) {
                self.dismissOverlay(animated: animated)
            }
            return
        }

        let removeOverlay = {
            overlayView.removeFromSuperview()
            self.overlayView = nil
        }

        guard animated else {
            removeOverlay()
            return
        }

        UIView.animate(withDuration: 0.18, animations: {
            overlayView.alpha = 0
        }, completion: { _ in
            removeOverlay()
        })
    }
}
