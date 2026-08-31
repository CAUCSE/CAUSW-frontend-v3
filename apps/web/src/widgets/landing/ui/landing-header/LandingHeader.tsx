import { Button, Text } from '@causw/cds';

export const LandingHeader = () => {
  return (
    <header className="max-w-desktop fixed top-0 z-10 flex h-14 w-full items-center justify-end bg-white px-2.25">
      <Button
        type="button"
        className="rounded-sm bg-gray-700 px-3 py-2 hover:bg-gray-700!"
      >
        <Text typography="body-14-medium" textColor="white" className="w-25.5">
          웹 사이트 이용하기
        </Text>
      </Button>
    </header>
  );
};
