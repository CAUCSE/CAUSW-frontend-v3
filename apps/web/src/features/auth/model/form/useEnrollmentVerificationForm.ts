'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useSubmitAdmissionMutation } from '@/features/auth';

import {
  ENROLLMENT_VERIFICATION_ACADEMIC_STATUS,
  enrollmentVerificationSchema,
  type AdmissionAcademicStatus,
  type AdmissionDepartment,
  type EnrollmentVerificationFormData,
} from '@/entities/auth';

interface UseEnrollmentVerificationFormOptions {
  onSuccess: () => void;
  userName: string;
}

export const useEnrollmentVerificationForm = ({
  onSuccess,
  userName,
}: UseEnrollmentVerificationFormOptions) => {
  const submitAdmissionMutation = useSubmitAdmissionMutation({ onSuccess });
  const methods = useForm<EnrollmentVerificationFormData>({
    mode: 'onChange',
    resolver: zodResolver(enrollmentVerificationSchema),
    defaultValues: {
      major: '',
      enrollmentYear: '',
      graduationYear: '',
      studentId: '',
      enrollmentState: '',
      content: '',
      images: [],
    },
  });

  const handleSubmit = (data: EnrollmentVerificationFormData) => {
    const isGraduated =
      data.enrollmentState ===
      ENROLLMENT_VERIFICATION_ACADEMIC_STATUS.GRADUATED.value;
    const requestedStudentId = isGraduated ? null : (data.studentId ?? '');

    submitAdmissionMutation.mutate({
      request: {
        name: userName,
        requestedDepartment: data.major as AdmissionDepartment,
        requestedAdmissionYear: Number(data.enrollmentYear),
        requestedStudentId,
        requestedAcademicStatus:
          data.enrollmentState as AdmissionAcademicStatus,
        graduationYear: data.graduationYear
          ? Number(data.graduationYear)
          : undefined,
        description: data.content || undefined,
      },
      attachImages: data.images ?? [],
    });
  };

  return {
    methods,
    handleSubmit,
    isSubmitting: submitAdmissionMutation.isPending,
  };
};
