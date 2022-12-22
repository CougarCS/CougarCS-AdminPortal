import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout shell>
      <div className="pr-8">
        <main className="flex min-h-screen flex-col items-center justify-center pl-16">
          <h1 className="m-0 text-7xl">
            Welcome to{" "}
            <a
              className="font-bold text-blue-400 hover:underline"
              href="https://nextjs.org"
            >
              Next.js!
            </a>
          </h1>

          <p className="mt-16 text-base leading-6">
            Get started by editing{" "}
            <code className="rounded-md bg-zinc-800 p-3 font-mono text-base">
              pages/index.tsx
            </code>
          </p>
        </main>

        <footer className="flex items-center justify-center pt-8">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            Powered by{" "}
            <span className="ml-2 h-4 invert">
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
