'use client';

import React, { useState } from 'react';

import {
  Dialog,
  Text,
  HStack,
  VStack,
  CTAButton,
  Box,
  Calendar,
} from '@causw/cds';

export type DialogType =
  | 'SAVE_CONFIRM'
  | 'DELETE_CONFIRM'
  | 'EDIT_JOB'
  | 'EDIT_DESC'
  | 'EDIT_VISIBLE'
  | 'ADD_LINK'
  | 'ADD_TECH'
  | 'ADD_CAREER'
  | 'ADD_PROJECT'
  | 'ADD_INT_TECH'
  | 'ADD_INT_DOMAIN'
  | null;

export interface CalendarData {
  startYear?: number | null;
  startMonth?: number | null;
  endYear?: number | null;
  endMonth?: number | null;
}

interface ProfileDialogsProps {
  isOpen: boolean;
  dialogType: DialogType;
  inputValue: string;
  setInputValue: (val: string) => void;
  toggleValue: boolean;
  setToggleValue: (val: boolean | ((prev: boolean) => boolean)) => void;
  onClose: () => void;
  onConfirm: (extraData?: CalendarData) => void;
}

const CONFIRM_DIALOGS = new Set<DialogType>(['SAVE_CONFIRM', 'DELETE_CONFIRM']);

const DIALOG_TITLES: Partial<Record<NonNullable<DialogType>, string>> = {
  EDIT_JOB: '직업 수정하기',
  EDIT_DESC: '소개글 수정하기',
  EDIT_VISIBLE: '연락처 공개 여부',
  ADD_LINK: '링크 추가하기',
  ADD_TECH: '기술 스택 추가하기',
  ADD_CAREER: '경력 추가하기',
  ADD_PROJECT: '대표 프로젝트 추가하기',
  ADD_INT_TECH: '관심 기술 추가하기',
  ADD_INT_DOMAIN: '관심 도메인 추가하기',
};

const isComplexAddType = (type: DialogType): boolean =>
  type === 'ADD_CAREER' || type === 'ADD_PROJECT';

const formatDate = (date: Date | null): string => {
  if (!date) return '연도-월';
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
};

const getConfirmButtonText = (dialogType: DialogType): string => {
  if (dialogType === 'SAVE_CONFIRM') return '확인';
  if (dialogType === 'DELETE_CONFIRM') return '삭제하기';
  if (dialogType?.includes('ADD')) return '추가하기';
  return '수정하기';
};

const CalendarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.25 3H3.75C2.92157 3 2.25 3.67157 2.25 4.5V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V4.5C15.75 3.67157 15.0784 3 14.25 3Z"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 1.5V4.5M6 1.5V4.5M2.25 7.5H15.75"
      stroke="#9CA3AF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface CalendarState {
  startDate: Date | null;
  endDate: Date | null;
  activeCalendar: 'start' | 'end' | null;
}

const INITIAL_CALENDAR_STATE: CalendarState = {
  startDate: null,
  endDate: null,
  activeCalendar: null,
};

