'use client';

import { Button, Camera, Close, Dialog, Text } from '@causw/cds';

import { useBreakpoint } from '@/shared/hooks';
import { ActionHeader } from '@/shared/ui';
import { ImageUploadField } from '@/shared/ui/image';

import { useFeedbackReportForm } from '../model';

type FeedbackReportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const FeedbackReportDialog = ({
  open,
  onOpenChange,
}: FeedbackReportDialogProps) => {
  const { isDesktopSize } = useBreakpoint();
  const isFullscreen = !isDesktopSize;

  const {
    satisfactionScore,
    setSatisfactionScore,
    feedbackMessage,
    setFeedbackMessage,
    imageUploadFieldRef,
    setValue,
    attachedImages,
    isSubmitEnabled,
    handleAttachPhotoClick,
    maxPhotoCount,
  } = useFeedbackReportForm();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        fullscreen={isFullscreen}
        maxWidth={700}
        className={`overflow-y-auto bg-gray-100 p-0 ${
          isFullscreen
            ? 'h-full w-full rounded-none'
            : 'h-auto max-h-[calc(100dvh-200px)] w-[calc(100dvw-200px)] rounded-lg p-8 md:mx-[100px] md:my-[100px]'
        }`}
      >
        {isFullscreen && (
          <ActionHeader
            isSticky={false}
            background="gray"
            className="px-5 py-4"
          >
            <ActionHeader.BackButton onClick={() => onOpenChange(false)}>
              뒤로
            </ActionHeader.BackButton>
          </ActionHeader>
        )}

        {!isFullscreen && (
          <div className="flex items-center justify-between">
            <Text as="h3" typography="title-22-bold" className="text-gray-700">
              건의/오류 제보하기
            </Text>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="닫기"
                className="rounded-sm p-1 transition-colors hover:bg-gray-100 active:bg-gray-200 hover:[&_svg]:fill-gray-700 active:[&_svg]:fill-gray-800"
              >
                <Close size={20} className="fill-gray-600 transition-colors" />
              </button>
            </Dialog.Close>
          </div>
        )}

        <div className={isFullscreen ? 'px-5 pb-8' : 'px-0 pb-0'}>
          <div className="mb-8">
            {isFullscreen && (
              <Text
                as="h3"
                typography="title-22-bold"
                className="text-gray-700"
              >
                건의/오류 제보하기
              </Text>
            )}
            <p className="typo-body-16-regular mt-1 text-gray-500">
              크자회 서비스에 관한 의견을 자유롭게 남겨주세요
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <p className="typo-subtitle-18-bold text-gray-700">
                1. 크자회 앱 사용에 대한 전반적인 만족도를 알려주세요.
              </p>
              <div className="rounded-lg bg-white px-5 py-6">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSatisfactionScore(value)}
                      className={`typo-body-16-regular h-16.75 flex-1 rounded-sm ${
                        satisfactionScore === value
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="typo-body-14-semibold mt-2 flex items-center justify-between text-gray-400">
                  <span>매우 아쉬움</span>
                  <span>매우 만족</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="typo-subtitle-18-bold text-gray-700">
                2. 크자회에 대한 건의나 오류를 자유롭게 남겨주세요.
                <span className="text-gray-400"> (선택)</span>
              </p>
              <div className="rounded-lg bg-white p-5">
                <textarea
                  value={feedbackMessage}
                  onChange={(event) => setFeedbackMessage(event.target.value)}
                  placeholder="답변을 적어주세요."
                  className="typo-body-16-regular h-21 w-full resize-none bg-transparent text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />

                <div className="mb-4">
                  <ImageUploadField
                    ref={imageUploadFieldRef}
                    name="images"
                    setValue={setValue}
                    maxFiles={maxPhotoCount}
                  />
                </div>

                <Button
                  type="button"
                  onClick={handleAttachPhotoClick}
                  disabled={attachedImages.length >= maxPhotoCount}
                  className="typo-body-14-semibold rounded-sm bg-gray-100 px-3 py-2 text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Camera size={20} color="gray-600" />
                  <span>사진첨부</span>
                </Button>
              </div>
            </div>

            <button
              type="button"
              disabled={!isSubmitEnabled}
              className={`typo-body-15-semibold h-13.5 w-full rounded-md ${
                isSubmitEnabled
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-300'
              }`}
            >
              제출하기
            </button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
