import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Field, Tab, TextInput } from '@causw/cds';

import type { CeremonyFormData } from '@/entities/ceremony';

import { FormSection } from '@/shared/ui/FormSection';

import {
  RELATIONSHIP_OPTIONS,
  FAMILY_RELATIONS,
  ALUMNI_RELATIONS,
} from '../config';

interface RelationshipSectionProps {
  onRelationshipChange: (value: CeremonyFormData['relationship']) => void;
}

export const RelationshipSection = ({
  onRelationshipChange,
}: RelationshipSectionProps) => {
  const { control, register } = useFormContext<CeremonyFormData>();
  const relationship = useWatch({ control, name: 'relationship' });

  return (
    <>
      <FormSection title="관계">
        <Controller
          control={control}
          name="relationship"
          render={({ field }) => (
            <Tab
              variant="chip"
              value={field.value}
              onValueChange={(v) =>
                onRelationshipChange(v as CeremonyFormData['relationship'])
              }
            >
              <Tab.List>
                {RELATIONSHIP_OPTIONS.map((opt) => (
                  <Tab.TabItem key={opt} value={opt}>
                    {opt}
                  </Tab.TabItem>
                ))}
              </Tab.List>
            </Tab>
          )}
        />
      </FormSection>

      {relationship === '가족' && (
        <FormSection title="상세 관계">
          <Controller
            control={control}
            name="familyRelation"
            render={({ field }) => (
              <Tab
                variant="chip"
                value={field.value}
                onValueChange={field.onChange}
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
            )}
          />
        </FormSection>
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

          <FormSection title="대상과의 관계">
            <Controller
              control={control}
              name="alumniRelation"
              render={({ field }) => (
                <Tab
                  variant="chip"
                  value={field.value}
                  onValueChange={field.onChange}
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
              )}
            />
          </FormSection>
        </>
      )}
    </>
  );
};
