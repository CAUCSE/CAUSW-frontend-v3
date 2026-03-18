'use client';

import { Close, Dialog, Text } from '@causw/cds';

import { useBreakpoint } from '@/shared/hooks';
import { ActionHeader } from '@/shared/ui';

import { TermsOfServiceContent } from './TermsOfServiceContent';

type TermsOfServiceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TermsOfServiceDialog = ({
  open,
  onOpenChange,
}: TermsOfServiceDialogProps) => {
  const { isDesktopSize } = useBreakpoint();
  const isFullscreen = !isDesktopSize;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        fullscreen={isFullscreen}
        maxWidth={700}
        className={`bg-white p-0 ${
          isFullscreen
            ? 'h-full w-full rounded-none'
            : 'h-auto max-h-[calc(100dvh-200px)] w-[calc(100dvw-200px)] rounded-lg bg-gray-100 p-8 md:mx-[100px] md:my-[100px]'
        }`}
      >
        {isFullscreen && (
          <ActionHeader
            isSticky={false}
            background="white"
            className="px-5 py-4"
          >
            <ActionHeader.BackButton onClick={() => onOpenChange(false)}>
              뒤로
            </ActionHeader.BackButton>
          </ActionHeader>
        )}

        <div className={isFullscreen ? 'px-5 pb-10' : 'px-0 pb-0'}>
          <div className="mb-8 flex items-center justify-between">
            <Text as="h3" typography="title-22-bold" className="text-gray-700">
              서비스 이용약관
            </Text>
            <Dialog.Close asChild>
              <button
                type="button"
                className={`rounded-sm p-1 transition-colors hover:bg-gray-100 active:bg-gray-200 hover:[&_svg]:fill-gray-700 active:[&_svg]:fill-gray-800 ${
                  isFullscreen ? 'hidden' : 'block'
                }`}
                aria-label="닫기"
              >
                <Close size={20} className="fill-gray-600 transition-colors" />
              </button>
            </Dialog.Close>
          </div>

          <TermsOfServiceContent />
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
