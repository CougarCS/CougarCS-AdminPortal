import { useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";

import { TextInputProps } from "../types/types";

export const PasswordInput = ({ name, label, placeholder, required, className }: TextInputProps) =>
{
  const [pwVisible, setPwVisible] = useState(false);

  return (
    <div className={className}>
      <label>
        <span className={required ? "text-sm after:content-['*'] after:text-red-500 after:align-sub after:ml-1" : ""}>{label}</span>
        <div className="flex flex-row">
          <input type={!pwVisible ? "password" : "input"} name={name} placeholder={placeholder} className="placeholder:text-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-full h-9 rounded-sm rounded-r-none text-sm px-4 bg-zinc-800 border border-zinc-700 border-r-0" required={required} />
          <button type="button" className="p-2 bg-zinc-800 border border-zinc-700 border-l-0 rounded-r-sm" onClick={() => setPwVisible(!pwVisible)}>{!pwVisible ? <TbEye /> : <TbEyeOff />}</button>
        </div>
      </label>
    </div>
  );
};