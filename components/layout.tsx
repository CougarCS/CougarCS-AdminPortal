import Head from "next/head";
import Sidebar from "./sidebar";

import { LayoutProps } from "../types/types";

const Layout = ({ children, title, sidebarHidden }: LayoutProps) =>
{
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

      <div className="w-full min-h-screen flex">
        {sidebarHidden ? null : <Sidebar />}

        <div id="layout-content" className="bg-[#1C1C1C] flex-1 p-8">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
