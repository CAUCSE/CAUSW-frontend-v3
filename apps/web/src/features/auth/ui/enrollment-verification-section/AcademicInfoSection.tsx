import { RHFInput, RHFTabSelect } from '@/shared/ui';

export const AcademicInfoSection = () => {
  return (
    <>
      <RHFTabSelect
        name="major"
        label="학과(부)"
        options={[
          { label: '전산학과', value: '전산학과' },
          { label: '컴퓨터공학과', value: '컴퓨터공학과' },
          { label: '컴퓨터공학부', value: '컴퓨터공학부' },
          { label: '소프트웨어학부', value: '소프트웨어학부' },
          { label: 'AI학과', value: 'AI학과' },
        ]}
        required
      />

      <RHFInput
        label="입학년도"
        name="enrollmentYear"
        placeholder="입학년도를 입력해주세요."
      />
      <RHFInput
        label="학번"
        name="studentId"
        placeholder="학번을 입력해주세요."
      />

      <RHFTabSelect
        name="enrollmentState"
        label="재학 분류"
        options={[
          { label: '재적 (휴학 포함)', value: '재적 (휴학 포함)' },
          { label: '졸업', value: '졸업' },
        ]}
        required
      />
    </>
  );
};
