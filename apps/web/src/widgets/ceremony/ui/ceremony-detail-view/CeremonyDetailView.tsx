'use client';

import { Button, Text, VStack } from '@causw/cds';

import {
  getCeremonyIcon,
  CeremonyInfoRow,
  type CeremonyDetailResponse,
} from '@/entities/ceremony';

import { formatDateWithTime } from '@/shared/lib';

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
    }
  };

  const handleCall = () => {
    if (contact) {
      window.location.href = `tel:${contact}`;
    }
  };

  return (
    <VStack gap={20} className="px-5 pt-4 pb-10">
      {/* 타이틀 행 */}
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white">
          {getCeremonyIcon(category)}
        </div>
        <Text typography="subtitle-18-bold" textColor="gray-700">
          {title}
        </Text>
      </div>

      {/* 정보 카드 */}
      <VStack gap={20} className="rounded-2xl bg-white p-5">
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
      </VStack>

      {/* 내용 섹션 */}
      {content && (
        <VStack gap={8}>
          <Text
            typography="subtitle-16-bold"
            textColor="gray-700"
            className="px-1"
          >
            내용
          </Text>
          <div className="rounded-xl bg-white p-5">
            <Text
              typography="body-16-regular"
              textColor="gray-700"
              className="whitespace-pre-wrap"
            >
              {content}
            </Text>
          </div>
        </VStack>
      )}

      {/* 주소 섹션 */}
      {address && (
        <VStack gap={8}>
          <Text
            typography="subtitle-16-bold"
            textColor="gray-700"
            className="px-1"
          >
            주소
          </Text>
          <VStack gap={16} className="rounded-xl bg-white p-5">
            <div className="flex items-center justify-between">
              <Text typography="subtitle-16-bold" textColor="gray-700">
                {address}
              </Text>
              <Button size="sm" color="gray" onClick={handleCopyAddress}>
                주소 복사
              </Button>
            </div>
            {detailedAddress && (
              <Text typography="body-16-regular" textColor="gray-500">
                {detailedAddress}
              </Text>
            )}
            <KakaoMap address={address} />
          </VStack>
        </VStack>
      )}

      {/* 문의 섹션 */}
      {contact && (
        <VStack gap={8}>
          <Text
            typography="subtitle-16-bold"
            textColor="gray-700"
            className="px-1"
          >
            문의
          </Text>
          <div className="flex items-center justify-between rounded-xl bg-white p-5">
            <Text typography="body-16-regular" textColor="gray-700">
              {contact}
            </Text>
            <Button size="sm" color="gray" onClick={handleCall}>
              전화 걸기
            </Button>
          </div>
        </VStack>
      )}
    </VStack>
  );
};
