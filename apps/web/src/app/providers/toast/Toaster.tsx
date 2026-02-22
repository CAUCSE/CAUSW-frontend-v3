'use client';

import {
  ErrorColored,
  LoadingColored,
  SuccessColored,
  Toast,
  ToastProvider,
  ToastViewport,
} from '@causw/cds';

import { toast, ToastType, useToastStore } from '@/shared/lib/toast';

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
            duration={t.duration ?? 3000}
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
