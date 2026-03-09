import { SignUpFunnel } from '@/_pages/auth/sign-up/funnel/SignUpFunnel';

type PageProps = {
  searchParams?: Promise<{ step?: string }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const step =
    resolvedSearchParams?.step === 'info'
      ? 'Info'
      : resolvedSearchParams?.step === 'email-verification'
        ? 'EmailVerification'
        : 'Account';

  return <SignUpFunnel initialStep={step} />;
};

export default Page;
