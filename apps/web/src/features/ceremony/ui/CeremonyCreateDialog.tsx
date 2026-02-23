'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

import {
  Button,
  CTAButton,
  CalendarIcon,
  Camera,
  Checkbox,
  Chip,
  Close,
  Dialog,
  Field,
  HStack,
  Modal,
  Plus,
  Tab,
  TextArea,
  TextInput,
  Toggle,
} from '@causw/cds';

import { useBreakpoint } from '@/shared/hooks/useBreakpoint';
import type { CeremonyType } from '@/shared/types';
import { ActionHeader } from '@/shared/ui/ActionHeader';
import { ImageUploadField, type ImageUploadFieldRef } from '@/shared/ui/image';

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

const formatDate = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
};

const formatTime = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
};

const useFormattedInput = (
  formatter: (v: string) => string,
  setter: (v: string) => void,
) =>
  useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const raw = input.value;
      const cursor = input.selectionStart ?? raw.length;
      const formatted = formatter(raw);
      setter(formatted);

      const diff = formatted.length - raw.length;
      requestAnimationFrame(() => {
        const pos = cursor + diff;
        input.setSelectionRange(pos, pos);
      });
    },
    [formatter, setter],
  );

const RELATIONSHIP_OPTIONS = ['본인', '가족', '동문소식 대신 전달'] as const;

const FAMILY_RELATIONS = [
  '배우자',
  '부',
  '모',
  '장인',
  '장모',
  '아들',
  '딸',
  '형제',
  '자매',
  '남매',
  '조부',
  '조모',
] as const;

const ALUMNI_RELATIONS = [
  '동문 본인',
  '배우자',
  '부',
  '모',
  '장인',
  '장모',
  '아들',
  '딸',
] as const;

