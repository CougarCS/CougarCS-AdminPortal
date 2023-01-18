import { ReactNode } from "react";

type shellProps = {
  children: ReactNode;
  title?: string;
  shell?: boolean;
};

type childrenProps = {
  children: ReactNode;
};

export type { shellProps, childrenProps };
