import { Flex } from '@causw/cds';

interface AuthContainerProps {
  children: React.ReactNode;
}

export const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <>
      <Flex justify="center" className="min-h-screen bg-gray-100">
        <Flex
          gap="none"
          justify="start"
          className="min-h-screen w-[600px] flex-col px-4 py-20"
        >
          {children}
        </Flex>
      </Flex>
    </>
  );
};