const DAUM_POSTCODE_SCRIPT =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const loadDaumPostcode = (): Promise<void> =>
  new Promise((resolve) => {
    if ((window as unknown as Record<string, unknown>).daum) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = DAUM_POSTCODE_SCRIPT;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });

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
  const [familyRelation, setFamilyRelation] = useState('');
  const [alumniName, setAlumniName] = useState('');
  const [alumniAdmissionYear, setAlumniAdmissionYear] = useState('');
  const [alumniRelation, setAlumniRelation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [hasEndDate, setHasEndDate] = useState(false);
  const [hasTime, setHasTime] = useState(false);

  const onStartDateChange = useFormattedInput(formatDate, setStartDate);
  const onEndDateChange = useFormattedInput(formatDate, setEndDate);
  const onStartTimeChange = useFormattedInput(formatTime, setStartTime);
  const onEndTimeChange = useFormattedInput(formatTime, setEndTime);
  const [notifyAll, setNotifyAll] = useState(false);
  const [content, setContent] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [showPostcode, setShowPostcode] = useState(false);
  const postcodeRef = useRef<HTMLDivElement>(null);
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [relatedLink, setRelatedLink] = useState('');
  const [admissionYears, setAdmissionYears] = useState<string[]>([]);
  const [showAdmissionYearModal, setShowAdmissionYearModal] = useState(false);
  const [admissionYearInput, setAdmissionYearInput] = useState('');
  const [, setPhotoFiles] = useState<File[]>([]);
  const [photoResetTrigger, setPhotoResetTrigger] = useState(false);
  const imageUploadRef = useRef<ImageUploadFieldRef>(null);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  // 다음 우편번호 embed
  useEffect(() => {
    if (!showPostcode) return;
    loadDaumPostcode().then(() => {
      const container = postcodeRef.current;
      if (!container) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (window as any).daum.Postcode({
        oncomplete: (data: { zonecode: string; address: string }) => {
          setPostalCode(data.zonecode);
          setAddress(data.address);
          setShowPostcode(false);
        },
        width: '100%',
        height: '100%',
      }).embed(container);
    });
  }, [showPostcode]);

  const isCustom = category === CUSTOM_VALUE;
  const categoryOptions = ceremonyType ? CATEGORY_MAP[ceremonyType] : [];

  const handleTypeChange = (type: CeremonyType) => {
    setCeremonyType(type);
    setCategory('');
    setCustomCategory('');
  };

  const handleRelationshipChange = (value: string) => {
    setRelationship(value);
    setFamilyRelation('');
    setAlumniName('');
    setAlumniAdmissionYear('');
    setAlumniRelation('');
  };

  const handleEndDateToggle = (checked: boolean) => {
    setHasEndDate(checked);
    if (!checked) setEndDate('');
  };

  const handleTimeToggle = (checked: boolean) => {
    setHasTime(checked);
    if (!checked) {
      setStartTime('');
      setEndTime('');
    }
  };

  const resetForm = () => {
    setCeremonyType('');
    setCategory('');
    setCustomCategory('');
    setRelationship('');
    setFamilyRelation('');
    setAlumniName('');
    setAlumniAdmissionYear('');
    setAlumniRelation('');
    setStartDate('');
    setEndDate('');
    setStartTime('');
    setEndTime('');
    setHasEndDate(false);
    setHasTime(false);
    setNotifyAll(false);
    setContent('');
    setPostalCode('');
    setAddress('');
    setShowPostcode(false);
    setDetailAddress('');
    setPhone('');
    setRelatedLink('');
    setAdmissionYears([]);
    setAdmissionYearInput('');
    setPhotoFiles([]);
    setPhotoResetTrigger((prev) => !prev);
  };

  const handleAddAdmissionYear = () => {
    const trimmed = admissionYearInput.trim();
    if (trimmed && !admissionYears.includes(trimmed)) {
      setAdmissionYears((prev) => [...prev, trimmed]);
    }
    setAdmissionYearInput('');
    setShowAdmissionYearModal(false);
  };

  const handleRemoveAdmissionYear = (year: string) => {
    setAdmissionYears((prev) => prev.filter((y) => y !== year));
  };

  const handleSetPhotoFiles = useCallback((_name: string, value: unknown) => {
    setPhotoFiles(value as File[]);
  }, []);

  const handleCloseAttempt = () => {
    setShowCloseConfirm(true);
  };

  const handleConfirmClose = () => {
    setShowCloseConfirm(false);
    resetForm();
    onOpenChange(false);
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      handleCloseAttempt();
      return;
    }
    onOpenChange(nextOpen);
  };

  const resolvedCategory = isCustom ? customCategory.trim() : category;

  const isRelationshipValid =
    relationship === '본인' ||
    (relationship === '가족' && familyRelation !== '') ||
    (relationship === '동문소식 대신 전달' &&
      alumniName.trim() !== '' &&
      alumniAdmissionYear.trim() !== '' &&
      alumniRelation !== '');

  const isValid =
    ceremonyType !== '' &&
    resolvedCategory !== '' &&
    isRelationshipValid &&
    startDate.trim() !== '' &&
    (notifyAll || admissionYears.length > 0) &&
    phone.trim() !== '' &&
    relatedLink.trim() !== '';

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <Dialog.Content
        fullscreen={isMobileSize}
        className="overflow-hidden bg-gray-100 p-0 md:h-[calc(100vh-12.5rem)] md:w-full md:max-w-[43.75rem] md:rounded-[1rem]"
      >
        <Dialog.Title
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
            borderWidth: 0,
          }}
        >
          경조사 등록 신청
        </Dialog.Title>
        <div
          className="md:px-4 md:py-6"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'clip',
          }}
        >
          <ActionHeader
            background="gray"
            isSticky={false}
            style={{ flexShrink: 0 }}
          >
            <ActionHeader.BackButton onClick={handleCloseAttempt}>
              뒤로
            </ActionHeader.BackButton>
            <ActionHeader.ActionButton
              disabled={!isValid}
              className={isValid ? '' : '!text-gray-300'}
            >
              신청하기
            </ActionHeader.ActionButton>
          </ActionHeader>

          <div
            className="px-4 pb-8 md:px-2 md:pt-4"
            style={{ flex: '1 1 0%', minHeight: 0, overflowY: 'auto' }}
          >
            <div className="flex flex-col gap-4 md:gap-5">
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
                    onValueChange={handleRelationshipChange}
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

                {/* 상세 관계 - 가족 */}
                {relationship === '가족' && (
                  <FormSection title="상세 관계">
                    <Tab
                      variant="chip"
                      value={familyRelation}
                      onValueChange={setFamilyRelation}
                    >
                      <div className="flex flex-col gap-2">
                        <Tab.List>
                          {FAMILY_RELATIONS.slice(0, 6).map((rel) => (
                            <Tab.TabItem key={rel} value={rel}>
                              {rel}
                            </Tab.TabItem>
                          ))}
                        </Tab.List>
                        <Tab.List>
                          {FAMILY_RELATIONS.slice(6).map((rel) => (
                            <Tab.TabItem key={rel} value={rel}>
                              {rel}
                            </Tab.TabItem>
                          ))}
                        </Tab.List>
                      </div>
                    </Tab>
                  </FormSection>
                )}

                {/* 동문소식 대신 전달 - 대상 성함 + 관계 */}
                {relationship === '동문소식 대신 전달' && (
                  <>
                    <FormSection title="대상 성함">
                      <Field>
                        <TextInput
                          value={alumniName}
                          onChange={(e) => setAlumniName(e.target.value)}
                          placeholder="대상 성함을 입력해주세요."
                          className="rounded-xl bg-white"
                        />
                      </Field>
                    </FormSection>

                    <FormSection title="동문 학번 (입학년도)">
                      <Field>
                        <TextInput
                          value={alumniAdmissionYear}
                          onChange={(e) =>
                            setAlumniAdmissionYear(e.target.value)
                          }
                          placeholder="동문 학번을 입력해주세요."
                          className="rounded-xl bg-white"
                        />
                      </Field>
                    </FormSection>

                    <FormSection title="대상과의 관계">
                      <Tab
                        variant="chip"
                        value={alumniRelation}
                        onValueChange={setAlumniRelation}
                      >
                        <div className="flex flex-col gap-2">
                          <Tab.List>
                            {ALUMNI_RELATIONS.slice(0, 4).map((rel) => (
                              <Tab.TabItem key={rel} value={rel}>
                                {rel}
                              </Tab.TabItem>
                            ))}
                          </Tab.List>
                          <Tab.List>
                            {ALUMNI_RELATIONS.slice(4).map((rel) => (
                              <Tab.TabItem key={rel} value={rel}>
                                {rel}
                              </Tab.TabItem>
                            ))}
                          </Tab.List>
                        </div>
                      </Tab>
                    </FormSection>
                  </>
                )}

                {/* 경조사 기간 */}
                <FormSection title="경조사 기간">
                  <div className="flex flex-col gap-3">
                    {/* 시작 행 */}
                    <div className="flex items-center gap-2">
                      <Field className="min-w-0 flex-1">
                        <TextInput
                          value={startDate}
                          onChange={onStartDateChange}
                          placeholder="연도-월-일"
                          maxLength={10}
                          inputMode="numeric"
                          rightIcon={
                            <CalendarIcon size={20} color="gray-400" />
                          }
                          className="rounded-xl bg-white"
                        />
                      </Field>
                      {(hasEndDate || hasTime) && (
                        <>
                          <span className="w-2 shrink-0 border-t border-gray-300" />
                          <Field className="min-w-0 flex-1">
                            {hasTime ? (
                              <TextInput
                                value={startTime}
                                onChange={onStartTimeChange}
                                placeholder="시간"
                                maxLength={5}
                                inputMode="numeric"
                                className="rounded-xl bg-white"
                              />
                            ) : (
                              <TextInput
                                value={endDate}
                                onChange={onEndDateChange}
                                placeholder="연도-월-일"
                                maxLength={10}
                                inputMode="numeric"
                                className="rounded-xl bg-white"
                              />
                            )}
                          </Field>
                        </>
                      )}
                    </div>

                    {/* 종료 행 (종료일 + 시간 모두 ON일 때만) */}
                    {hasEndDate && hasTime && (
                      <div className="flex items-center gap-2">
                        <Field className="min-w-0 flex-1">
                          <TextInput
                            value={endDate}
                            onChange={onEndDateChange}
                            placeholder="연도-월-일"
                            maxLength={10}
                            inputMode="numeric"
                            className="rounded-xl bg-white"
                          />
                        </Field>
                        <span className="w-2 shrink-0 border-t border-gray-300" />
                        <Field className="min-w-0 flex-1">
                          <TextInput
                            value={endTime}
                            onChange={onEndTimeChange}
                            placeholder="시간"
                            maxLength={5}
                            inputMode="numeric"
                            className="rounded-xl bg-white"
                          />
                        </Field>
                      </div>
                    )}

                    <Toggle
                      checked={hasEndDate}
                      onCheckedChange={handleEndDateToggle}
                    >
                      <Toggle.Switch />
                      <Toggle.Label>종료일</Toggle.Label>
                    </Toggle>
                    <Toggle
                      checked={hasTime}
                      onCheckedChange={handleTimeToggle}
                    >
                      <Toggle.Switch />
                      <Toggle.Label>시간 포함</Toggle.Label>
                    </Toggle>
                  </div>
                </FormSection>

                {/* 경조사 알림 보낼 학번 설정 */}
                <FormSection title="경조사 알림 보낼 학번 설정">
                  {!notifyAll && admissionYears.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {admissionYears.map((year) => (
                        <Chip
                          key={year}
                          color="white"
                          size="sm"
                          onClick={() => handleRemoveAdmissionYear(year)}
                          className="!rounded-sm !text-gray-500"
                        >
                          {year}학번
                          <Close size={12} color="gray-500" />
                        </Chip>
                      ))}
                    </div>
                  )}
                  <CTAButton
                    color="white"
                    fullWidth
                    disabled={notifyAll}
                    onClick={() => setShowAdmissionYearModal(true)}
                    className={notifyAll ? '!bg-gray-200 !text-gray-300' : ''}
                  >
                    <Plus
                      size={20}
                      color={notifyAll ? 'gray-300' : 'gray-500'}
                    />
                    학번 추가
                  </CTAButton>
                  <div className="px-1">
                    <Checkbox
                      checked={notifyAll}
                      onCheckedChange={setNotifyAll}
                    >
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
                      maxLength={500}
                    />
                    <div className="mt-8 flex flex-col gap-4">
                      <ImageUploadField
                        ref={imageUploadRef}
                        name="photos"
                        setValue={handleSetPhotoFiles as never}
                        resetTrigger={photoResetTrigger}
                      />
                      <div className="flex items-end justify-between">
                        <Button
                          size="md"
                          color="gray"
                          onClick={() =>
                            imageUploadRef.current?.openFilePicker()
                          }
                        >
                          <Camera size={16} color="gray-600" />
                          사진첨부
                        </Button>
                        <span className="typo-body-16-regular text-gray-400">
                          {content.length}/500
                        </span>
                      </div>
                    </div>
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
                      <CTAButton
                        color="dark"
                        className="w-[7.5rem] shrink-0"
                        onClick={() => setShowPostcode(true)}
                      >
                        우편번호 찾기
                      </CTAButton>
                    </div>
                    {showPostcode && (
                      <div
                        ref={postcodeRef}
                        className="h-[25rem] w-full overflow-hidden rounded-xl border border-gray-200"
                      />
                    )}
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
          </div>
        </div>
      </Dialog.Content>

      <Modal
        open={showAdmissionYearModal}
        onOpenChange={(next) => {
          setShowAdmissionYearModal(next);
          if (!next) setAdmissionYearInput('');
        }}
      >
        <Modal.Content className="!rounded-[1.25rem] !pt-4">
          <Modal.Title className="sr-only">학번 추가하기</Modal.Title>
          <div className="flex w-full flex-col gap-8 px-4">
            <div className="flex flex-col gap-2">
              <div className="px-1">
                <span className="typo-subtitle-18-bold text-gray-700">
                  학번 추가하기
                </span>
              </div>
              <Field>
                <TextInput
                  value={admissionYearInput}
                  onChange={(e) => setAdmissionYearInput(e.target.value)}
                  placeholder="학번을 입력해주세요."
                  inputMode="numeric"
                  className="rounded-xl bg-gray-100"
                />
              </Field>
            </div>
            <div className="flex gap-2">
              <Modal.Close asChild>
                <CTAButton color="light" fullWidth>
                  닫기
                </CTAButton>
              </Modal.Close>
              <CTAButton
                color="dark"
                fullWidth
                disabled={!admissionYearInput.trim()}
                onClick={handleAddAdmissionYear}
              >
                추가하기
              </CTAButton>
            </div>
          </div>
        </Modal.Content>
      </Modal>

      <Modal open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
        <Modal.Content>
          <Modal.Title textAlign="center">작성을 그만두시겠어요?</Modal.Title>
          <Modal.Footer>
            <Modal.Close asChild>
              <CTAButton color="light" fullWidth>
                취소
              </CTAButton>
            </Modal.Close>
            <Modal.ActionButton color="dark" onClick={handleConfirmClose}>
              나가기
            </Modal.ActionButton>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Dialog>
  );
};
