import { titleProps } from "../types/types";

export const Title = ({ title, subtitle, children }: titleProps) => {
  return (
    <div className="border-b border-neutral-700 pb-4">
      <h1 className="text-5xl font-semibold text-red-600">{title}</h1>
      <h2 className="mt-1 text-xl text-white">{subtitle}</h2>
      {children}
    </div>
  );
};
