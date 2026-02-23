interface FormSectionProps {
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}

export const FormSection = ({
  title,
  optional,
  children,
}: FormSectionProps) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-1 px-1">
      <span className="typo-subtitle-16-bold text-gray-700">{title}</span>
      {optional && (
        <span className="typo-subtitle-16-bold text-gray-400">(선택)</span>
      )}
    </div>
    {children}
  </div>
);
