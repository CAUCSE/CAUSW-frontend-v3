import Image from 'next/image';
import Link from 'next/link';

import { HStack, Text, VStack, ChevronRight } from '@causw/cds';

import EnvelopeIcon from '../assets/envelope.svg';

import { COPY } from '@/shared';

//TODO : 경조사 신청 페이지 수정 with ROUTES

//TODO : ArrowRight 아이콘 색상&제목 디자인시스템(#ffefef) 변경되면 흰색인지 확인
export function HomeCeremonyBanner() {
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
          <Image src={EnvelopeIcon} alt="Envelope" width={80} height={80} />
          <ChevronRight size={16} className="shrink-0 text-gray-400" />
        </HStack>
      </div>
    </Link>
  );
}
