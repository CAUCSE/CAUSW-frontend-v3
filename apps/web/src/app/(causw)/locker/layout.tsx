export default function Layout({
  children,
  lockerApplyModal,
}: {
  children: React.ReactNode;
  lockerApplyModal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {lockerApplyModal}
    </>
  );
}
