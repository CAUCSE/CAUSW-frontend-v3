'use client';

import { type RefObject, type ChangeEventHandler } from 'react';

import { Text, TextArea } from '@causw/cds';

interface AlumniContactsDescriptionTextAreaProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  maxLength: number;
  ref: RefObject<HTMLTextAreaElement | null>;
}

export const AlumniContactsDescriptionTextArea = ({
  value,
  onChange,
  maxLength,
  ref,
}: AlumniContactsDescriptionTextAreaProps) => {
  return (
    <TextArea className="bg-gray-100">
      <TextArea.Input
        value={value}
        placeholder="소개글을 입력해주세요."
        resize={false}
        maxLength={maxLength}
        onChange={onChange}
        className="max-h-45"
        ref={ref}
      />
      <TextArea.Footer className="text-right">
        <Text typography="body-16-regular" textColor="gray-400">
          {value.length}/{maxLength}
        </Text>
      </TextArea.Footer>
    </TextArea>
  );
};
