'use client';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { putMyAlumniContacts } from '@/features/alumni-contacts';

import {
  type AlumniContactsEditForm,
  alumniContactsEditSchema,
  alumniContactsQueryKeys,
  alumniContactsQueryOptions,
} from '@/entities/alumni-contacts';

import { toast } from '@/shared/model';

export const useAlumniContactsEditForm = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: myAlumniContacts } = useSuspenseQuery({
    ...alumniContactsQueryOptions.my(),
  });

  const { mutate: updateMyAlumniContacts, isPending } = useMutation({
    mutationFn: putMyAlumniContacts,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: alumniContactsQueryKeys.my(),
      });
      router.back();
    },
    onError: () => {
      toast.error('수정에 실패했어요.');
    },
  });

  const methods = useForm<AlumniContactsEditForm>({
    resolver: zodResolver(alumniContactsEditSchema),
    defaultValues: {
      ...myAlumniContacts,
    },
  });

  const handleSubmit = methods.handleSubmit((data) => {
    if (isPending) {
      return;
    }
    updateMyAlumniContacts(data);
  });

  return {
    methods,
    myAlumniContacts,
    handleSubmit,
  };
};
