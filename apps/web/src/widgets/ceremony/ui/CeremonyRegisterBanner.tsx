import Link from 'next/link';

import {
  HStack,
  Text,
  VStack,
  ChevronRight,
  EnvelopeColored,
} from '@causw/cds';

import { COPY, ROUTES } from '@/shared/constants';

export function CeremonyRegisterBanner() {
  return (
    <Link href={`${ROUTES.CEREMONY}?create=true`} className="w-full">
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
          <EnvelopeColored className="shrink-0" size={80} />
          <ChevronRight size={16} color="white" className="shrink-0" />
        </HStack>
      </div>
    </Link>
  );
}
