import type { GetServerSidePropsContext } from "next";
import Layout from "../../components/layout";
import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { AiOutlineUnorderedList } from "react-icons/ai";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

const Dashboard = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <Layout shell title="Dashboard">
      <div>
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <h2 className="text-xl font-medium text-white">
          Welcome, <a className="text-red-600">{user.email}</a>
        </h2>
      </div>

      <Button
        className="my-4 max-w-sm rounded bg-red-600 py-2 px-4 font-bold text-white hover:bg-red-700"
        leftIcon={<AiOutlineUnorderedList />}
        fullWidth
        onClick={() => router.push("/dashboard/members")}
      >
        <a className="text-white">Members</a>
      </Button>
    </Layout>
  );
};

export default Dashboard;
