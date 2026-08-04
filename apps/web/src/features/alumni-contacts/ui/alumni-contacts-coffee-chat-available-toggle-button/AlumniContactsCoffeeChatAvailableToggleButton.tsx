'use client';

import { Button, Eye, EyeOff, Text } from '@causw/cds';

import { useAlumniContactsCoffeeChatAvailableToggleButton } from '../../model';

// TODO: 커피챗 가능 여부 변경 API 확정되면 클릭 핸들러 연결
export const AlumniContactsCoffeeChatAvailableToggleButton = () => {
  const { isCoffeeChatAvailable } =
    useAlumniContactsCoffeeChatAvailableToggleButton();

  const iconProps = {
    size: 16,
    color: 'gray-300',
  } as const;

  const VisibilityIcon = isCoffeeChatAvailable ? (
    <Eye {...iconProps} />
  ) : (
    <EyeOff {...iconProps} />
  );

  return (
    <Button
      color="gray"
      className="items-center px-3 py-2"
      // onClick={}
      disabled // TODO: 커피챗 가능 여부 변경 API 확정되면 disabled 제거
      type="button"
    >
      {VisibilityIcon}
      <Text typography="body-14-semibold" textColor="gray-500">
        커피챗 {isCoffeeChatAvailable ? '허용' : '비허용'}
      </Text>
    </Button>
  );
};
