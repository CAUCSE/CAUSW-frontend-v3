import { Field, Tab, TextInput } from '@causw/cds';

import { FormSection } from '@/shared/ui/FormSection';

import {
  RELATIONSHIP_OPTIONS,
  FAMILY_RELATIONS,
  ALUMNI_RELATIONS,
} from '../config';
import type { CeremonyFormReturn } from '../model';

type Props = Pick<
  CeremonyFormReturn,
  | 'relationship'
  | 'familyRelation'
  | 'alumniName'
  | 'alumniAdmissionYear'
  | 'alumniRelation'
  | 'setFamilyRelation'
  | 'setAlumniName'
  | 'setAlumniAdmissionYear'
  | 'setAlumniRelation'
  | 'handleRelationshipChange'
>;

export const RelationshipSection = ({
  relationship,
  familyRelation,
  alumniName,
  alumniAdmissionYear,
  alumniRelation,
  setFamilyRelation,
  setAlumniName,
  setAlumniAdmissionYear,
  setAlumniRelation,
  handleRelationshipChange,
}: Props) => (
  <>
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
              onChange={(e) => setAlumniAdmissionYear(e.target.value)}
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
  </>
);
