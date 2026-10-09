'use client';

import { useState } from 'react';

import { VStack } from '@causw/cds';

import {
  type EnrollmentAction,
  useMyAdmissionStateSuspenseQuery,
  useMyInfoSuspenseQuery,
} from '@/entities/auth';

import { useTrackMixpanelView } from '@/shared/lib/analytics';

import { EnrollmentStepContainer } from '../enrollment-step-container';
import { EnrollmentVerificationDialog } from '../enrollment-verification-dialog';

export const EnrollmentVerificationSectionContent = () => {
  const [open, setOpen] = useState(false);
  const { data: admissionData } = useMyAdmissionStateSuspenseQuery();
  const { data: myInfo } = useMyInfoSuspenseQuery();
  useTrackMixpanelView('academic_verification_viewed');

  const actionHandlers: Record<EnrollmentAction, () => void> = {
    submit: () => setOpen(true),
    edit: () => setOpen(true),
    resubmit: () => setOpen(true),
  };

  const status = admissionData.userState;
  const rejectedReason = admissionData.rejectReason ?? undefined;

  return (
    <>
      <VStack className="w-full gap-10">
        <EnrollmentStepContainer
          status={status}
          hasAdmission={admissionData.hasAdmission}
          rejectedReason={rejectedReason}
          actionHandlers={actionHandlers}
        />
      </VStack>

      <EnrollmentVerificationDialog
        open={open}
        onOpenChange={setOpen}
        userName={myInfo.name}
      />
    </>
  );
};
