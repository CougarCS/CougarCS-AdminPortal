import { titleProps } from "../types/types";


export const Title = ({ title, subtitle, children }: titleProps) => {
    return (
        <div className="border-b-2 border-gray-800 ">
            <h1 className="text-5xl font-semibold text-red-600">{title}</h1>
            <h2 className="text-x1 font-normal text-white pt-1 pb-2">{subtitle}</h2>
            {children}
        </div>

    );

};


