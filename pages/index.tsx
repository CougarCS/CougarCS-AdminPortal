import { Button, Container, Title } from "@mantine/core";
import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout";
import { AiOutlineDashboard } from "react-icons/ai";
import { useRouter } from "next/router";

const Home: NextPage = () =>
{
  const router = useRouter();

  return (
    <Layout title="Home">
      <Container className="my-10 max-w-md">
        <Title className="my-4 text-center font-bold text-white">
          <Image
            src="/images/CougarCS-logo.png"
            alt="CougarCS Logo"
            width={150}
            height={150}
          />
          <br />
          <a className="my-4 text-red-500">CougarCS</a> Officer Dashboard
        </Title>

        <Button
          className="my-4 rounded bg-red-600 py-2 px-4 font-bold text-white hover:bg-red-700"
          leftIcon={<AiOutlineDashboard />}
          fullWidth
          onClick={() => router.push("/dashboard")}
        >
          <a className="text-white">Dashboard</a>
        </Button>
      </Container>
    </Layout>
  );
};

export default Home;
