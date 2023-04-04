import Head from "next/head";
import Sidebar from "./sidebar";
import { Toaster } from 'sonner';

import { layoutProps } from "../types/types";

const Layout = ({ children, title, sidebarHidden }: layoutProps) =>
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

      <div className="w-full min-h-screen flex text-white">
        {sidebarHidden ? null : <Sidebar />}

        <div id="layout-content" className="bg-mainBG flex-1 p-8">
          {children}
          <Toaster position="top-right" richColors closeButton />
        </div>
      </div>
    </>
  );
};

export default Layout;
