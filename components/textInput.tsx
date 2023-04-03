import { TextInputProps } from "../types/types";

export const TextInput = ({ name, label, placeholder, required, className }: TextInputProps) =>
{
  return (
    <div className={className}>
      <label>
        <span className={required ? "text-sm after:content-['*'] after:text-red-500 after:align-sub after:ml-1" : ""}>{label}</span>
        <input type="text" name={name} placeholder={placeholder ? placeholder : ""} className="placeholder:text-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-full h-9 rounded-sm text-sm px-4 bg-zinc-800 border border-zinc-700" required={required} />
      </label>
    </div>
  );
};