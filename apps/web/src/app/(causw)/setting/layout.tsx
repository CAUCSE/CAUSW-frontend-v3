import { Flex } from '@causw/cds';

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex justify="center" align="start" className="h-full min-h-0 w-full">
      <Flex className="h-full min-h-0 w-full max-w-[900px] md:px-8 md:py-6">
        {children}
      </Flex>
    </Flex>
  );
}
