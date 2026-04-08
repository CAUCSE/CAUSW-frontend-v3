'use client';

import { useEffect, useState } from 'react';

import { Browser } from '@capacitor/browser';

import { getRawAppEnv, getUpdateEnv } from '@/shared/config';
import { checkForceUpdate } from '@/shared/lib';

interface ForceUpdateState {
  open: boolean;
  message: string;
  storeUrl: string;
  currentVersion: string;
  minimumVersion: string;
}

const initialState: ForceUpdateState = {
  open: false,
  message: '',
  storeUrl: '',
  currentVersion: '',
  minimumVersion: '',
};

export function ForceUpdateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ForceUpdateState>(initialState);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const run = async () => {
      try {
        const rawEnv = getRawAppEnv();
        const updateEnv = getUpdateEnv();

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

        if (result.needUpdate) {
          setState({
            open: true,
            message: result.updateMessage,
            storeUrl: result.storeUrl,
            currentVersion: result.currentVersion,
            minimumVersion: result.minimumVersion,
          });
        }
      } catch (error) {
        console.error('[ForceUpdateProvider] failed:', error);
      }
    };

    void run();
  }, [mounted]);

  const handleUpdate = async () => {
    if (!state.storeUrl) return;
    await Browser.open({ url: state.storeUrl });
  };

  return (
    <>
      {children}

      {state.open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-5">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900">
                업데이트가 필요합니다
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {state.message ||
                  '안정적인 사용을 위해서는 최신 버전이 필요합니다.'}
              </p>
            </div>

            <div className="mb-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
              <p>현재 버전: {state.currentVersion}</p>
              <p className="mt-1">최소 버전: {state.minimumVersion}</p>
            </div>

            <button
              type="button"
              onClick={() => {
                void handleUpdate();
              }}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.99]"
            >
              업데이트하러 가기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
