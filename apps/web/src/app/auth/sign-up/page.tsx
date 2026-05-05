import { SignUpFunnel } from '@/_pages/auth/sign-up/funnel/SignUpFunnel';

type PageProps = {
  searchParams?: Promise<Record<string, string | undefined>>;
};

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const rawStep = resolvedSearchParams?.['sign-up.step'];
  const step =
    rawStep === 'Info'
      ? 'Info'
      : rawStep === 'EmailVerification'
        ? 'EmailVerification'
        : 'Account';

  return <SignUpFunnel initialStep={step} />;
};

export default Page;
