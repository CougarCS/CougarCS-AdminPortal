import Head from "next/head";
import Sidebar from "./sidebar";
import { Toaster } from "sonner";

import { layoutProps } from "../types/types";

const Layout = ({ children, title, sidebarHidden }: layoutProps) => {
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

      <div className="flex min-h-screen w-full text-white">
        {sidebarHidden ? null : (
          <div className="w-60 min-w-[15rem]">
            <Sidebar />
          </div>
        )}

        <div id="layout-content" className="flex-1 bg-mainBG px-16 py-8">
          {children}
          <Toaster position="top-right" richColors closeButton />
        </div>
      </div>
    </>
  );
};

export default Layout;
