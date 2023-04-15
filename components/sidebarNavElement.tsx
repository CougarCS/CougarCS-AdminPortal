import React, { ReactNode } from "react";

type NavElementProps = {
  children: ReactNode;
  onClick: () => void;
  active: boolean;
};

export const NavElement = ({ children, onClick, active }: NavElementProps) =>
{
  return (
    <button
      className={`h-12 w-full text-lg ${active ? 'text-white border-l-4 border-l-white' : 'text-gray-400'}`}
      onClick={() => onClick()}
    >
      <div className="mx-auto h-9 w-4/5 rounded-md flex items-center justify-center gap-3 hover:bg-neutral-700 hover:text-white">
        {children}
      </div>
    </button>
  );
};