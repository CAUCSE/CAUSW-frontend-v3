'use client';

import { useState } from 'react';

import {
  Button,
  CTAButton,
  Camera,
  Checkbox,
  DatePicker,
  Dialog,
  Field,
  HStack,
  Plus,
  Tab,
  TextArea,
  TextInput,
  Toggle,
} from '@causw/cds';

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

const RELATIONSHIP_OPTIONS = ['본인', '가족', '동문소식 대신 전달'] as const;

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
  const [relationship, setRelationship] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [hasEndDate, setHasEndDate] = useState(false);
  const [hasTime, setHasTime] = useState(false);
  const [notifyAll, setNotifyAll] = useState(false);
  const [content, setContent] = useState('');
  const [postalCode] = useState('');
  const [address] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [relatedLink, setRelatedLink] = useState('');

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

            {/* 관계 */}
            <FormSection title="관계">
              <Tab
                variant="chip"
                value={relationship}
                onValueChange={setRelationship}
              >
                <Tab.List>
                  {RELATIONSHIP_OPTIONS.map((opt) => (
                    <Tab.TabItem key={opt} value={opt}>
                      {opt}
                    </Tab.TabItem>
                  ))}
                </Tab.List>
              </Tab>
            </FormSection>

            {/* 경조사 기간 */}
            <FormSection title="경조사 기간">
              <div className="flex flex-col gap-3">
                <DatePicker
                  variant="white"
                  value={startDate}
                  onValueChange={setStartDate}
                  placeholder="날짜 선택"
                />
                <Toggle checked={hasEndDate} onCheckedChange={setHasEndDate}>
                  <Toggle.Switch />
                  <Toggle.Label>종료일</Toggle.Label>
                </Toggle>
                <Toggle checked={hasTime} onCheckedChange={setHasTime}>
                  <Toggle.Switch />
                  <Toggle.Label>시간 포함</Toggle.Label>
                </Toggle>
              </div>
            </FormSection>

            {/* 경조사 알림 보낼 학번 설정 */}
            <FormSection title="경조사 알림 보낼 학번 설정">
              <CTAButton color="white" fullWidth>
                <Plus size={20} color="gray-500" />
                학번 추가
              </CTAButton>
              <div className="px-1">
                <Checkbox checked={notifyAll} onCheckedChange={setNotifyAll}>
                  <Checkbox.Indicator />
                  <Checkbox.Label>모든 학번에게 알림 전송</Checkbox.Label>
                </Checkbox>
              </div>
            </FormSection>

            {/* 내용 (선택) */}
            <FormSection title="내용" optional>
              <TextArea>
                <TextArea.Input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="텍스트를 적어주세요."
                  resize={false}
                />
                <TextArea.Footer className="mt-8 flex items-end justify-between">
                  <Button size="md" color="gray">
                    <Camera size={16} color="gray-600" />
                    사진첨부
                  </Button>
                  <span className="typo-body-16-regular text-gray-400">
                    {content.length}/500
                  </span>
                </TextArea.Footer>
              </TextArea>
            </FormSection>

            {/* 주소 (선택) */}
            <FormSection title="주소" optional>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Field className="flex-1">
                    <TextInput
                      value={postalCode}
                      readOnly
                      placeholder="우편번호"
                      className="rounded-xl bg-gray-200"
                    />
                  </Field>
                  <CTAButton color="dark" className="w-[7.5rem] shrink-0">
                    우편번호 찾기
                  </CTAButton>
                </div>
                <Field>
                  <TextInput
                    value={address}
                    readOnly
                    placeholder="주소"
                    className="rounded-xl bg-gray-200"
                  />
                </Field>
                <Field>
                  <TextInput
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    placeholder="상세주소를 입력해주세요."
                    className="rounded-xl bg-white"
                  />
                </Field>
              </div>
            </FormSection>

            {/* 문의 */}
            <FormSection title="문의">
              <Field>
                <TextInput
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="연락 가능한 전화번호를 입력해주세요."
                  className="rounded-xl bg-white"
                />
              </Field>
            </FormSection>

            {/* 관련 링크 */}
            <FormSection title="관련 링크">
              <Field>
                <TextInput
                  value={relatedLink}
                  onChange={(e) => setRelatedLink(e.target.value)}
                  placeholder="URL을 입력해주세요."
                  className="rounded-xl bg-white"
                />
              </Field>
            </FormSection>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
