import { titleProps } from "../types/types";

export const Title = ({ title, subtitle, children }: titleProps) => {
    return (
        <div className="border-b-2 border-neutral-800 pb-4">
            <h1 className="text-5xl font-semibold text-red-600">{title}</h1>
            <h2 className="text-xl font-normal text-white mt-1">{subtitle}</h2>
            {children}
        </div>
    );
};