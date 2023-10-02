import React, { ReactNode } from "react";

type NavElementProps = {
  children: ReactNode;
  onClick: () => void;
  active: boolean;
};

export const NavElement = ({ children, onClick, active }: NavElementProps) => {
  return (
    <div
      className={`mb-4 flex h-12 w-full items-center text-lg ${
        active
          ? "border-l-4 border-l-white text-white"
          : "border-l-4 border-l-transparent text-gray-400"
      }`}
    >
      <button
        className="mx-auto flex h-10 w-4/5 items-center justify-start gap-4 rounded-md pl-4 font-medium hover:bg-hoverBG hover:text-white"
        onClick={() => onClick()}
      >
        {children}
      </button>
    </div>
  );
};
