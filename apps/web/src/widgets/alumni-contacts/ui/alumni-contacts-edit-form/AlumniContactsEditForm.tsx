'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';

import { MyAlumniContactsSaveButton } from '@/features/alumni-contacts';

import {
  alumniContactsEditSchema,
  alumniContactsQueryOptions,
  type AlumniContactsEditForm as AlumniContactsEditFormType,
} from '@/entities/alumni-contacts';

import { AlumniContactsEditFormDetailSection } from '../alumni-contacts-edit-form-detail-section';
import { AlumniContactsEditFormHero } from '../alumni-contacts-edit-form-hero';
import { AlumniContactsHeader } from '../alumni-contacts-header';

export const AlumniContactsEditForm = () => {
  const { data: myAlumniContacts } = useSuspenseQuery({
    ...alumniContactsQueryOptions.my(),
  });
  const methods = useForm<AlumniContactsEditFormType>({
    resolver: zodResolver(alumniContactsEditSchema),
    defaultValues: {
      ...myAlumniContacts,
    },
  });

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('handleSubmit');
    console.log({ data });
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col bg-[#4C688F] pt-4 md:rounded-t-lg md:rounded-b-xl"
      >
        <AlumniContactsHeader action={<MyAlumniContactsSaveButton />} />
        <AlumniContactsEditFormHero myAlumniContacts={myAlumniContacts} />
        <AlumniContactsEditFormDetailSection />
      </form>
    </FormProvider>
  );
};
