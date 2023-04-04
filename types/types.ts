import { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
  title?: string;
  sidebarHidden?: boolean;
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

type dataTableProps = {
  columns?: any[] | undefined;
  rows?: any[] | undefined;
  className?: string;
};

export type { memberType, layoutProps, textInputProps, dataTableProps };
