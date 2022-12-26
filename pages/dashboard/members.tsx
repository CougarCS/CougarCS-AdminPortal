import type { NextPage } from "next";
import Layout from "../../components/layout";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Error from "../../components/error";
import { useState } from "react";
import { Loader } from "@mantine/core";

const Members: NextPage = () => {
  const { data, error, isLoading } = useSWR("/api/members", fetcher);
  const [errorMessage] = useState("Unable to retrieve member data.");

  if (error) {
    return (
      <Layout shell>
        <Error>{errorMessage}</Error>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout shell>
        <div className="grid h-screen place-content-center">
          <Loader color="red" size="xl" />
        </div>
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
