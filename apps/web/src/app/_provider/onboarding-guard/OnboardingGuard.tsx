'use client';

import { useEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useAgreeTermsMutation } from '@/features/auth';
import { useProfileImageEdit } from '@/features/setting';

import { authQueryKey, authQueryOptions } from '@/entities/auth/config/query';
import type {
  OnboardingStatus,
  TermsAgreementRequestDto,
} from '@/entities/auth/model/types';

import { useBreakpoint, useIsMounted } from '@/shared/hooks';
import { SuspenseView } from '@/shared/ui';

const TermsBottomSheet = dynamic(
  () => import('@/widgets/auth').then((mod) => mod.TermsBottomSheet),
  {
    ssr: false,
    loading: () => <SuspenseView />,
  },
);

const TermsDialog = dynamic(
  () => import('@/widgets/auth').then((mod) => mod.TermsDialog),
  {
    ssr: false,
    loading: () => <SuspenseView />,
  },
);

const ProfileImageEditDialog = dynamic(
  () => import('@/widgets/setting').then((mod) => mod.ProfileImageEditDialog),
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

const ONBOARDING_OVERLAY = {
  TERMS_AGREEMENT: 'TERMS_AGREEMENT',
  PROFILE_IMAGE_EDIT: 'PROFILE_IMAGE_EDIT',
} as const;

type OnboardingOverlay =
  (typeof ONBOARDING_OVERLAY)[keyof typeof ONBOARDING_OVERLAY];

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
  const { currentProfileImage, handleSubmitProfileImage } = useProfileImageEdit(
    {
      myInfo,
    },
  );

  const onboardingStatus = myInfo?.onboardingStatus;
  const profileImageType =
    myInfo?.profileImage.profileImageType === 'GHOST'
      ? 'UNSET'
      : myInfo?.profileImage.profileImageType;
  const onboardingRedirectPath = onboardingStatus
    ? REDIRECT_PATH_BY_STATUS[onboardingStatus]
    : undefined;

  const onboardingOverlay: OnboardingOverlay | null = useMemo(() => {
    if (
      !isMounted ||
      (onboardingStatus && REDIRECT_PATH_BY_STATUS[onboardingStatus])
    ) {
      return null;
    }

    if (onboardingStatus === 'TERMS_REQUIRED') {
      return ONBOARDING_OVERLAY.TERMS_AGREEMENT;
    }

    if (profileImageType === 'UNSET') {
      return ONBOARDING_OVERLAY.PROFILE_IMAGE_EDIT;
    }

    return null;
  }, [isMounted, onboardingStatus, profileImageType]);

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
    if (onboardingRedirectPath) {
      router.replace(onboardingRedirectPath);
    }
  }, [onboardingRedirectPath, router]);

  return (
    <>
      {children}
      {onboardingOverlay === ONBOARDING_OVERLAY.TERMS_AGREEMENT &&
        isMobileSize && (
          <TermsBottomSheet
            open
            onOpenChange={() => undefined}
            onSubmitTermsAgreement={handleSubmitTermsAgreement}
          />
        )}
      {onboardingOverlay === ONBOARDING_OVERLAY.TERMS_AGREEMENT &&
        !isMobileSize && (
          <TermsDialog
            open
            onOpenChange={() => undefined}
            onSubmitTermsAgreement={handleSubmitTermsAgreement}
          />
        )}

      {onboardingOverlay === ONBOARDING_OVERLAY.PROFILE_IMAGE_EDIT && (
        <ProfileImageEditDialog
          open
          onOpenChange={() => undefined}
          initialValue={{
            ...currentProfileImage,
            profileImageType:
              profileImageType ?? currentProfileImage.profileImageType,
          }}
          onSubmit={handleSubmitProfileImage}
          requireSubmitToClose
        />
      )}
    </>
  );
};
