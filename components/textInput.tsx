import { textInputProps } from "../types/types";

export const TextInput = ({
  name,
  label,
  placeholder,
  required,
  className,
}: textInputProps) => {
  return (
    <div className={className}>
      <label>
        <span
          className={`${
            required &&
            "after:ml-1 after:align-sub after:text-red-500 after:content-['*']"
          } text-sm`}
        >
          {label}
        </span>
        <input
          type="text"
          name={name}
          placeholder={placeholder ? placeholder : ""}
          className="h-9 w-full rounded-sm border border-zinc-700 bg-zinc-800 px-4 text-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          required={required}
        />
      </label>
    </div>
  );
};
