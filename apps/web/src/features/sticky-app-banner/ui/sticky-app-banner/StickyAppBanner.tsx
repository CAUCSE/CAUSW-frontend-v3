'use client';

import Image from 'next/image';

import { Button, Close, Text } from '@causw/cds';

import { getMarketLink, useStickyAppBanner } from '../../model';

import { StickyAppBannerStoreHelp } from './StickyAppBannerStoreHelp';

const ctaClassName =
  'shrink-0 bg-gray-700 px-3 text-white active:bg-gray-800 enabled:hover:bg-gray-700 enabled:active:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black';

export const StickyAppBanner = () => {
  const { bannerRef, visible, environment, showHelp, openHelp, close, track } =
    useStickyAppBanner();

  const { os, inApp } = environment;

  // visible 은 이미 os 가 판별된 경우에만 true. os 조건은 아래 마켓 링크의 타입 좁히기용
  if (!visible || os === 'unknown') return null;

  return (
    <aside
      ref={bannerRef}
      aria-label="크자회 앱 안내"
      className="z-sticky fixed inset-x-0 top-0 border-b border-gray-200 bg-white pt-[env(safe-area-inset-top,0px)] md:hidden"
    >
      <div className="flex min-h-20 items-center gap-3 py-3 pr-3 pl-5 max-[359px]:gap-2 max-[359px]:pr-1 max-[359px]:pl-3">
        <Image
          src="/images/brand/app-icon.png"
          alt="크자회 앱"
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-[0.625rem]"
        />
        <Text
          as="p"
          typography="body-14-medium"
          textColor="gray-700"
          className="min-w-0 flex-1 break-keep"
        >
          새로운 공지,
          <br />앱 알림으로 바로 알려드려요.
        </Text>
        <Button asChild size="sm" className={ctaClassName}>
          {/* 인앱 브라우저는 window.open 을 막는 경우가 많아 링크 기본 동작으로 이동 */}
          <a
            href={getMarketLink(os, inApp)}
            onClick={() => {
              track('click_sticky_banner_cta', os);
              if (inApp) openHelp();
            }}
          >
            앱 열기
          </a>
        </Button>
        <button
          type="button"
          aria-label="앱 안내 배너 24시간 닫기"
          className="flex size-11 shrink-0 cursor-pointer items-center justify-center"
          onClick={close}
        >
          <Close size={24} color="gray-500" />
        </button>
      </div>
      {showHelp && <StickyAppBannerStoreHelp os={os} />}
    </aside>
  );
};
