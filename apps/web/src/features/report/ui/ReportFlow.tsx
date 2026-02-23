'use client';

import { useState } from 'react';

import { REPORT_OPTIONS } from '../config';
import { ReportReason } from '../model';

import { ReportConfirmDialog } from './ReportConfirmDialog';
import { ReportModal } from './ReportModal';

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
      {!isConfirm && (
        <ReportModal
          open={open}
          setOpen={handleClose}
          reason={reason}
          setReason={setReason}
          onSubmit={goConfirm}
        />
      )}

      {isConfirm && (
        <ReportConfirmDialog
          open
          title={option.confirm.title}
          description={option.confirm.description}
          onClose={handleBackToSelect}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};
