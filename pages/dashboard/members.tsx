import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { fetchMember } from "../../utils/api";

const Members: NextPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const memberData = await fetchMember();
      setData(memberData);

      console.log(memberData);

      setLoading(false);
    })();
  }, []);

  return (
    <Layout shell>{loading ? <a>loading...</a> : <a>Data here</a>}</Layout>
  );
};

export default Members;
