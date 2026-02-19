import UIKit
import Capacitor
import FirebaseCore
import FirebaseMessaging
import UserNotifications
  // TODO: 어느 정도 개발이 되면 필요한 log찍는 코드 빼고 print문 제거하기
@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate,UNUserNotificationCenterDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        FirebaseApp.configure()
        UNUserNotificationCenter.current().delegate = self
        
        //이 문장이 있어야 'didRegisterForRemoteNotifications~~'가 호출됨 
        application.registerForRemoteNotifications()
        DispatchQueue.main.async {
            guard let bridgeViewController = self.window?.rootViewController as? CAPBridgeViewController else {
                return
            }
            
            if let webView = bridgeViewController.webView {
                webView.allowsBackForwardNavigationGestures = true
                
                // 1. [수정] 스크롤 뷰가 자동으로 Safe Area 인셋을 계산하도록 설정 (가장 중요)
                // .never를 .always 또는 .automatic으로 변경하면 시스템이 Safe Area만큼 여백을 줍니다.
                webView.scrollView.contentInsetAdjustmentBehavior = .never
                
                // 2. [추가] 웹뷰의 프레임 자체를 Safe Area에 맞추기 (선택 사항)
                // Capacitor는 기본적으로 전체 화면을 잡으므로, 강제로 Safe Area에 맞추고 싶다면 아래 로직을 사용합니다.
                if let window = self.window {
                    let safeAreaInsets = window.safeAreaInsets
                    
                    window.backgroundColor = .white
                    bridgeViewController.view.backgroundColor = .white
                    let newFrame = CGRect(
                        x: safeAreaInsets.left,
                        y: safeAreaInsets.top,
                        width: window.frame.width - safeAreaInsets.left - safeAreaInsets.right,
                        height: window.frame.height - safeAreaInsets.top - safeAreaInsets.bottom
                    )
                    webView.frame = newFrame
                }
                
                // 3. 배경색 설정 (Safe Area 밖의 여백 색상을 결정함)
                webView.isOpaque = true // 투명하게 하면 뒤의 빈 공간이 보일 수 있으므로 배경색을 주는 것이 깔끔합니다.
                webView.backgroundColor = .white
                // 혹은 앱의 주 테마 색상
                webView.scrollView.backgroundColor = .white
                
            }
        }
        return true
    }
    
    
    func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification, withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
            
            //  알림이 잘 왔는지 확인하는 로그
            let userInfo = notification.request.content.userInfo
        
            // Firebase Messaging에 알림 정보를 전달합니다.
            Messaging.messaging().appDidReceiveMessage(userInfo)
            
            // 알림을 화면에 표시합니다.
            completionHandler([.alert, .sound, .badge])
        }
    //사용자가 알림을 탭했을 때 호출됩니다.
       func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse, withCompletionHandler completionHandler: @escaping () -> Void) {
           
           //  알림 탭 액션 로그
           let userInfo = response.notification.request.content.userInfo
         
           
           // Firebase Messaging에 알림 정보를 전달합니다.
           Messaging.messaging().appDidReceiveMessage(userInfo)
           
           completionHandler()
       }
    func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        print("📍 APNs 등록 성공! 토큰 생성 시작...")
        Messaging.messaging().apnsToken = deviceToken
        Messaging.messaging().token(completion: { (token, error) in
            if let error = error {
                NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
            print("FCM 토큰 에러: \(error)\(error.localizedDescription)")
            } else if let token = token {
                NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: token)
            print("FCM 토큰: \(token)")
            }
        })
    }

    func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
       print("❌ APNs 등록 실패: \(error.localizedDescription)")
      NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
    }
    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

}
