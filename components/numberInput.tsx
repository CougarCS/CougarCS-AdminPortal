type numberInputProps = {
  name: string;
  value?: number | string;
  units?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<any>) => void;
};

export const NumberInput = ({
  name,
  value,
  units,
  placeholder,
  required,
  onChange,
}: numberInputProps) => {
  return (
    <>
      <input
        type="number"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${
          units && "rounded-r-none border-r-0"
        } h-9 w-full rounded-sm border border-zinc-700 bg-zinc-800 px-4 text-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
        required={required}
        min="0"
      />
      {units && (
        <span className="flex items-center rounded-r-sm border border-l-0 border-zinc-700 bg-zinc-800 px-2 py-1 text-sm font-medium">
          {units}
        </span>
      )}
    </>
  );
};
