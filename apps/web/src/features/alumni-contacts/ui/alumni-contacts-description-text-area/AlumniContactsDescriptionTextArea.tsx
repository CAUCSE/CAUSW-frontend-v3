'use client';

import { Pen, TextArea } from '@causw/cds';

import { ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH } from '@/entities/alumni-contacts';

import { useAlumniContactsDescriptionTextArea } from '../../model';

export const AlumniContactsDescriptionTextArea = () => {
  const { field, handleTextAreaChange, textareaRef } =
    useAlumniContactsDescriptionTextArea();
  return (
    <TextArea className="flex items-center gap-2 bg-[#FFFFFF1A] px-3 py-2.5 focus-within:ring-gray-500">
      <TextArea.Input
        placeholder="소개글을 입력해주세요."
        resize={false}
        maxLength={ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH.DESCRIPTION}
        className="min-h-0 grow text-white caret-white"
        value={field.value ?? ''}
        onChange={handleTextAreaChange}
        onBlur={field.onBlur}
        ref={textareaRef}
      />
      <div className="shrink-0 self-end">
        <Pen size={12} color="gray-200" />
      </div>
    </TextArea>
  );
};
