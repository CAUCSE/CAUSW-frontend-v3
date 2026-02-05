import { Flex } from '@causw/cds';

interface MethodSelectContainerProps {
  children: React.ReactNode;
}

export const MethodSelectContainer = ({
  children,
}: MethodSelectContainerProps) => {
  return (
    <>
      <Flex justify="center" className="min-h-screen bg-gray-100">
        <Flex
          gap="none"
          justify="center"
          className="w-[600px] flex-col px-4 py-20"
        >
          {children}
        </Flex>
      </Flex>
    </>
  );
};
