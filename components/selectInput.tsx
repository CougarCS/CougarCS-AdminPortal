import React from "react";

type selectProps = {
  name: string;
  options: any[];
  value: string;
  height: string;
  width: string;
  textSize: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  ariaLabel: string;
};

export const SelectInput = ({
  name,
  onChange,
  options,
  height,
  width,
  textSize,
  value,
  ariaLabel,
}: selectProps) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`${width} ${textSize} ${height} rounded-md border-[1px] border-transparent bg-selectInputBG pl-3 outline-0 transition-all hover:border-gray-500 focus:border-gray-200`}
      required
      aria-label={ariaLabel}
    >
      {options.map((option, i: number) => {
        return (
          <option key={i} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};
