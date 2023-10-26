type selectProps = {
  name: string;
  options: any[];
  value?: string;
  height: string;
  width: string;
  marginTop?: string;
  textSize: string;
  onChange?: (event: React.ChangeEvent<any>) => void;
  ariaLabel?: string;
};

export const SelectInput = ({
  name,
  onChange,
  options,
  height,
  width,
  marginTop,
  textSize,
  value,
  ariaLabel,
}: selectProps) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`${width} ${textSize} ${height} ${marginTop} focus:ring-blue-5000 rounded-sm border border-zinc-700 bg-zinc-800 pl-3 pr-1 outline-0 focus:border-blue-500 focus:outline-none`}
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
