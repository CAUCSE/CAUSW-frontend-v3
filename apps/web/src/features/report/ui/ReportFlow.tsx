'use client';

import { useState } from 'react';

import { REPORT_OPTIONS } from '@/features/report';

import { REPORT_REASON, type ReportReason } from '@/entities/report';

import { ReportConfirmModal } from './ReportConfirmModal';
import { ReportReasonSelector } from './ReportReasonSelector';

interface ReportFlowProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmitReport: (reason: ReportReason) => void;
}

export const ReportFlow = ({
  open,
  setOpen,
  onSubmitReport,
}: ReportFlowProps) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [reason, setReason] = useState<ReportReason>(REPORT_REASON.SPAM_AD);

  const option = REPORT_OPTIONS[reason];

  const goConfirm = () => setIsConfirm(true);
  const handleBackToSelect = () => setIsConfirm(false);

  const handleConfirm = () => {
    onSubmitReport(reason);
    setIsConfirm(false);
    setOpen(false);
  };

  const handleClose = (next: boolean) => {
    if (!next) setIsConfirm(false);
    setOpen(next);
  };

  return (
    <>
      <ReportReasonSelector
        open={open && !isConfirm}
        onOpenChange={handleClose}
        reason={reason}
        setReason={setReason}
        onSubmit={goConfirm}
      />

      <ReportConfirmModal
        open={open && isConfirm}
        title={option.confirm.title}
        description={option.confirm.description}
        onClose={handleBackToSelect}
        onConfirm={handleConfirm}
      />
    </>
  );
};
