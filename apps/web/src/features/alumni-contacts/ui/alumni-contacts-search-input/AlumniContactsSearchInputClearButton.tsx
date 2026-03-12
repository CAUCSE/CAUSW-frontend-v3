'use client';

import { Button, CloseFilled } from '@causw/cds';

interface AlumniContactsSearchInputClearButtonProps {
  handleClearKeyword: () => void;
}

export const AlumniContactsSearchInputClearButton = ({
  handleClearKeyword,
}: AlumniContactsSearchInputClearButtonProps) => {
  return (
    <Button
      className="mt-0 mb-auto h-fit w-fit place-self-center self-center border-none bg-transparent p-0 hover:bg-transparent!"
      onClick={handleClearKeyword}
    >
      <CloseFilled size={20} color="gray-400" />
    </Button>
  );
};
