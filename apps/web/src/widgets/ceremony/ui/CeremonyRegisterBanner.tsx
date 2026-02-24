import Link from 'next/link';

import {
  HStack,
  Text,
  VStack,
  ChevronRight,
  EnvelopeColored,
} from '@causw/cds';

import { COPY } from '@/shared/constants';

//TODO : 경조사 신청 페이지 수정 with ROUTES

export function CeremonyRegisterBanner() {
  return (
    <Link href="/ceremony/apply" className="w-full">
      <div className="flex w-full items-center justify-between rounded-[1rem] bg-linear-to-r from-[#3786FF] to-[#98CDFF] py-[1.125rem] pr-3 pl-5">
        <VStack className="items-start gap-1">
          <Text typography="subtitle-18-bold" textColor="white">
            {COPY.CEREMONY_REGISTER}
          </Text>
          <Text
            typography="body-14-medium"
            textColor="white"
            className="whitespace-pre-wrap opacity-70"
          >
            {COPY.CEREMONY_REGISTER_DESCRIPTION}
          </Text>
        </VStack>

        <HStack className="items-center gap-5">
          {/* TODO : 아이콘 디자인 시스템에서 js style 수정되면 확인필요 */}
          <EnvelopeColored className="shrink-0" size={80} />
          <ChevronRight size={16} color="white" className="shrink-0" />
        </HStack>
      </div>
    </Link>
  );
}
