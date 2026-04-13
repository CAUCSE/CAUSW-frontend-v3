'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { Avatar, VStack } from '@causw/cds';

import { AlumniContactsHeader } from '@/widgets/alumni-contacts';

import { MyAlumniContactsSaveButton } from '@/features/alumni-contacts';

export const ProfileEditPage = () => {
  const methods = useForm();

  const handleSubmit = methods.handleSubmit((data) => {
    console.log('handleSubmit');
    console.log({ data });
  });

  return (
    <div className="flex size-full justify-center">
      <FormProvider {...methods}>
        <VStack className="w-full max-w-225 gap-0 md:px-8 md:py-6">
          <form onSubmit={handleSubmit} className="size-full">
            <VStack
              gap="none"
              className="bg-[linear-gradient(180deg,#4C688F_0%,#1E2E3F_25.625rem,#fff_25.625rem,#fff_100%)] pt-4 md:rounded-t-lg"
            >
              <AlumniContactsHeader action={<MyAlumniContactsSaveButton />} />
              <Avatar />
            </VStack>
          </form>
        </VStack>
      </FormProvider>
    </div>
  );
};
