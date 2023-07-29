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
          <Sidebar
            onLogout={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        )}

        <div id="layout-content" className="flex-1 bg-mainBG p-8">
          {children}
          <Toaster position="top-right" richColors closeButton />
        </div>
      </div>
    </>
  );
};

export default Layout;
