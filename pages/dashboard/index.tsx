import type { GetServerSidePropsContext } from "next";
import Layout from "../../components/layout";
import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

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
  return (
    <Layout shell title="Dashboard">
      <div>
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <h2 className="text-xl font-medium text-white">
          Welcome, <a className="text-red-500">{user.email}</a>
        </h2>
      </div>

      <br />
      <br />

      <Link href="dashboard/members">
        <a className="text-red-300">Click here to navigate to /members</a>
      </Link>
    </Layout>
  );
};

export default Dashboard;
