'use client';

import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { App } from '@capacitor/app';
import { PushNotifications } from '@capacitor/push-notifications';
import { useQuery } from '@tanstack/react-query';

import { CTAButton, Dialog, Text } from '@causw/cds';

import { COPY, QUERY_STALE_TIME } from '@/shared/constants';
import { checkForceUpdate, openAppStore } from '@/shared/lib';
import { isAndroid } from '@/shared/utils';

const FORCE_UPDATE_QUERY_KEY = ['force-update'] as const;

/** AndroidManifest `default_notification_channel_id` 와 동일 */
const ANDROID_DEFAULT_NOTIFICATION_CHANNEL_ID = 'default_channel_id';

export function PushNotificationChannelProvider({
  children,
}: PropsWithChildren) {
  useEffect(() => {
    if (!isAndroid) {
      return;
    }

    void PushNotifications.createChannel({
      id: ANDROID_DEFAULT_NOTIFICATION_CHANNEL_ID,
      name: '알림',
      importance: 4,
      vibration: true,
    });
  }, []);

  return <>{children}</>;
}

export function ForceUpdateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isError, isFetching, refetch } = useQuery({
    queryKey: FORCE_UPDATE_QUERY_KEY,
    queryFn: () => checkForceUpdate(),
    staleTime: QUERY_STALE_TIME.INFINITY,
    refetchOnWindowFocus: 'always',
    retry: 1,
  });
  useEffect(() => {
    const listenerPromise = App.addListener(
      'appStateChange',
      ({ isActive }) => {
        if (isActive) {
          void refetch();
        }
      },
    );

    return () => {
      void listenerPromise.then((listener) => {
        void listener.remove();
      });
    };
  }, [refetch]);
  const isForceUpdateRequired = data?.needUpdate ?? false;
  const isInitialCheckFailed = isError && !data;
  const isOpen = isForceUpdateRequired || isInitialCheckFailed;

  const handleUpdate = async () => {
    if (!data) {
      return;
    }
    await openAppStore({
      appUrl: data.storeUrlApp,
      webUrl: data.storeUrlWeb,
    });
  };

  const handleRetry = () => {
    void refetch();
  };

  return (
    <>
      {children}

      <Dialog open={isOpen} onOpenChange={() => {}}>
        <Dialog.Content
          width={350}
          maxWidth={420}
          className="w-[calc(100vw-2rem)]! max-w-100! overflow-hidden rounded-[0.75rem]!"
        >
          <div className="mb-2">
            <Dialog.Title>
              <Text typography="subtitle-18-bold" className="break-keep">
                {isInitialCheckFailed
                  ? '버전 확인에 실패했습니다.'
                  : COPY.APP_UPDATE_REQUIRE_TITLE}
              </Text>
            </Dialog.Title>

            <Dialog.Description>
              <Text
                typography="body-14-regular"
                textColor="gray-600"
                className="leading-7 break-keep"
              >
                {isInitialCheckFailed
                  ? '앱 버전을 확인하지 못했습니다. 네트워크 상태를 확인한 뒤 다시 시도해주세요.'
                  : data?.updateMessage ||
                    '안정적인 사용을 위해 최신 버전으로 업데이트 해주세요.'}
              </Text>
            </Dialog.Description>
          </div>

          {isForceUpdateRequired && (
            <Text
              typography="body-14-regular"
              textColor="gray-700"
              className="mb-4 rounded-[1rem] bg-gray-50 p-5 leading-7 break-keep"
            >
              <p>
                {COPY.CURRENT_VERSION}: {data?.currentVersion ?? ''}
              </p>
              <p className="mt-1">
                {COPY.MINIMUM_VERSION}: {data?.minimumVersion ?? ''}
              </p>
            </Text>
          )}

          <Dialog.Footer className="block">
            <CTAButton
              onClick={() => {
                if (isInitialCheckFailed) {
                  handleRetry();
                  return;
                }

                void handleUpdate();
              }}
              disabled={isFetching}
              className="w-full rounded-[1rem] bg-black"
              color="dark"
            >
              <Text textColor="white" typography="body-15-medium">
                {isInitialCheckFailed
                  ? isFetching
                    ? '확인 중입니다...'
                    : '다시 시도해주세요'
                  : COPY.GO_TO_UPDATE}
              </Text>
            </CTAButton>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
