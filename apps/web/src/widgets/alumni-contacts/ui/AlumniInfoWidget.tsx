'use client';

import React, { forwardRef, useRef, useState } from 'react';

import { Box, HStack, Tab, Text, VStack } from '@causw/cds';

import { AlumniDetailResponseDto } from '@/entities/alumni-contacts/types';
import { ContactIcon } from '@/entities/alumni-contacts/ui';

export type DialogPayload =
  | { type: string; value?: string; id?: string }
  | string
  | boolean
  | null;

interface AlumniInfoWidgetProps {
  data: AlumniDetailResponseDto;
  isEditing?: boolean;
  onOpenDialog?: (type: string, payload?: DialogPayload) => void;
}

const Chip = ({
  text,
  isEditing,
  onDelete,
}: {
  text: string;
  isEditing?: boolean;
  onDelete?: () => void;
}) => (
  <Box
    onClick={isEditing ? onDelete : undefined}
    className={`flex items-center gap-1.5 rounded-md bg-[#F3F4F6] px-3 py-2 ${isEditing ? 'cursor-pointer transition-colors hover:bg-gray-200' : ''}`}
  >
    <Text typography="body-14-medium" className="text-[#4B5563]">
      {text}
    </Text>
    {isEditing && (
      <button className="text-[#9CA3AF]">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 3L3 9M3 3L9 9" />
        </svg>
      </button>
    )}
  </Box>
);

const AddButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="mt-3 flex h-[52px] w-full items-center justify-center gap-1.5 rounded-md bg-[#F5F6F8] transition-colors hover:bg-[#E5E7EB]"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="#6B7280"
      strokeWidth="1.5"
    >
      <path d="M8 3.333V12.667M3.333 8H12.667" />
    </svg>
    <Text typography="body-15-semibold" className="text-[#6B7280]">
      {label}
    </Text>
  </button>
);

const EmptyMessage = () => (
  <Text typography="body-14-regular" className="mb-1 text-[#9CA3AF]">
    등록된 정보가 없습니다.
  </Text>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ title, children, isLast }, ref) => (
    <VStack align="start" ref={ref} gap="none" className="w-full">
      <Text typography="subtitle-18-bold" className="mb-3 text-[#1E2E3F]">
        {title}
      </Text>
      <div className="w-full p-0">{children}</div>
      {!isLast && (
        <div className="mt-6 mb-8 h-px w-full max-w-[788px] bg-[#F3F4F6]" />
      )}
    </VStack>
  ),
);
Section.displayName = 'Section';

interface ChipGroupProps {
  items?: string[];
  typeKey: string;
  addKey: string;
  addLabel: string;
  isEditing?: boolean;
  onOpenDialog?: (type: string, payload?: DialogPayload) => void;
}

const ChipGroup = ({
  items,
  typeKey,
  addKey,
  addLabel,
  isEditing,
  onOpenDialog,
}: ChipGroupProps) => (
  <VStack gap="none" className="w-full">
    {!items || items.length === 0 ? (
      <EmptyMessage />
    ) : (
      <HStack gap="xs" className="flex-wrap">
        {items.map((item: string) => (
          <Chip
            key={item}
            text={item}
            isEditing={isEditing}
            onDelete={() =>
              onOpenDialog?.('DELETE_CONFIRM', { type: typeKey, value: item })
            }
          />
        ))}
      </HStack>
    )}
    {isEditing && (
      <AddButton label={addLabel} onClick={() => onOpenDialog?.(addKey)} />
    )}
  </VStack>
);

interface HistoryItem {
  id: string;
  description: string;
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
}

interface HistoryGroupProps {
  items?: HistoryItem[];
  typeKey: string;
  addKey: string;
  addLabel: string;
  isEditing?: boolean;
  onOpenDialog?: (type: string, payload?: DialogPayload) => void;
}

const HistoryGroup = ({
  items,
  typeKey,
  addKey,
  addLabel,
  isEditing,
  onOpenDialog,
}: HistoryGroupProps) => (
  <VStack gap="none" className="w-full">
    {!items || items.length === 0 ? (
      <EmptyMessage />
    ) : (
      <VStack gap="md" className="w-full">
        {items.map((item: HistoryItem) => (
          <HStack
            key={item.id}
            align="center"
            justify="between"
            className={`w-full ${isEditing ? '-mx-2 cursor-pointer rounded-lg p-2 hover:bg-gray-50' : ''}`}
          >
            <HStack align="center" gap="md">
              <ContactIcon
                variant="list"
                type={typeKey === 'CAREER' ? 'career' : 'project'}
              />
              <VStack align="start" gap="none">
                <Text className="text-base text-[#364153]">
                  {item.description}
                </Text>
                <Text className="text-sm text-[#99A1AF]">
                  {item.startYear}.{item.startMonth} -{' '}
                  {item.endYear ? `${item.endYear}.${item.endMonth}` : '재직중'}
                </Text>
              </VStack>
            </HStack>
            {isEditing && (
              <button
                onClick={() =>
                  onOpenDialog?.('DELETE_CONFIRM', {
                    type: typeKey,
                    id: item.id,
                  })
                }
              >
                <svg width="18" height="18" fill="none">
                  <circle cx="9" cy="9" r="9" fill="#EF4444" />
                  <path d="M5 9H13" stroke="white" strokeWidth="1.5" />
                </svg>
              </button>
            )}
          </HStack>
        ))}
      </VStack>
    )}
    {isEditing && (
      <AddButton label={addLabel} onClick={() => onOpenDialog?.(addKey)} />
    )}
  </VStack>
);

