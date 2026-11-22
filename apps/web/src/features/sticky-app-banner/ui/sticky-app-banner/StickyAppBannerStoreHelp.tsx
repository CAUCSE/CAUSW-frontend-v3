'use client';

import { Text } from '@causw/cds';

import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/shared/constants';

import { type StickyAppBannerEnvironment } from '../../model';

export const STICKY_APP_BANNER_STORE_HELP_ID = 'sticky-app-banner-stores';

const storeLinkClassName =
  'typo-body-14-semibold text-gray-700 underline underline-offset-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black';

interface StickyAppBannerStoreHelpProps {
  environment: StickyAppBannerEnvironment;
  onStoreClick: (store: 'ios' | 'android') => void;
}

/** OS 를 판별하지 못했거나 인앱 브라우저에서 마켓이 열리지 않을 때 보여주는 안내 */
export const StickyAppBannerStoreHelp = ({
  environment,
  onStoreClick,
}: StickyAppBannerStoreHelpProps) => {
  return (
    <div
      id={STICKY_APP_BANNER_STORE_HELP_ID}
      role="status"
      className="px-5 pb-3"
    >
      <Text as="p" typography="body-14-regular" textColor="gray-700">
        {environment.inApp
          ? '마켓이 열리지 않으면 브라우저 메뉴에서 ‘외부 브라우저로 열기’를 선택해 주세요.'
          : '사용 중인 기기의 앱 마켓을 선택해 주세요.'}
      </Text>
      <div className="mt-2 flex flex-wrap gap-4">
        {environment.os !== 'android' && (
          <a
            href={APP_STORE_URL}
            className={storeLinkClassName}
            onClick={() => onStoreClick('ios')}
          >
            App Store
          </a>
        )}
        {environment.os !== 'ios' && (
          <a
            href={GOOGLE_PLAY_URL}
            className={storeLinkClassName}
            onClick={() => onStoreClick('android')}
          >
            Google Play
          </a>
        )}
      </div>
    </div>
  );
};
