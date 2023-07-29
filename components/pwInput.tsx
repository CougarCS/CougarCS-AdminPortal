import { useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";

import { textInputProps } from "../types/types";

export const PasswordInput = ({
  name,
  label,
  placeholder,
  required,
  className,
}: textInputProps) => {
  const [pwVisible, setPwVisible] = useState(false);

  return (
    <div className={className}>
      <label>
        <span
          className={
            required
              ? "text-sm after:ml-1 after:align-sub after:text-red-500 after:content-['*']"
              : ""
          }
        >
          {label}
        </span>
        <div className="flex flex-row">
          <input
            type={!pwVisible ? "password" : "input"}
            name={name}
            placeholder={placeholder}
            className="h-9 w-full rounded-sm rounded-r-none border border-r-0 border-zinc-700 bg-zinc-800 px-4 text-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            required={required}
          />
          <button
            type="button"
            className="rounded-r-sm border border-l-0 border-zinc-700 bg-zinc-800 p-2"
            onClick={() => setPwVisible(!pwVisible)}
          >
            {!pwVisible ? <TbEye /> : <TbEyeOff />}
          </button>
        </div>
      </label>
    </div>
  );
};
