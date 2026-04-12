'use client';

import { useEffect, useState } from 'react';

import { CTAButton, Dialog, Text } from '@causw/cds';

import { getRawAppEnv, getUpdateEnv } from '@/shared/config';
import { COPY } from '@/shared/constants';
import { checkForceUpdate, openAppStore } from '@/shared/lib';

interface ForceUpdateState {
  open: boolean;
  message: string;
  storeUrlApp: string;
  storeUrlWeb: string;
  currentVersion: string;
  minimumVersion: string;
}

const initialState: ForceUpdateState = {
  open: false,
  message: '',
  storeUrlApp: '',
  storeUrlWeb: '',
  currentVersion: '',
  minimumVersion: '',
};

export function ForceUpdateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ForceUpdateState>(initialState);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        const rawEnv = getRawAppEnv();
        const updateEnv = getUpdateEnv();
        //TODO : prod올리기 전에 삭제
        console.log(
          '[APP_ENV]',
          JSON.stringify(
            {
              NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
              rawEnv,
              updateEnv,
            },
            null,
            2,
          ),
        );

        const result = await checkForceUpdate(updateEnv);

        if (!cancelled && result.needUpdate) {
          setState({
            open: true,
            message: result.updateMessage,
            storeUrlApp: result.storeUrlApp,
            storeUrlWeb: result.storeUrlWeb,
            currentVersion: result.currentVersion,
            minimumVersion: result.minimumVersion,
          });
        }
      } catch (error) {
        console.log('[ForceUpdateProvider] failed:', error);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleUpdate = async () => {
    await openAppStore({
      appUrl: state.storeUrlApp,
      webUrl: state.storeUrlWeb,
    });
  };

  return (
    <>
      {children}

      <Dialog open={state.open} onOpenChange={() => {}}>
        <Dialog.Content
          width={350}
          maxWidth={420}
          className="w-[calc(100vw-2rem)]! max-w-100! overflow-hidden rounded-[0.75rem]!"
        >
          <div className="mb-2">
            <Dialog.Title>
              <Text typography="subtitle-18-bold" className="break-keep">
                {COPY.APP_UPDATE_REQUIRE_TITLE}
              </Text>
            </Dialog.Title>

            <Dialog.Description>
              <Text
                typography="body-14-regular"
                textColor="gray-600"
                className="leading-7 break-keep"
              >
                {state.message ||
                  '안정적인 사용을 위해 최신 버전으로 업데이트 해주세요.'}
              </Text>
            </Dialog.Description>
          </div>

          <Text
            typography="body-14-regular"
            textColor="gray-700"
            className="mb-4 rounded-[1rem] bg-gray-50 p-5 leading-7 break-keep"
          >
            <p>
              {COPY.CURRENT_VERSION}: {state.currentVersion}
            </p>
            <p className="mt-1">
              {COPY.MINIMUM_VERSION}: {state.minimumVersion}
            </p>
          </Text>

          <Dialog.Footer className="block">
            <CTAButton
              onClick={() => {
                void handleUpdate();
              }}
              className="w-full rounded-[1rem] bg-black"
              color="dark"
            >
              <Text textColor="white" typography="body-15-medium">
                {COPY.GO_TO_UPDATE}
              </Text>
            </CTAButton>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
