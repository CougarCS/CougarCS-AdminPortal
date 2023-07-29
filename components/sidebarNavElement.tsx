import React, { ReactNode } from "react";

type NavElementProps = {
  children: ReactNode;
  onClick: () => void;
  active: boolean;
};

export const NavElement = ({ children, onClick, active }: NavElementProps) => {
  return (
    <button
      className={`mb-4 h-12 w-full text-lg ${
        active
          ? "border-l-4 border-l-white text-white"
          : "border-l-4 border-l-transparent text-gray-400"
      }`}
      onClick={() => onClick()}
    >
      <div className="mx-auto flex h-9 w-4/5 items-center justify-start gap-3 rounded-md pl-4 hover:bg-neutral-700 hover:text-white">
        {children}
      </div>
    </button>
  );
};
