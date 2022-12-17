import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout shell>
      <div className="pr-8">
        <main className="min-h-screen flex flex-col justify-center items-center pl-16">
          <h1 className="m-0 text-7xl">
            Welcome to{" "}
            <a
              className="hover:underline text-blue-400 font-bold"
              href="https://nextjs.org"
            >
              Next.js!
            </a>
          </h1>

          <p className="mt-16 leading-6 text-base">
            Get started by editing{" "}
            <code className="bg-zinc-800 rounded-md p-3 text-base font-mono">
              pages/index.tsx
            </code>
          </p>
        </main>

        <footer className="flex pt-8 justify-center items-center">
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center"
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
