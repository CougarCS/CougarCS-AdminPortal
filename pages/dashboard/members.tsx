import type { NextPage } from "next";
import Layout from "../../components/layout";
import useSWR, { mutate } from "swr";
import fetcher from "../../utils/fetcher";
import Error from "../../components/error";

const Members: NextPage = () => {
  const { data, error, isLoading } = useSWR("/api/members", fetcher);

  if (error) {
    return (
      <Layout shell>
        <Error>Unable to retrieve member data.</Error>
      </Layout>
    );
  }

  return (
    <Layout shell>
      {isLoading ? <a>loading...</a> : <a>{data[0].contact_id}</a>}
    </Layout>
  );
};

export default Members;
