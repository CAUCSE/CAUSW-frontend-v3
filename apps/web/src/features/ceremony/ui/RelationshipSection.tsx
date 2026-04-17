import { useFormContext, useWatch } from 'react-hook-form';

import { Field, TextInput } from '@causw/cds';

import type { CeremonyFormData } from '@/entities/ceremony';

import { RHFTabSelect } from '@/shared/ui';
import { FormSection } from '@/shared/ui/form-section';

import {
  RELATIONSHIP_OPTIONS,
  FAMILY_RELATIONS,
  ALUMNI_RELATIONS,
  CUSTOM_VALUE,
} from '../config';

interface RelationshipSectionProps {
  onRelationshipChange: (value: CeremonyFormData['relationship']) => void;
}

export const RelationshipSection = ({
  onRelationshipChange,
}: RelationshipSectionProps) => {
  const { control, register } = useFormContext<CeremonyFormData>();
  const relationship = useWatch({ control, name: 'relationship' });
  const familyRelation = useWatch({ control, name: 'familyRelation' });

  const options = RELATIONSHIP_OPTIONS.map((value) => ({
    label: value,
    value,
  }));
  const familyRelationOptions = [
    ...FAMILY_RELATIONS.map((value) => ({ label: value, value })),
    { label: '직접 입력', value: CUSTOM_VALUE },
  ];
  const alumniRelationOptions = ALUMNI_RELATIONS.map((value) => ({
    label: value,
    value,
  }));

  return (
    <>
      <RHFTabSelect
        label="관계"
        name="relationship"
        options={options}
        onValueChange={(nextValue) => {
          onRelationshipChange(nextValue as CeremonyFormData['relationship']);
        }}
      />

      {relationship === '가족' && (
        <>
          <div className="md:w-1/2">
            <RHFTabSelect
              label="상세 관계"
              name="familyRelation"
              options={familyRelationOptions}
            />
          </div>
          {familyRelation === CUSTOM_VALUE && (
            <Field>
              <TextInput
                {...register('customFamilyRelation')}
                placeholder="상세 관계를 입력해주세요."
                className="rounded-xl bg-white"
              />
            </Field>
          )}
        </>
      )}

      {relationship === '동문소식 대신 전달' && (
        <>
          <FormSection title="대상 성함">
            <Field>
              <TextInput
                {...register('alumniName')}
                placeholder="대상 성함을 입력해주세요."
                className="rounded-xl bg-white"
              />
            </Field>
          </FormSection>

          <FormSection title="동문 학번 (입학년도)">
            <Field>
              <TextInput
                {...register('alumniAdmissionYear')}
                placeholder="동문 학번을 입력해주세요."
                className="rounded-xl bg-white"
              />
            </Field>
          </FormSection>
          <div className="md:w-1/2">
            <RHFTabSelect
              label="대상과의 관계"
              name="alumniRelation"
              options={alumniRelationOptions}
            />
          </div>
        </>
      )}
    </>
  );
};
