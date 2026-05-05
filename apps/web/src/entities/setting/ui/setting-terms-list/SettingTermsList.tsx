'use client';

import { ChevronRight, Text, VStack } from '@causw/cds';

import { useTermsDetailDialogStore } from '@/entities/auth';
import { useTermsQuery } from '@/entities/auth';

const ROW_BUTTON_CLASS =
  'flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition-colors hover:bg-gray-50 active:bg-gray-100 cursor-pointer';

export const SettingTermsList = () => {
  const { data: terms } = useTermsQuery();
  const openTermsDetailDialog = useTermsDetailDialogStore(
    (state) => state.open,
  );

  return (
    <VStack gap="sm" className="mt-4 w-full">
      {terms.map((term) => (
        <button
          key={term.id}
          type="button"
          className={ROW_BUTTON_CLASS}
          onClick={() => openTermsDetailDialog(term)}
        >
          <Text typography="body-16-medium" textColor="gray-800">
            {term.title}
          </Text>
          <ChevronRight className="flex text-gray-400" size="18" />
        </button>
      ))}
    </VStack>
  );
};
