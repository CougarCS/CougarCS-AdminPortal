import { childrenProps } from "../interfaces/children";
import { AppShell } from "@mantine/core";
import Nav from "./Nav";

const Shell = ({ children }: childrenProps) => {
  return (
    <>
      <AppShell padding="md" navbar={<Nav />}>
        {children}
      </AppShell>
    </>
  );
};

export default Shell;
