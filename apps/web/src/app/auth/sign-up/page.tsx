import { SignUpFunnel } from '@/_pages/auth/sign-up/funnel/SignUpFunnel';

type PageProps = {
  searchParams?: Promise<Record<string, string | undefined>>;
};

const Page = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const rawStep =
    resolvedSearchParams?.step ?? resolvedSearchParams?.['sign-up.step'];
  const normalizedStep = rawStep?.toLowerCase();
  const step =
    normalizedStep === 'info'
      ? 'Info'
      : normalizedStep === 'email-verification' ||
          normalizedStep === 'emailverification'
        ? 'EmailVerification'
        : 'Account';

  return <SignUpFunnel initialStep={step} />;
};

export default Page;
