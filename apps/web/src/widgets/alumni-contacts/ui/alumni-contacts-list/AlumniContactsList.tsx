'use client';

import { type Ref, type RefObject } from 'react';

import { useSearchParams } from 'next/navigation';

import { useInfiniteQuery } from '@tanstack/react-query';

import { PullToRefresh, Text, VStack, Grid } from '@causw/cds';

import {
  ALUMNI_CONTACTS_SECTION_TYPE,
  AlumniContactsFilterSearchParam,
  alumniContactsQueryOptions,
  type AlumniSummaryDto,
  type GetAlumniContactsQuery,
} from '@/entities/alumni-contacts';

import { useBreakpoint, useInfiniteScroll } from '@/shared/hooks';
import { ScrollTopButton, SuspenseView } from '@/shared/ui';

import {
  useAlumniContactsListScrollTop,
  useAlumniContactsScrollRestoration,
  useAlumniContactsScrollSave,
} from '../../model';
import { AlumniContactsListItem } from '../alumni-contacts-list-item';
import { MyAlumniContactsSummaryCard } from '../my-alumni-contacts-summary-card';

import { AlumniContactsListEmptyView } from './AlumniContactsListEmptyView';
import { AlumniContactsListLoadingView } from './AlumniContactsListLoadingView';

interface AlumniContactsListProps {
  myProfile: AlumniSummaryDto | null;
  coffeeChat: AlumniSummaryDto[];
  allMembers: AlumniSummaryDto[];
  query: GetAlumniContactsQuery;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  targetRef: RefObject<HTMLDivElement | null>;
  ref: Ref<HTMLDivElement>;
}

const AlumniContactsSectionLabel = ({ children }: { children: string }) => (
  <Text typography="body-14-regular" textColor="gray-400" className="px-1">
    {children}
  </Text>
);

const AlumniContactsSectionDivider = () => (
  <div className="h-px w-full shrink-0 bg-gray-100" />
);

const AlumniContactsList = ({
  myProfile,
  coffeeChat,
  allMembers,
  query,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  targetRef,
  ref,
}: AlumniContactsListProps) => {
  const { handleNavigateToAlumniContacts } = useAlumniContactsScrollSave();

  const isAllMembersEmpty = coffeeChat.length === 0 && allMembers.length === 0;

  return (
    <div
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pt-4"
      ref={ref}
    >
      {myProfile && (
        <>
          <VStack gap="none">
            <AlumniContactsSectionLabel>내 동문수첩</AlumniContactsSectionLabel>
            <ul className="grid grid-cols-1">
              <MyAlumniContactsSummaryCard myProfile={myProfile} />
            </ul>
          </VStack>
          <AlumniContactsSectionDivider />
        </>
      )}

      {coffeeChat.length > 0 && (
        <>
          <VStack gap="none">
            <AlumniContactsSectionLabel>커피챗 가능</AlumniContactsSectionLabel>
            <Grid
              as="ul"
              gap="none"
              className="grid-cols-1 gap-x-4 md:grid-cols-2"
            >
              {coffeeChat.map((item) => (
                <AlumniContactsListItem
                  key={item.id}
                  item={item}
                  query={query}
                  onNavigate={handleNavigateToAlumniContacts}
                />
              ))}
            </Grid>
          </VStack>
          <AlumniContactsSectionDivider />
        </>
      )}

      <VStack gap="none">
        <AlumniContactsSectionLabel>전체 동문</AlumniContactsSectionLabel>
        {isAllMembersEmpty ? (
          <AlumniContactsListEmptyView />
        ) : (
          <Grid
            as="ul"
            gap="none"
            className="grid-cols-1 gap-x-4 md:grid-cols-2"
          >
            {allMembers.map((item) => (
              <AlumniContactsListItem
                key={item.id}
                item={item}
                query={query}
                onNavigate={handleNavigateToAlumniContacts}
              />
            ))}
            {!isLoading && !isFetchingNextPage && hasNextPage && (
              <div ref={targetRef} className="h-3 w-full" />
            )}
            {(isLoading || isFetchingNextPage) && (
              <div className="col-span-1 flex w-full justify-center md:col-span-2">
                <SuspenseView />
              </div>
            )}
            <li className="col-span-1 h-1 md:col-span-2" />
          </Grid>
        )}
      </VStack>
    </div>
  );
};

export const AlumniContactsListWrapper = () => {
  const searchParams = useSearchParams();
  const { isMobileSize } = useBreakpoint();

  const query = AlumniContactsFilterSearchParam.parse(
    Object.fromEntries(searchParams.entries()),
  );

  const {
    data,
    isLoading,
    isSuccess,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    ...alumniContactsQueryOptions.list(query),
    select: (data) => ({
      myProfile: data.pages[0]?.myProfile ?? null,
      coffeeChat: data.pages.flatMap(
        (page) =>
          page.sections.find(
            (section) =>
              section.type ===
              ALUMNI_CONTACTS_SECTION_TYPE.COFFEE_CHAT_AVAILABLE,
          )?.items ?? [],
      ),
      allMembers: data.pages.flatMap(
        (page) =>
          page.sections.find(
            (section) =>
              section.type === ALUMNI_CONTACTS_SECTION_TYPE.ALL_MEMBERS,
          )?.items ?? [],
      ),
    }),
  });

  const { targetRef } = useInfiniteScroll({
    intersectionCallback: (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const {
    setDesktopScrollTargetRef,
    setMobileScrollTargetRef,
    showScrollToTopButton,
    handleClickScrollTop,
  } = useAlumniContactsListScrollTop();

  const { isScrollRestoring } = useAlumniContactsScrollRestoration({
    data: data ? [...data.coffeeChat, ...data.allMembers] : undefined,
    query,
    enabled: isSuccess,
    hasNextPage,
    fetchNextPage,
  });

  if (!data) {
    return <AlumniContactsListLoadingView />;
  }

  if (isScrollRestoring) {
    return <AlumniContactsListLoadingView />;
  }

  const { myProfile, coffeeChat, allMembers } = data;

  if (isMobileSize) {
    return (
      <>
        <PullToRefresh
          className="alumni-contacts-scroll-container min-h-0 flex-1"
          onRefresh={async () => {
            await refetch();
          }}
        >
          <AlumniContactsList
            myProfile={myProfile}
            coffeeChat={coffeeChat}
            allMembers={allMembers}
            query={query}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            targetRef={targetRef}
            ref={setMobileScrollTargetRef}
          />
        </PullToRefresh>
        {showScrollToTopButton && (
          <ScrollTopButton onClick={handleClickScrollTop} />
        )}
      </>
    );
  }

  return (
    <>
      <AlumniContactsList
        myProfile={myProfile}
        coffeeChat={coffeeChat}
        allMembers={allMembers}
        query={query}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        targetRef={targetRef}
        ref={setDesktopScrollTargetRef}
      />
      {showScrollToTopButton && (
        <ScrollTopButton onClick={handleClickScrollTop} />
      )}
    </>
  );
};
