import Head from "next/head";
import { childrenProps } from "../interfaces/children";
import Shell from "./shell";

const Layout = ({ children }: childrenProps) => {
  return (
    <>
      <Head>
        <title>CougarCS - Admin Portal</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Shell>{children}</Shell>
    </>
  );
};

export default Layout;
