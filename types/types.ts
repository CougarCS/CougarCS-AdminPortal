import { ReactNode } from "react";

type shellProps = {
  children: ReactNode;
  title?: string;
  shell?: boolean;
};

type layoutProps = {
  children: ReactNode;
  title?: string;
  sidebarHidden?: boolean;
};

type childrenProps = {
  children: ReactNode;
};

type memberType = {
  contact_id: string,
  email: string,
  first_name: string,
  last_name: string,
  phone_number: number,
  shirt_size_id: string,
  timestamp: string,
  uh_id: number,
};

type textInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export type { shellProps, childrenProps, memberType, layoutProps, textInputProps };
