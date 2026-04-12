import { Button, HStack, mergeStyles } from '@causw/cds';

import {
  ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL,
  type AlumniContactsDetailSectionTabType,
} from '@/entities/alumni-contacts';

interface AlumniContactsDetailSectionTabsProps {
  selectedTab: AlumniContactsDetailSectionTabType;
  handleClickCategoryTab: (tab: AlumniContactsDetailSectionTabType) => void;
}

export const AlumniContactsDetailSectionTabs = ({
  selectedTab,
  handleClickCategoryTab,
}: AlumniContactsDetailSectionTabsProps) => {
  return (
    <HStack className="sticky top-[57.6px] z-100 gap-5 overflow-x-auto bg-white">
      {Object.entries(ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL).map(
        ([key, value]) => (
          <Button
            key={key}
            color="white"
            onClick={() =>
              handleClickCategoryTab(key as AlumniContactsDetailSectionTabType)
            }
            className={mergeStyles(
              'px-0',
              selectedTab === key &&
                'rounded-none border-b-2 border-gray-700 text-gray-700',
            )}
          >
            {value}
          </Button>
        ),
      )}
    </HStack>
  );
};
