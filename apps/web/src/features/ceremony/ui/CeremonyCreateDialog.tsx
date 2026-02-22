'use client';

import { useState } from 'react';

import { Dialog, Tab } from '@causw/cds';

import { useBreakpoint } from '@/shared/hooks/useBreakpoint';
import type { CeremonyType } from '@/shared/types';
import { ActionHeader } from '@/shared/ui/ActionHeader';

const CEREMONY_TYPES: CeremonyType[] = ['경사', '조사'];

interface FormSectionProps {
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}

const FormSection = ({ title, optional, children }: FormSectionProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-1 px-1">
      <span className="typo-subtitle-16-bold text-gray-700">{title}</span>
      {optional && (
        <span className="typo-subtitle-16-bold text-gray-400">(선택)</span>
      )}
    </div>
    {children}
  </div>
);

interface CeremonyCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CeremonyCreateDialog = ({
  open,
  onOpenChange,
}: CeremonyCreateDialogProps) => {
  const { isMobileSize } = useBreakpoint();

  const [ceremonyType, setCeremonyType] = useState<CeremonyType | ''>('');

  const isValid = ceremonyType !== '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        fullscreen={isMobileSize}
        className="flex flex-col overflow-hidden bg-gray-100 p-0 md:max-w-[35.5rem] md:rounded-2xl"
      >
        <ActionHeader background="gray" isSticky={false}>
          <ActionHeader.BackButton onClick={() => onOpenChange(false)}>
            뒤로
          </ActionHeader.BackButton>
          <ActionHeader.ActionButton
            disabled={!isValid}
            className={isValid ? '' : '!text-gray-300'}
          >
            신청하기
          </ActionHeader.ActionButton>
        </ActionHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-8 md:px-6">
          <div className="px-1">
            <h1 className="typo-title-22-bold text-gray-700">
              경조사 등록 신청
            </h1>
          </div>

          <div className="flex flex-col gap-10">
            {/* 분류 */}
            <FormSection title="분류">
              <Tab
                variant="chip"
                value={ceremonyType}
                onValueChange={(v) => setCeremonyType(v as CeremonyType)}
              >
                <Tab.List>
                  {CEREMONY_TYPES.map((type) => (
                    <Tab.TabItem key={type} value={type}>
                      {type}
                    </Tab.TabItem>
                  ))}
                </Tab.List>
              </Tab>
            </FormSection>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
