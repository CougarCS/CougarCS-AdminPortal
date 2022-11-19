import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { MembersTable } from "../components/membersTable/MembersTable";
import { MemberData } from "../types/types";
import { fetchMember } from "../utils/api";

const Members: NextPage = () =>
{
  const [data, setData] = useState<MemberData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() =>
  {
    setLoading(true);

    (async () =>
    {
      const memberData = await fetchMember();
      setData(memberData);

      console.log(memberData);

      setLoading(false);
    })();
  }, []);

  return (
    <Layout shell>{loading ? <a>loading...</a> : <MembersTable data={data} />}</Layout>
  );
};

export default Members;
