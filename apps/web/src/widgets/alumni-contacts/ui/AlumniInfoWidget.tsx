'use client';

import { forwardRef, useRef, useState } from 'react';

import { Box, HStack, Tab, Text, VStack } from '@causw/cds';

import { AlumniDetailResponseDto } from '@/entities/alumni-contacts/types';
import { ContactIcon } from '@/entities/alumni-contacts/ui';

const Chip = ({ text }: { text: string }) => (
  <Box className="rounded-lg bg-[#F3F4F6] px-3 py-2">
    <Text typography="body-14-medium" className="text-[#4B5563]">
      {text}
    </Text>
  </Box>
);

const EmptyMessage = () => (
  <Text typography="body-14-regular" className="text-[#9CA3AF]">
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

export const AlumniInfoWidget = ({
  data,
}: {
  data: AlumniDetailResponseDto;
}) => {
  const [activeTab, setActiveTab] = useState('SNS');

  const snsRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const careerRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const interestTechRef = useRef<HTMLDivElement>(null);
  const interestDomainRef = useRef<HTMLDivElement>(null);

  const tabMap = [
    { key: 'SNS', label: 'SNS', ref: snsRef },
    { key: 'TECH', label: '기술 스택', ref: techStackRef },
    { key: 'CAREER', label: '경력 사항', ref: careerRef },
    { key: 'PROJECT', label: '대표 프로젝트', ref: projectRef },
    { key: 'INT_TECH', label: '관심 기술', ref: interestTechRef },
    { key: 'INT_DOMAIN', label: '관심 도메인', ref: interestDomainRef },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const target = tabMap.find((tab) => tab.key === value);
    if (target?.ref.current) {
      setTimeout(() => {
        target.ref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 0);
    }
  };

  return (
    <Box className="relative rounded-b-2xl bg-white px-6 pt-0 pb-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <Box className="sticky top-0 z-10 mb-7 bg-white pt-2">
        <Tab.Root
          variant="underline"
          value={activeTab}
          onValueChange={handleTabChange}
        >
          <Tab.List
            className="gap-5 border-none"
            style={{ padding: 0, marginLeft: 0 }}
          >
            {tabMap.map((tab) => (
              <Tab.TabItem key={tab.key} value={tab.key} className="py-3">
                {tab.label}
              </Tab.TabItem>
            ))}
          </Tab.List>
        </Tab.Root>
      </Box>

      <VStack gap="none">
        {/* 1. SNS */}
        <Section title="SNS" ref={snsRef}>
          {data.socialLinks?.length > 0 ? (
            <HStack gap="xl" className="flex-wrap">
              {data.socialLinks.map((url, index) => (
                <ContactIcon
                  key={index}
                  variant="sns"
                  url={url}
                  onClick={() => window.open(url)}
                />
              ))}
            </HStack>
          ) : (
            <EmptyMessage />
          )}
        </Section>

        {/* 2. 기술 스택 */}
        <Section title="기술 스택" ref={techStackRef}>
          {data.techStack?.length > 0 ? (
            <HStack gap="xs" className="flex-wrap">
              {data.techStack.map((tech) => (
                <Chip key={tech} text={tech} />
              ))}
            </HStack>
          ) : (
            <EmptyMessage />
          )}
        </Section>

        {/* 3. 경력 사항 */}
        <Section title="경력 사항" ref={careerRef}>
          {data.userCareer?.length > 0 ? (
            <VStack gap="md" className="w-full">
              {data.userCareer.map((career) => (
                <HStack key={career.id} align="center" gap="md">
                  <ContactIcon variant="list" type="career" />
                  <VStack align="start" gap="none" className="gap-1">
                    <Text className="text-base leading-[1.5] text-[#364153]">
                      {career.description}
                    </Text>
                    <Text className="text-sm leading-[1.6] text-[#99A1AF]">
                      {career.startYear}.{career.startMonth} -{' '}
                      {career.endYear
                        ? `${career.endYear}.${career.endMonth}`
                        : '재직중'}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          ) : (
            <EmptyMessage />
          )}
        </Section>

        {/* 4. 대표 프로젝트 */}
        <Section title="대표 프로젝트" ref={projectRef}>
          {data.userProject?.length > 0 ? (
            <VStack gap="md" className="w-full">
              {data.userProject.map((pj) => (
                <HStack key={pj.id} align="center" gap="md">
                  <ContactIcon variant="list" type="project" />
                  <VStack align="start" gap="none" className="gap-1">
                    <Text className="text-base leading-[1.5] text-[#364153]">
                      {pj.description}
                    </Text>
                    <Text className="text-sm leading-[1.6] text-[#99A1AF]">
                      {pj.startYear}.{pj.startMonth} -{' '}
                      {pj.endYear ? `${pj.endYear}.${pj.endMonth}` : '진행중'}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          ) : (
            <EmptyMessage />
          )}
        </Section>

        {/* 5. 관심 기술 */}
        <Section title="관심 기술" ref={interestTechRef}>
          {data.userInterestTech?.length > 0 ? (
            <HStack gap="xs" className="flex-wrap">
              {data.userInterestTech.map((tech) => (
                <Chip key={tech} text={tech} />
              ))}
            </HStack>
          ) : (
            <EmptyMessage />
          )}
        </Section>

        {/* 6. 관심 도메인 */}
        <Section title="관심 도메인" ref={interestDomainRef} isLast>
          {data.userInterestDomain?.length > 0 ? (
            <HStack gap="xs" className="flex-wrap">
              {data.userInterestDomain.map((domain) => (
                <Chip key={domain} text={domain} />
              ))}
            </HStack>
          ) : (
            <EmptyMessage />
          )}
        </Section>
      </VStack>
    </Box>
  );
};
