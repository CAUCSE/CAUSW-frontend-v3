import { Flex } from '@causw/cds';

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex justify="center" align="start" className="w-full">
      <Flex className="w-full max-w-[900px] md:px-8 md:py-6">{children}</Flex>
    </Flex>
  );
}
