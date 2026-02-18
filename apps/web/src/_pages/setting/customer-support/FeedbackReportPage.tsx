'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { ChevronLeft, CloseFilled } from '@causw/cds';

const MOCK_PHOTO_IDS = ['photo-1', 'photo-2', 'photo-3', 'photo-4'];

export function FeedbackReportPage() {
  const [score, setScore] = useState<number | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const canSubmit = useMemo(() => {
    return Boolean(score) && feedbackText.trim().length > 0;
  }, [score, feedbackText]);

  const onAttachPhoto = () => {
    setPhotos((prev) => {
      if (prev.length >= 4) return prev;
      return [...prev, MOCK_PHOTO_IDS[prev.length]];
    });
  };

  const onRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo !== id));
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-gray-100 md:flex md:items-center md:justify-center md:bg-black/50 md:p-6">
      <div className="h-full overflow-y-auto bg-gray-100 md:h-auto md:max-h-[90vh] md:w-full md:max-w-[700px] md:rounded-2xl md:p-8">
        <div className="px-5 py-4 md:hidden">
          <Link
            href="/setting"
            className="typo-subtitle-16-bold flex items-center gap-3 text-gray-700"
          >
            <ChevronLeft size={18} className="fill-gray-700" />
            <span>뒤로</span>
          </Link>
        </div>

        <div className="hidden items-center justify-between md:flex">
          <h3 className="typo-title-22-bold text-gray-700">
            건의/오류 제보하기
          </h3>
          <Link href="/setting" aria-label="닫기">
            <CloseFilled size={20} color="gray-600" />
          </Link>
        </div>

        <div className="px-5 pb-8 md:px-0 md:pb-0">
          <div className="mb-8 md:mt-1">
            <h3 className="typo-title-22-bold text-gray-700 md:hidden">
              건의/오류 제보하기
            </h3>
            <p className="typo-body-16-regular mt-1 text-gray-500">
              크자회 서비스에 관한 의견을 자유롭게 남겨주세요
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <p className="typo-subtitle-18-bold text-gray-700">
                1. 크자회 앱 사용에 대한 전반적인 만족도를 알려주세요.
              </p>
              <div className="rounded-2xl bg-white px-5 py-6">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setScore(value)}
                      className={`typo-body-16-regular h-[67px] flex-1 rounded-lg ${
                        score === value
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="typo-body-14-semibold mt-2 flex items-center justify-between text-gray-500">
                  <span>매우 아쉬움</span>
                  <span>매우 만족</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="typo-subtitle-18-bold text-gray-700">
                2. 크자회에 대한 건의나 오류를 자유롭게 남겨주세요.{' '}
                <span className="text-gray-400">(선택)</span>
              </p>
              <div className="rounded-2xl bg-white p-5">
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="답변을 적어주세요."
                  className="typo-body-16-regular h-[84px] w-full resize-none bg-transparent text-gray-700 placeholder:text-gray-400 focus:outline-none"
                />

                {photos.length > 0 && (
                  <div className="mb-4 flex gap-2 overflow-x-auto">
                    {photos.map((photoId) => (
                      <div
                        key={photoId}
                        className="relative h-[100px] w-[100px] shrink-0 rounded-lg bg-gray-200"
                      >
                        <button
                          type="button"
                          onClick={() => onRemovePhoto(photoId)}
                          className="absolute top-[6px] right-[6px]"
                        >
                          <CloseFilled size={20} color="gray-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={onAttachPhoto}
                  className="typo-body-14-semibold inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-gray-500"
                >
                  <span>◉</span>
                  <span>사진첨부</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              className={`typo-body-15-semibold h-[54px] w-full rounded-xl ${
                canSubmit
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-300'
              }`}
              disabled={!canSubmit}
            >
              제출하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