const visuallyHiddenStyle: React.CSSProperties = {
  border: 0,
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

export const ProfileDialogs = ({
  isOpen,
  dialogType,
  inputValue,
  setInputValue,
  toggleValue,
  setToggleValue,
  onClose,
  onConfirm,
}: ProfileDialogsProps) => {
  const [calendarState, setCalendarState] = useState<CalendarState>(
    INITIAL_CALENDAR_STATE,
  );

  const { startDate, endDate, activeCalendar } = calendarState;
  const isComplexAdd = isComplexAddType(dialogType);
  const maxLength = dialogType === 'EDIT_JOB' ? 8 : 40;

  const handleDateClick = (date: Date) => {
    setCalendarState((prev) => ({
      ...prev,
      [activeCalendar === 'start' ? 'startDate' : 'endDate']: date,
      activeCalendar: null,
    }));
  };

  const toggleCalendar = (target: 'start' | 'end') => {
    setCalendarState((prev) => ({
      ...prev,
      activeCalendar: prev.activeCalendar === target ? null : target,
    }));
  };

  const handleConfirmClick = () => {
    if (isComplexAdd) {
      onConfirm({
        startYear: startDate?.getFullYear(),
        startMonth: startDate ? startDate.getMonth() + 1 : null,
        endYear: endDate?.getFullYear(),
        endMonth: endDate ? endDate.getMonth() + 1 : null,
      });
    } else {
      onConfirm();
    }
  };

  const isDisabled =
    (dialogType?.includes('ADD') || dialogType?.includes('EDIT')) &&
    dialogType !== 'EDIT_VISIBLE' &&
    (isComplexAdd ? !inputValue.trim() || !startDate : !inputValue.trim());

  const renderContent = () => {
    if (CONFIRM_DIALOGS.has(dialogType)) {
      return (
        <VStack align="center" justify="center" className="py-6">
          <Text typography="subtitle-16-bold" className="text-[#1E2939]">
            {dialogType === 'SAVE_CONFIRM'
              ? '저장하시겠습니까?'
              : '정말 삭제하시겠습니까?'}
          </Text>
        </VStack>
      );
    }

    if (dialogType === 'EDIT_VISIBLE') {
      return (
        <HStack justify="between" align="center" className="w-full py-2">
          <Text typography="body-16-medium">전화 / 메세지 공개</Text>
          <div
            onClick={() => setToggleValue((prev) => !prev)}
            className={`relative h-6 w-10 cursor-pointer rounded-full transition-colors ${
              toggleValue ? 'bg-[#364153]' : 'bg-gray-200'
            }`}
          >
            <div
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                toggleValue ? 'left-5' : 'left-1'
              }`}
            />
          </div>
        </HStack>
      );
    }

    if (dialogType === 'EDIT_DESC') {
      return (
        <Box className="relative w-full rounded-xl bg-gray-50">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.slice(0, maxLength))}
            placeholder="내용을 입력해주세요."
            className="min-h-[120px] w-full resize-none border-none bg-transparent p-4 pb-8 text-sm focus:outline-none"
          />
          <Text className="font-regular absolute right-4 bottom-3 text-xs text-gray-300">
            {inputValue.length}/{maxLength}
          </Text>
        </Box>
      );
    }

    if (isComplexAdd) {
      return (
        <VStack gap="md" className="w-full">
          <Box className="w-full">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                dialogType === 'ADD_CAREER'
                  ? '회사명을 입력해주세요'
                  : '프로젝트명을 입력해주세요'
              }
              className="h-[52px] w-full rounded-xl border-none bg-gray-50 px-4 text-sm focus:outline-none"
            />
          </Box>
          <VStack gap="xs" className="relative w-full">
            <Text typography="subtitle-16-bold" className="text-[#1E2E3F]">
              기간
            </Text>
            <HStack gap="sm" align="center" className="relative w-full">
              <Box
                onClick={() => toggleCalendar('start')}
                className="flex h-[52px] flex-1 cursor-pointer items-center justify-between rounded-xl bg-gray-50 px-4"
              >
                <Text
                  typography="body-14-medium"
                  className={startDate ? 'text-[#1E2E3F]' : 'text-[#9CA3AF]'}
                >
                  {formatDate(startDate)}
                </Text>
                <CalendarIcon />
              </Box>

              <Text className="text-[#9CA3AF]">-</Text>

              <Box
                onClick={() => toggleCalendar('end')}
                className="flex h-[52px] flex-1 cursor-pointer items-center justify-between rounded-xl bg-gray-50 px-4"
              >
                <Text
                  typography="body-14-medium"
                  className={endDate ? 'text-[#1E2E3F]' : 'text-[#9CA3AF]'}
                >
                  {formatDate(endDate)}
                </Text>
                <CalendarIcon />
              </Box>

              {activeCalendar && (
                <Box
                  className={`absolute bottom-full z-[9999] mb-2 scale-[0.85] transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] ${
                    activeCalendar === 'start'
                      ? 'left-0 origin-bottom-left'
                      : 'right-0 origin-bottom-right'
                  }`}
                >
                  <Calendar size="sm" onDateClick={handleDateClick} />
                </Box>
              )}
            </HStack>
          </VStack>
        </VStack>
      );
    }

    return (
      <Box className="relative w-full">
        <input
          type="text"
          value={inputValue}
          onChange={(e) =>
            setInputValue(
              dialogType === 'EDIT_JOB'
                ? e.target.value.slice(0, maxLength)
                : e.target.value,
            )
          }
          placeholder={
            dialogType === 'ADD_LINK'
              ? '사이트 URL을 입력해주세요.'
              : '내용을 입력해주세요.'
          }
          className="h-[52px] w-full rounded-xl border-none bg-gray-50 px-4 pr-12 text-sm focus:outline-none"
        />
        {dialogType === 'EDIT_JOB' && (
          <Text className="font-regular absolute top-1/2 right-4 -translate-y-1/2 text-xs text-gray-300">
            {inputValue.length}/{maxLength}
          </Text>
        )}
      </Box>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Content maxWidth={340}>
        <VStack gap="lg" className="py-2">
          <Dialog.Title>
            {CONFIRM_DIALOGS.has(dialogType) ? (
              <span style={visuallyHiddenStyle}>
                {dialogType === 'SAVE_CONFIRM' ? '저장 확인' : '삭제 확인'}
              </span>
            ) : (
              <Text typography="subtitle-18-bold" className="text-[#1E2E3F]">
                {DIALOG_TITLES[dialogType as NonNullable<DialogType>] ?? '알림'}
              </Text>
            )}
          </Dialog.Title>

          <VStack gap="md">{renderContent()}</VStack>

          <Dialog.Footer>
            <HStack gap="sm" className="w-full">
              <CTAButton color="light" className="w-1/2" onClick={onClose}>
                닫기
              </CTAButton>
              <CTAButton
                color={dialogType === 'DELETE_CONFIRM' ? 'red' : 'dark'}
                className="w-1/2"
                onClick={handleConfirmClick}
                disabled={isDisabled}
              >
                {getConfirmButtonText(dialogType)}
              </CTAButton>
            </HStack>
          </Dialog.Footer>
        </VStack>
      </Dialog.Content>
    </Dialog>
  );
};
