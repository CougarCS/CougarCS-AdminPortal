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
      className={`flex items-center w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900 p-3 ${active ? 'bg-gray-100 text-gray-900' : ''}`}
      onClick={() => onClick()}
    >
      {children}
    </button >
  );
};