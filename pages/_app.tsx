import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";

const MyApp = ({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme: "dark" }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </SessionContextProvider>
    </>
  );
};

export default MyApp;
