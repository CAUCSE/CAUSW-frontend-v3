'use client';

import { Button, Eye, EyeOff, Text } from '@causw/cds';

import { useAlumniContactsCoffeeChatAvailableToggleButton } from '../../model';

// TODO: 커피챗 토글 기능
// 행사 기간 중에는 관리자가 멘토에 한해 커피챗 가능 여부를 강제 설정하고
// 일반 유저는 직접 변경할 수 없는 정책 — 행사 종료 후 일반 유저 self-toggle이
// 열리면 그때 클릭 핸들러/API 연동
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
      disabled // 행사 기간 중 정책상 비활성화 (위 주석 참고)
      type="button"
    >
      {VisibilityIcon}
      <Text typography="body-14-semibold" textColor="gray-500">
        커피챗 {isCoffeeChatAvailable ? '허용' : '비허용'}
      </Text>
    </Button>
  );
};
