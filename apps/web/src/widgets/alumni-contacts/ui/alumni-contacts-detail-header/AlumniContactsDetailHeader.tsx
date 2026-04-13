import { mergeStyles } from '@causw/cds';

import { ActionHeader } from '@/shared/ui';

import { useAlumniContactsDetailHeaderTheme } from '../../model';

export const AlumniContactsDetailHeader = () => {
  const { changeHeaderTextColor } = useAlumniContactsDetailHeaderTheme();

  return (
    <ActionHeader className="bg-transparent px-5 backdrop-saturate-100 md:px-6">
      <ActionHeader.BackButton
        className={mergeStyles(
          changeHeaderTextColor
            ? '[&_span]:text-gray-700 [&_span]:group-hover:text-gray-900! [&_svg]:fill-gray-700 [&_svg]:group-hover:fill-gray-900!'
            : '[&_span]:text-white [&_span]:group-hover:text-gray-300! [&_svg]:fill-white [&_svg]:group-hover:fill-gray-300!',
        )}
      >
        뒤로
      </ActionHeader.BackButton>
      {/* <ActionHeader.ActionButton
        className={mergeStyles(
          changeHeaderTextColor
            ? 'text-gray-700 hover:text-gray-900!'
            : 'text-white hover:text-gray-300!',
        )}
        onClick={handleClickEditButton}
      >
        수정하기
      </ActionHeader.ActionButton> */}
    </ActionHeader>
  );
};
