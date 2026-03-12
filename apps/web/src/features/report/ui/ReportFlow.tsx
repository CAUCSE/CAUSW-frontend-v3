'use client';

import { useState } from 'react';

import { REPORT_OPTIONS, ReportReason } from '@/features/report';

import { ReportConfirmModal } from './ReportConfirmModal';
import { ReportReasonSelector } from './ReportReasonSelector';

interface ReportFlowProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  // TODO: API 연동 시 파라미터 구조 변경
  onSubmitReport: () => void;
}

export const ReportFlow = ({
  open,
  setOpen,
  onSubmitReport,
}: ReportFlowProps) => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [reason, setReason] = useState<ReportReason>('option1');

  const option = REPORT_OPTIONS[reason];

  const goConfirm = () => setIsConfirm(true);
  const handleBackToSelect = () => setIsConfirm(false);

  const handleConfirm = () => {
    onSubmitReport();
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
