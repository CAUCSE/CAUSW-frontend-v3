'use client';

import { Button, Text, SuccessColored } from '@causw/cds';

import {
  getCeremonyIcon,
  CeremonyInfoRow,
  type CeremonyDetailResponse,
} from '@/entities/ceremony';

import { formatDateWithTime } from '@/shared/lib';
import { toast } from '@/shared/model/toast';

import { KakaoMap } from './KakaoMap';

interface CeremonyDetailViewProps {
  detail: CeremonyDetailResponse;
}

export const CeremonyDetailView = ({ detail }: CeremonyDetailViewProps) => {
  const {
    title,
    category,
    type,
    applicant,
    subject,
    startDate,
    endDate,
    startTime,
    endTime,
    content,
    address,
    detailedAddress,
    contact,
  } = detail;

  const showApplicant = applicant !== subject;

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      toast.success('주소가 복사되었습니다.', {
        icon: <SuccessColored size={20} />,
      });
    }
  };

  const handleCall = () => {
    if (contact) {
      window.location.href = `tel:${contact}`;
    }
  };

  // CDS Stack의 gap prop은 프리셋(xs~xl)에 없는 값이라 div 사용
  return (
    <div className="flex flex-col gap-[1.375rem] px-5">
      {/* 타이틀 행 */}
      <div className="flex items-center gap-[0.75rem]">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-[0.75rem] bg-white">
          {getCeremonyIcon(category)}
        </div>
        <Text typography="subtitle-18-bold" textColor="gray-700">
          {title}
        </Text>
      </div>

      {/* 정보 카드 */}
      <div className="flex flex-col gap-[1.25rem] rounded-[1rem] bg-white p-5">
        <CeremonyInfoRow label="경조사 분류" value={type} />
        {showApplicant && <CeremonyInfoRow label="신청자" value={applicant} />}
        <CeremonyInfoRow label="대상자" value={subject} />
        <CeremonyInfoRow
          label="시작 기간"
          value={formatDateWithTime(startDate, startTime)}
        />
        {endDate && (
          <CeremonyInfoRow
            label="종료 기간"
            value={formatDateWithTime(endDate, endTime)}
          />
        )}
      </div>

      {/* 내용 섹션 */}
      {content && (
        <div className="flex flex-col gap-[0.5rem]">
          <Text
            typography="subtitle-16-bold"
            textColor="gray-700"
            className="px-1"
          >
            내용
          </Text>
          <div className="rounded-[0.75rem] bg-white p-5">
            <Text
              typography="body-16-regular"
              textColor="gray-700"
              className="whitespace-pre-wrap"
            >
              {content}
            </Text>
          </div>
        </div>
      )}

      {/* 주소 섹션 */}
      {address && (
        <div className="flex flex-col gap-[0.5rem]">
          <Text
            typography="subtitle-16-bold"
            textColor="gray-700"
            className="px-1"
          >
            주소
          </Text>
          <div className="flex flex-col gap-[1rem] rounded-[0.75rem] bg-white p-5">
            {/* 주소 텍스트 + 상세주소 그룹 (gap: 2px) */}
            <div className="flex flex-col gap-[0.125rem]">
              <div className="flex items-center justify-between gap-[0.25rem]">
                <Text typography="subtitle-16-bold" textColor="gray-700">
                  {address}
                </Text>
                <Button size="sm" color="gray" onClick={handleCopyAddress}>
                  주소 복사
                </Button>
              </div>
              {detailedAddress && (
                <Text typography="body-16-regular" textColor="gray-700">
                  {detailedAddress}
                </Text>
              )}
            </div>
            <KakaoMap address={address} className="h-40 rounded-[0.5rem]" />
          </div>
        </div>
      )}

      {/* 문의 섹션 */}
      {contact && (
        <div className="flex flex-col gap-[0.5rem]">
          <Text
            typography="subtitle-16-bold"
            textColor="gray-700"
            className="px-1"
          >
            문의
          </Text>
          <div className="flex items-center justify-between rounded-[0.75rem] bg-white p-5">
            <Text typography="body-16-regular" textColor="gray-700">
              {contact}
            </Text>
            <Button size="sm" color="gray" onClick={handleCall}>
              전화 걸기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
