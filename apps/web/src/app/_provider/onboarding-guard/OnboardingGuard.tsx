'use client';

import { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAgreeTermsMutation } from '@/features/auth';

import { authQueryKey, authQueryOptions } from '@/entities/auth/config/query';
import type {
  OnboardingStatus,
  TermsAgreementRequestDto,
} from '@/entities/auth/model/types';

import { useBreakpoint, useIsMounted } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

const TermsBottomSheet = dynamic(
  () =>
    import('@/widgets/auth/ui/terms-bottom-sheet').then(
      (mod) => mod.TermsBottomSheet,
    ),
  {
    ssr: false,
    loading: () => <SuspenseView />,
  },
);

const TermsDialog = dynamic(
  () => import('@/widgets/auth/ui/terms-dialog').then((mod) => mod.TermsDialog),
  {
    ssr: false,
    loading: () => <SuspenseView />,
  },
);

const REDIRECT_PATH_BY_STATUS: Partial<Record<OnboardingStatus, string>> = {
  EMAIL_VERIFICATION_REQUIRED: '/auth/email-verification',
  GUEST: '/auth/sign-up/oauth-additional-info',
  ACADEMIC_CERTIFICATION_REQUIRED: '/auth/enrollment-verification',
};

interface OnboardingGuardProps {
  children: React.ReactNode;
}

export const OnboardingGuard = ({ children }: OnboardingGuardProps) => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isMobileSize } = useBreakpoint();
  const { data: myInfo } = useQuery({
    ...authQueryOptions.me(),
    enabled: isMounted,
  });
  const onboardingStatus = myInfo?.onboardingStatus;
  const redirectPath = onboardingStatus
    ? REDIRECT_PATH_BY_STATUS[onboardingStatus]
    : undefined;
  const shouldShowTermsAgreement = onboardingStatus === 'TERMS_REQUIRED';

  const agreeTermsMutation = useAgreeTermsMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: authQueryKey.me(),
      });
    },
  });

  const handleSubmitTermsAgreement = async (
    params: TermsAgreementRequestDto,
  ) => {
    await agreeTermsMutation.mutateAsync(params);
  };

  useEffect(() => {
    if (redirectPath) {
      router.replace(redirectPath);
    }
  }, [redirectPath, router]);

  return (
    <>
      {children}
      {shouldShowTermsAgreement && isMobileSize && (
        <TermsBottomSheet
          open
          onOpenChange={() => undefined}
          onSubmitTermsAgreement={handleSubmitTermsAgreement}
        />
      )}
      {shouldShowTermsAgreement && !isMobileSize && (
        <TermsDialog
          open
          onOpenChange={() => undefined}
          onSubmitTermsAgreement={handleSubmitTermsAgreement}
        />
      )}
    </>
  );
};
