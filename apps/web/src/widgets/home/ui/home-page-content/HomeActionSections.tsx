import type { ReactNode } from 'react';

import Link from 'next/link';

import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';

import {
  BellColored,
  CafeteriaColored,
  CaldendarIconColored,
  ChevronRight,
  LockOpenColored,
  SpeakerColored,
  TeamMembersColored,
  Text,
} from '@causw/cds';

import { COPY, EXTERNAL_ROUTES, ROUTES } from '@/shared/constants';

import { HOME_EVENTS } from '../../config/homeEvents';

export function HomeActionSections({ isEnrolled }: { isEnrolled: boolean }) {
  return (
    <>
      {HOME_EVENTS.length > 0 && (
        <HomeActionSection title="이벤트">
          {HOME_EVENTS.map(({ title, href }) => (
            <HomeActionLink
              key={href}
              label={title}
              href={href}
              icon={<SpeakerColored size={18} />}
              external
            />
          ))}
        </HomeActionSection>
      )}

      {isEnrolled && (
        <HomeActionSection title="바로가기">
          <HomeActionLink
            label={COPY.QUICK_MENU_LOCKER}
            href={ROUTES.LOCKER}
            icon={<LockOpenColored size={18} />}
          />
          <HomeActionLink
            label={COPY.QUICK_MENU_MEETINGROOM}
            href={EXTERNAL_ROUTES.CAU_MEETINGROOM}
            icon={<TeamMembersColored size={18} />}
            external
          />
          <HomeActionLink
            label={COPY.QUICK_MENU_CAFETERIA}
            href={EXTERNAL_ROUTES.CAU_CAFETERIA}
            icon={<CafeteriaColored size={18} />}
            external
          />
        </HomeActionSection>
      )}

      <HomeActionSection title="경조사">
        <HomeActionLink
          label="동문에게 경조사 알리기"
          href={`${ROUTES.CEREMONY}?create=true`}
          icon={<BellColored size={18} />}
        />
        <HomeActionLink
          label="동문 경조사 보기"
          href={ROUTES.CEREMONY}
          icon={<SpeakerColored size={18} />}
        />
        <HomeActionLink
          label="내 경조사 내역"
          href={`${ROUTES.CEREMONY}?tab=mine`}
          icon={<CaldendarIconColored size={18} />}
          description="완료 · 거부 · 대기중"
        />
      </HomeActionSection>
    </>
  );
}

function HomeActionSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-label={title} className="px-5 py-4">
      <Text as="h2" typography="subtitle-16-bold" textColor="gray-700">
        {title}
      </Text>
      <ul className="tablet:grid-cols-2 mt-2 grid grid-cols-1 gap-x-8 gap-y-2">
        {children}
      </ul>
    </section>
  );
}

function HomeActionLink({
  label,
  href,
  icon,
  external,
  description,
}: {
  label: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
  description?: string;
}) {
  const className =
    'flex min-h-10 items-center gap-3 rounded-md py-1 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-blue-700 active:bg-gray-100';
  const content = (
    <>
      <span
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-md bg-gray-100"
      >
        {icon}
      </span>
      <Text
        typography="body-16-medium"
        textColor="gray-700"
        className="min-w-0 flex-1 truncate"
      >
        {label}
      </Text>
      {description ? (
        <Text
          typography="body-14-regular"
          textColor="gray-500"
          className="shrink-0"
        >
          {description}
        </Text>
      ) : (
        <span
          aria-hidden="true"
          className="flex size-5 shrink-0 items-center justify-center"
        >
          <ChevronRight size={14} className="text-gray-300" />
        </span>
      )}
    </>
  );

  return (
    <li className="min-w-0">
      {external ? (
        <a
          href={href}
          className={className}
          onClick={(event) => {
            if (!Capacitor.isNativePlatform()) return;
            event.preventDefault();
            void Browser.open({ url: href }).catch(() =>
              window.location.assign(href),
            );
          }}
        >
          {content}
        </a>
      ) : (
        <Link href={href} className={className}>
          {content}
        </Link>
      )}
    </li>
  );
}
