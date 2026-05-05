import UIKit
import Capacitor

final class SafeAreaManager {
    private var didDetachWebViewConstraints = false
    private var safeAreaRecalcWorkItem: DispatchWorkItem?
    private var webViewSafeAreaConstraints: [NSLayoutConstraint] = []

    private let bridgeViewControllerProvider: () -> CAPBridgeViewController?

    init(bridgeViewControllerProvider: @escaping () -> CAPBridgeViewController?) {
        self.bridgeViewControllerProvider = bridgeViewControllerProvider
    }

    func configureBridgeWebViewAppearance() {
        guard let bridgeViewController = bridgeViewControllerProvider(),
              let webView = bridgeViewController.webView else {
            return
        }

        bridgeViewController.view.backgroundColor = .white
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.isOpaque = true
        webView.backgroundColor = .white
        webView.scrollView.backgroundColor = .white
        webView.translatesAutoresizingMaskIntoConstraints = false
        webView.autoresizingMask = []
        webView.alpha = 1

        if !didDetachWebViewConstraints {
            detachWebViewConstraints(webView)
            didDetachWebViewConstraints = true
        }
        installSafeAreaConstraintsIfNeeded(webView)
    }

    func startSafeAreaRecalculationCycle() {
        safeAreaRecalcWorkItem?.cancel()
        recalculateSafeAreaUntilStable(remainingAttempts: 40, lastSnapshot: nil, stableCount: 0)
    }

    private func recalculateSafeAreaUntilStable(
        remainingAttempts: Int,
        lastSnapshot: SafeAreaSnapshot?,
        stableCount: Int
    ) {
        let workItem = DispatchWorkItem { [weak self] in
            guard let self else { return }
            guard let bridgeViewController = self.bridgeViewControllerProvider(),
                  let webView = bridgeViewController.webView else {
                return
            }

            bridgeViewController.view.layoutIfNeeded()
            self.installSafeAreaConstraintsIfNeeded(webView)
            let hasValidBounds = bridgeViewController.view.bounds.width > 0
                && bridgeViewController.view.bounds.height > 0
            let insets = bridgeViewController.view.safeAreaInsets
            let snapshot = SafeAreaSnapshot(
                size: CGSize(width: insets.left + insets.right, height: insets.top + insets.bottom),
                origin: .zero
            )

            let nextStableCount = (snapshot == lastSnapshot) ? (stableCount + 1) : 1
            if hasValidBounds && nextStableCount >= 3 {
                return
            }

            if remainingAttempts <= 0 {
                return
            }

            self.recalculateSafeAreaUntilStable(
                remainingAttempts: remainingAttempts - 1,
                lastSnapshot: snapshot,
                stableCount: nextStableCount
            )
        }

        safeAreaRecalcWorkItem = workItem
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.06, execute: workItem)
    }

    private func detachWebViewConstraints(_ webView: UIView) {
        guard let superview = webView.superview else { return }
        let relatedConstraints = superview.constraints.filter { constraint in
            (constraint.firstItem as? UIView) == webView || (constraint.secondItem as? UIView) == webView
        }
        NSLayoutConstraint.deactivate(relatedConstraints)
    }

    private func installSafeAreaConstraintsIfNeeded(_ webView: UIView) {
        if !webViewSafeAreaConstraints.isEmpty {
            return
        }
        guard let superview = webView.superview else { return }
        let guide = superview.safeAreaLayoutGuide
        webViewSafeAreaConstraints = [
            webView.leadingAnchor.constraint(equalTo: guide.leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: guide.trailingAnchor),
            webView.topAnchor.constraint(equalTo: guide.topAnchor),
            webView.bottomAnchor.constraint(equalTo: guide.bottomAnchor)
        ]
        NSLayoutConstraint.activate(webViewSafeAreaConstraints)
    }

    private struct SafeAreaSnapshot: Equatable {
        let size: CGSize
        let origin: CGPoint
    }
}
