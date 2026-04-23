import { DesktopOnly, LogoHeader } from '@/shared/ui';
import { ClearQueryProvider } from '@/shared/ui/provider';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DesktopOnly>
        <LogoHeader></LogoHeader>
      </DesktopOnly>
      <ClearQueryProvider>{children}</ClearQueryProvider>
    </>
  );
}
