import Head from "next/head";
import { shellProps } from "../types/types";
import Shell from "./shell";

const Layout = ({ children, title, shell }: shellProps) => {
  return (
    <>
      <Head>
        {title ? (
          <title>{title}</title>
        ) : (
          <title>CougarCS - Admin Portal</title>
        )}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {shell ? <Shell>{children}</Shell> : <>{children}</>}
      {/* <Shell>{children}</Shell> */}
    </>
  );
};

export default Layout;
