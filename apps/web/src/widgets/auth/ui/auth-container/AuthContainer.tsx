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
          className="min-h-screen w-full flex-col px-5 py-4 md:max-w-[37.5rem] md:justify-center md:px-8 md:py-20"
        >
          {children}
        </Flex>
      </Flex>
    </>
  );
};
