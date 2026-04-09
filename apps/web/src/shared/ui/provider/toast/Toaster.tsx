'use client';

import { useEffect } from 'react';

import {
  ErrorColored,
  LoadingColored,
  SuccessColored,
  Toast,
  ToastProvider,
  ToastViewport,
} from '@causw/cds';

import { toast, type ToastType, useToastStore } from '@/shared/model';

const Icons = {
  success: () => <SuccessColored size={20} />,
  error: () => <ErrorColored size={20} />,
  loading: () => <LoadingColored size={20} className="animate-spin" />,
};

const toastIconMap: Record<ToastType, React.ReactNode> = {
  success: <Icons.success />,
  error: <Icons.error />,
  loading: <Icons.loading />,
  default: undefined,
};

export const Toaster = () => {
  const toasts = useToastStore();

  useEffect(() => {
    const now = Date.now();

    const timers = toasts.map((t) => {
      if (t.duration === Infinity) return;

      const remaining = t.duration - (now - t.createdAt);

      if (remaining <= 0) {
        toast.dismiss(t.id);
        return;
      }

      return setTimeout(() => {
        toast.dismiss(t.id);
      }, remaining);
    });

    return () => {
      timers.forEach((timer) => timer && clearTimeout(timer));
    };
  }, [toasts]);

  return (
    <ToastProvider>
      {toasts.map((t) => {
        const iconToRender = t.icon || toastIconMap[t.type];

        return (
          <Toast
            key={t.id}
            message={t.message}
            icon={iconToRender}
            variant="default"
            duration={Infinity}
            onOpenChange={(open) => {
              if (!open) toast.dismiss(t.id);
            }}
          />
        );
      })}
      <ToastViewport className="flex flex-col gap-2 p-4" />
    </ToastProvider>
  );
};
