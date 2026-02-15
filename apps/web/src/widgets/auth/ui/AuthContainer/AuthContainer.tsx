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
          className="min-h-screen w-full max-w-[37.5rem] flex-col px-5 py-4 md:px-8 md:py-20"
        >
          {children}
        </Flex>
      </Flex>
    </>
  );
};
