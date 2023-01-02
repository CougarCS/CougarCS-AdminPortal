import type { NextPage } from "next";
import Layout from "../../components/layout";
import useSWR, { mutate } from "swr";
import fetcher from "../../utils/fetcher";
import Error from "../../components/error";
import { useState } from "react";
import { Button, Loader } from "@mantine/core";
import poster from "../../utils/poster";
import Success from "../../components/success";

const Members: NextPage = () => {
  const { data, error, isLoading } = useSWR("/api/members", fetcher);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Unable to retrieve member data."
  );
  const [isSuccess, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const user = {
    uh_id: 1234567,
    email: "eklug0@ibm.com",
    first_name: "Esmaria",
    last_name: "Klug",
    phone_number: 3271982939,
    shirt_size_id: "L",
  };

  return (
    <Layout shell>
      {isLoading ? <a>loading...</a> : <a>{data[0].contact_id}</a>}
      <br />
      <Button
        className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700 "
        onClick={async () => {
          setError(false);
          setSuccess(false);

          const res = await poster("/api/members", user);

          if (res.error) {
            setError(true);
            setErrorMessage(res.description);
            return;
          }

          setSuccess(true);
          setSuccessMessage(`${user.first_name} was successfully added.`);
          mutate("/api/members", data, false);
        }}
      >
        Add Member
      </Button>
      {isError ? <Error>{errorMessage}</Error> : <></>}
      {isSuccess ? <Success>{successMessage}</Success> : <></>}
    </Layout>
  );
};

export default Members;
