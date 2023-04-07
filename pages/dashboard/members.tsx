import type { NextPage } from "next";
import Layout from "../../components/layout";
import useSWR, { mutate } from "swr";
import fetcher from "../../utils/fetcher";
import { useState } from "react";
import { LoadSpinner } from "../../components/loadingSpinner";
import poster from "../../utils/poster";
import { memberType } from "../../types/types";
import { toast } from "sonner";
import { DataTable } from "../../components/dataTable/DataTable";

import { ViewMemberModal } from "../../components/membersModal/viewMemberModal";

const Members: NextPage = () => {
  const { data, error, isLoading } = useSWR("/api/members", fetcher);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Unable to retrieve member data."
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<memberType>({
    contact_id: "123foobar",
    uh_id: 1111117,
    email: "testa@ibm.com",
    first_name: "Testy",
    last_name: "Test",
    phone_number: 1112223435,
    shirt_size_id: "XXS",
    timestamp: "01/01/1970",
  });

  const members = data as memberType[];
  const schema = {
    "UH ID": "uh_id",
    First: "first_name",
    Last: "last_name",
    Email: "email",
    Phone: "phone_number",
    Shirt: "shirt_size_id",
    Timestamp: "timestamp",
  };

  if (error) {
    toast.error(`Contacts Error: ${errorMessage}`);
    return (
      <Layout>
        <div className="grid h-full place-content-center">
          <h1 className="text-center text-4xl font-bold text-red-600">
            Contacts Page Error
          </h1>
          <h2 className="mt-2 text-center text-2xl font-medium text-white">
            {errorMessage}
          </h2>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="grid h-screen place-content-center">
          <LoadSpinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ViewMemberModal
        isOpen={modalOpen}
        member={modalData}
        setModalOpen={(state) => setModalOpen(state)}
      />

      <br />
      <button
        onClick={async () => {
          setError(false);

          const res = await poster("/api/members", modalData);

          if (res.error) {
            setError(true);
            setErrorMessage(res.description);
            toast.error(`Contacts Error: ${res.description}`);
            return;
          }

          toast.success(`Successfully added ${modalData.first_name}.`);
          mutate("/api/members", data, false);
        }}
        className="h-9 rounded-sm bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
      >
        Add Member
      </button>

      {isLoading ? (
        <a>loading...</a>
      ) : (
        <DataTable
          className="mt-4"
          schema={schema}
          data={data}
          rowClick={(modalData) => {
            setModalData(modalData);
            setModalOpen(true);
          }}
        />
      )}
    </Layout>
  );
};

export default Members;
