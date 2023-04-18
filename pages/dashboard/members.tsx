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
import { Title } from "../../components/title";
import { ViewMemberModal } from "../../components/membersModal/viewMemberModal";
import { SelectInput } from "../../components/selectInput";
import SearchBox from "../../components/searchBox";
import { TextInput } from "../../components/textInput";

const Members: NextPage = () =>
{
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

  type paginationOptions = "20" | "50" | "100" | "All";
  const [paginationCount, setPaginationCount] = useState<paginationOptions>("20");

  const sortOpts = ["First", "Last", "UH ID", "Email", "Timestamp"] as const;
  type sorts = typeof sortOpts[number];
  const [sortBy, setSortBy] = useState<sorts>("First");

  // const presentableData : memberType[][] = searchSortPaginate();

  const schema = {
    "UH ID": "uh_id",
    First: "first_name",
    Last: "last_name",
    Email: "email",
    Phone: "phone_number",
    Shirt: "shirt_size_id",
    Timestamp: "timestamp",
  };

  if (error)
  {
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

  if (isLoading)
  {
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
      <Title
        title="Contacts"
        subtitle="All past, present, and future? CougarCS members and event attendees.">
        <div className="flex flex-row">
          <div className="mt-2 flex flex-col gap-2">
            <div>
              <span className="text-lg">Contacts per page: </span>
              <SelectInput name="pagination" ariaLabel="Contacts Per Page" height="h-fit"
                width="w-fit"
                textSize="text-lg"
                options={["20", "50", "100", "All"]}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                {
                  const { value, name } = e.target;
                  setPaginationCount(value as paginationOptions);
                }}
                value={paginationCount}
              />
            </div>

            <div>
              <span className="text-lg">Sort members by: </span>
              <SelectInput name="sortBy" ariaLabel="Sort Data By" height="h-fit"
                width="w-fit"
                textSize="text-lg"
                options={["First", "Last", "UH ID", "Email", "Timestamp"]}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                {
                  const { value, name } = e.target;
                  setSortBy(value as sorts);
                }}
                value={sortBy}
              />
            </div>
          </div>
          <TextInput label="" name="memberSearch" placeholder="Search Members" className="ml-auto mt-auto w-2/5" />

        </div>
      </Title>

      <ViewMemberModal
        isOpen={modalOpen}
        member={modalData}
        setModalOpen={(state) => setModalOpen(state)}
      />

      <br />

      {isLoading ? (
        <a>loading...</a>
      ) : (
        <>
          <DataTable
            className="mt-4"
            schema={schema}
            data={data}
            rowClick={(modalData) =>
            {
              setModalData(modalData);
              setModalOpen(true);
            }}
          />
          <button
            onClick={async () =>
            {
              setError(false);

              const res = await poster("/api/members", modalData);

              if (res.error)
              {
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
        </>

      )}
    </Layout>
  );
};

export default Members;