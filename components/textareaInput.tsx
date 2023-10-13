type TextAreaInputProps = {
  name: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<any>) => void;
};

export const TextAreaInput = ({
  name,
  placeholder,
  required,
  value,
  onChange,
}: TextAreaInputProps) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="h-24 w-full rounded-sm border border-zinc-700 bg-zinc-800 p-4 text-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
      placeholder={placeholder}
      required={required}
    />
  );
};
