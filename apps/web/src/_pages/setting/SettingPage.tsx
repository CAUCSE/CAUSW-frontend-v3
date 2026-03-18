'use client';

import { useState } from 'react';

import {
  FeedbackReportDialog,
  TermsOfServiceDialog,
} from '@/widgets/customer-support';

export const SettingPage = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(true);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsFeedbackOpen(true)}>피드백 열기</button>
      <button onClick={() => setIsTermsOpen(true)}>약관 열기</button>

      <FeedbackReportDialog
        open={isFeedbackOpen}
        onOpenChange={setIsFeedbackOpen}
      />
      <TermsOfServiceDialog open={isTermsOpen} onOpenChange={setIsTermsOpen} />
    </>
  );
};
