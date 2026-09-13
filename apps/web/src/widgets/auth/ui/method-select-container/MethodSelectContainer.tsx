import { Flex } from '@causw/cds';

interface MethodSelectContainerProps {
  children: React.ReactNode;
}

export const MethodSelectContainer = ({
  children,
}: MethodSelectContainerProps) => {
  return (
    <>
      <Flex justify="center" className="min-h-screen bg-white">
        <Flex gap="none" className="w-90 flex-col justify-center">
          {children}
        </Flex>
      </Flex>
    </>
  );
};
