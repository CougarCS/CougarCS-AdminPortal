import { ReactNode } from "react";

type layoutProps = {
  children: ReactNode;
  title?: string;
  sidebarHidden?: boolean;
};

type memberType = {
  contact_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  shirt_size_id: string;
  timestamp: string;
  uh_id: number;
};

type textInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

type titleProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
};
/*
const demo = {
  "uh_id": 1234567,
  "first_name": "Skibbidybopta",
  "last_name": "Longahname",
  "email": "skibbyB123456@gmail.com",
  "shirt_size_id": "XXX",
  "timestamp": "01-01-1970",
  "phone_number": 1234567890,
  "contact_id": "numb"
};

type KeyValueType<T extends Record<string, any>> = {
  [K in keyof T]: K extends T[K] ? K : never;
};

type MyKeyValueType = KeyValueType<typeof demo>;

type keys = keyof MyKeyValueType[];
*/

// TODO: make the type for schema + data
// schema should be an object with string keys, where those keys
// map to a value on an element of data's type
// Schema should have SOME or ALL of data's values
// rowClick will be a function that passes one row of data into its first param
type dataTableProps = {
  schema: any;
  data: any[];
  rowClick?: (data: any) => void;
  className?: string;
};

type SSPConfig = {
  // if query is undef, don't search :)
  query?: string;

  // sort objects by object[property], using dir to determine whether
  // to use < or >
  sort: {
    property: keyof memberType;
    dir: "ascending" | "descending";
  };

  // split elements into arrays of length paginate
  // if paginate is 0, just put all the elements into 1 array
  // and return that array inside another array (so it fits the type def)
  paginate: number;
};

type eventDetails = {
  title: string,
  description: string,
  date: string,
  duration: number,
  point_value: number,
};

export type { memberType, layoutProps, textInputProps, dataTableProps, titleProps, SSPConfig, eventDetails };
