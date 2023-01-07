import { shellProps } from "../types/types";
import { AppShell } from "@mantine/core";
import Nav from "./nav";

const Shell = ({ children }: shellProps) => {
  return (
    <>
      <AppShell padding="md" navbar={<Nav />}>
        {children}
      </AppShell>
    </>
  );
};

export default Shell;
