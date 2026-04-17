'use client';

import { FormProvider } from 'react-hook-form';

import { MyAlumniContactsSaveButton } from '@/features/alumni-contacts';

import { useAlumniContactsEditForm } from '../../model';
import { AlumniContactsEditFormDetailSection } from '../alumni-contacts-edit-form-detail-section';
import { AlumniContactsEditFormHero } from '../alumni-contacts-edit-form-hero';
import { AlumniContactsHeader } from '../alumni-contacts-header';

export const AlumniContactsEditForm = () => {
  const { methods, myAlumniContacts, handleSubmit } =
    useAlumniContactsEditForm();
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
