import { DesktopOnly, LogoHeader } from '@/shared/ui';

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
      {children}
    </>
  );
}
