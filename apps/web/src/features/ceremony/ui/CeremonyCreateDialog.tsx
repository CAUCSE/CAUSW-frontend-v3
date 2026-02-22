'use client';

import { useState } from 'react';

import { Dialog, Field, HStack, Tab, TextInput } from '@causw/cds';

import { useBreakpoint } from '@/shared/hooks/useBreakpoint';
import type { CeremonyType } from '@/shared/types';
import { ActionHeader } from '@/shared/ui/ActionHeader';

const CEREMONY_TYPES: CeremonyType[] = ['경사', '조사'];

const CUSTOM_VALUE = 'custom';

interface CategoryOption {
  value: string;
  label?: string;
  emoji?: string;
}

const HAPPY_CATEGORIES: CategoryOption[] = [
  { value: '결혼식', emoji: '💍' },
  { value: '돌잔치', emoji: '👶' },
  { value: '개업', emoji: '🏪' },
  { value: '생신잔치', emoji: '🎁' },
  { value: CUSTOM_VALUE, label: '직접 입력' },
];

const SAD_CATEGORIES: CategoryOption[] = [
  { value: '장례식' },
  { value: '사고' },
  { value: '투병' },
  { value: CUSTOM_VALUE, label: '직접 입력' },
];

const CATEGORY_MAP: Record<CeremonyType, CategoryOption[]> = {
  경사: HAPPY_CATEGORIES,
  조사: SAD_CATEGORIES,
};

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
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  const isCustom = category === CUSTOM_VALUE;
  const categoryOptions = ceremonyType ? CATEGORY_MAP[ceremonyType] : [];

  const handleTypeChange = (type: CeremonyType) => {
    setCeremonyType(type);
    setCategory('');
    setCustomCategory('');
  };

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
                onValueChange={(v) => handleTypeChange(v as CeremonyType)}
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

            {/* 상세 분류 */}
            {ceremonyType && (
              <FormSection title="상세 분류">
                <Tab
                  variant="chip"
                  value={category}
                  onValueChange={setCategory}
                >
                  <Tab.List className="flex-wrap">
                    {categoryOptions.map((opt) => (
                      <Tab.TabItem key={opt.value} value={opt.value}>
                        {opt.emoji ? (
                          <HStack gap="xs" className="items-center">
                            <span>{opt.emoji}</span>
                            <span>{opt.value}</span>
                          </HStack>
                        ) : (
                          (opt.label ?? opt.value)
                        )}
                      </Tab.TabItem>
                    ))}
                  </Tab.List>
                </Tab>

                {isCustom && (
                  <Field>
                    <TextInput
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder={`${ceremonyType}를 입력해주세요.`}
                      className="rounded-xl border-2 border-gray-600 bg-white"
                    />
                  </Field>
                )}
              </FormSection>
            )}
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