export const AlumniInfoWidget = ({
  data,
  isEditing,
  onOpenDialog,
}: AlumniInfoWidgetProps) => {
  const [activeTab, setActiveTab] = useState('SNS');

  const snsRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const intTechRef = useRef<HTMLDivElement>(null);
  const intDomainRef = useRef<HTMLDivElement>(null);

  const tabMap = [
    { key: 'SNS', label: 'SNS', ref: snsRef },
    { key: 'TECH', label: '기술 스택', ref: techRef },
    { key: 'CAREER', label: '경력 사항', ref: careerRef },
    { key: 'PROJECT', label: '대표 프로젝트', ref: projectRef },
    { key: 'INT_TECH', label: '관심 기술', ref: intTechRef },
    { key: 'INT_DOMAIN', label: '관심 도메인', ref: intDomainRef },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const targetTab = tabMap.find((tab) => tab.key === value);
    targetTab?.ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <Box className="relative rounded-b-2xl bg-white px-6 pt-0 pb-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <Box className="sticky top-0 z-10 mb-7 bg-white pt-2">
        <Tab.Root
          variant="underline"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <Tab.List className="gap-5 border-none" style={{ padding: 0 }}>
            {tabMap.map((tab) => (
              <Tab.TabItem key={tab.key} value={tab.key} className="py-3">
                {tab.label}
              </Tab.TabItem>
            ))}
          </Tab.List>
        </Tab.Root>
      </Box>

      <VStack gap="none">
        <Section title="SNS" ref={snsRef}>
          <HStack gap="xl" className="flex-wrap">
            {isEditing && (
              <ContactIcon
                variant="sns-add"
                onClick={() => onOpenDialog?.('ADD_LINK')}
              />
            )}
            {data.socialLinks?.map((url, i) => (
              <ContactIcon
                key={i}
                variant="sns"
                url={url}
                isEditing={isEditing}
                onClick={() => window.open(url)}
                onDelete={() =>
                  onOpenDialog?.('DELETE_CONFIRM', { type: 'SNS', value: url })
                }
              />
            ))}
            {(!data.socialLinks || data.socialLinks.length === 0) &&
              !isEditing && <EmptyMessage />}
          </HStack>
          {isEditing &&
            (!data.socialLinks || data.socialLinks.length === 0) && (
              <EmptyMessage />
            )}
        </Section>

        <Section title="기술 스택" ref={techRef}>
          <ChipGroup
            items={data.techStack}
            typeKey="TECH"
            addKey="ADD_TECH"
            addLabel="기술스택 추가"
            isEditing={isEditing}
            onOpenDialog={onOpenDialog}
          />
        </Section>

        <Section title="경력 사항" ref={careerRef}>
          <HistoryGroup
            items={data.userCareer}
            typeKey="CAREER"
            addKey="ADD_CAREER"
            addLabel="경력사항 추가"
            isEditing={isEditing}
            onOpenDialog={onOpenDialog}
          />
        </Section>

        <Section title="대표 프로젝트" ref={projectRef}>
          <HistoryGroup
            items={data.userProject}
            typeKey="PROJECT"
            addKey="ADD_PROJECT"
            addLabel="대표 프로젝트 추가"
            isEditing={isEditing}
            onOpenDialog={onOpenDialog}
          />
        </Section>

        <Section title="관심 기술" ref={intTechRef}>
          <ChipGroup
            items={data.userInterestTech}
            typeKey="INT_TECH"
            addKey="ADD_INT_TECH"
            addLabel="관심 기술 추가"
            isEditing={isEditing}
            onOpenDialog={onOpenDialog}
          />
        </Section>

        <Section title="관심 도메인" ref={intDomainRef} isLast>
          <ChipGroup
            items={data.userInterestDomain}
            typeKey="INT_DOMAIN"
            addKey="ADD_INT_DOMAIN"
            addLabel="관심 도메인 추가"
            isEditing={isEditing}
            onOpenDialog={onOpenDialog}
          />
        </Section>
      </VStack>
    </Box>
  );
};
