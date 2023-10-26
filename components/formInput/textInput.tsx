type textInputProps = {
  name: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<any>) => void;
};

export const TextInput = ({
  name,
  value,
  placeholder,
  required,
  onChange,
}: textInputProps) => {
  return (
    <input
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="h-9 w-full rounded-sm border border-zinc-700 bg-zinc-800 px-4 text-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
      required={required}
    />
  );
};
