import { HStack, Text, VStack, type TextProps } from '@causw/cds';

interface FormSectionProps {
  title: string;
  optional?: boolean;
  headerClassName?: string;
  titleClassName?: string;
  optionalTextProps?: Pick<TextProps<'span'>, 'typography' | 'textColor'>;
  children: React.ReactNode;
}

export const FormSection = ({
  title,
  optional,
  headerClassName = 'px-1',
  titleClassName,
  optionalTextProps,
  children,
}: FormSectionProps) => (
  <VStack gap="sm">
    <HStack gap="xs" align="center" className={headerClassName}>
      <Text
        typography="subtitle-16-bold"
        textColor="gray-700"
        className={titleClassName}
      >
        {title}
      </Text>
      {optional && (
        <Text
          typography="subtitle-16-bold"
          textColor="gray-400"
          {...optionalTextProps}
        >
          (선택)
        </Text>
      )}
    </HStack>
    {children}
  </VStack>
);
