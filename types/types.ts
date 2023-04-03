import { ReactNode } from "react";

type shellProps = {
  children: ReactNode;
  title?: string;
  shell?: boolean;
};

type LayoutProps = {
  children: ReactNode;
  title?: string;
};

type childrenProps = {
  children: ReactNode;
};

type MemberType = {
  contact_id: string,
  email: string,
  first_name: string,
  last_name: string,
  phone_number: number,
  shirt_size_id: string,
  timestamp: string,
  uh_id: number,
};

export type { shellProps, childrenProps, MemberType, LayoutProps };
