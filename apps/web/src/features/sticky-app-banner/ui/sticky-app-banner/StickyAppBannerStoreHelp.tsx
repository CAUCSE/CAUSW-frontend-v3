'use client';

import { Text } from '@causw/cds';

import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/shared/constants';

const STORE_LINKS = {
  ios: { href: APP_STORE_URL, label: 'App Store' },
  android: { href: GOOGLE_PLAY_URL, label: 'Google Play' },
} as const;

interface StickyAppBannerStoreHelpProps {
  os: keyof typeof STORE_LINKS;
}

// 인앱 브라우저에서 마켓이 열리지 않을 때 보여주는 안내.
export const StickyAppBannerStoreHelp = ({
  os,
}: StickyAppBannerStoreHelpProps) => {
  const { href, label } = STORE_LINKS[os];

  return (
    <div role="status" className="px-5 pb-3">
      <Text as="p" typography="body-14-regular" textColor="gray-700">
        마켓이 열리지 않으면 브라우저 메뉴에서 ‘외부 브라우저로 열기’를 선택해
        주세요.
      </Text>
      <a
        href={href}
        className="typo-body-14-semibold mt-2 inline-block text-gray-700 underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        {label}
      </a>
    </div>
  );
};
