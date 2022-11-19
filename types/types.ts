type loginData = {
  username: string | undefined;
  password: string | undefined;
};

export type { loginData };

type MemberData = {
  contact_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  shirt_size_id: string;
  uh_id: number;
};

export type { MemberData };