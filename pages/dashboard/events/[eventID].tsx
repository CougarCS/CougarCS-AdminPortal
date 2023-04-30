// The cool thing about the UI we wrote for the Contacts page
// is that a lot of it can also be used for the event details page.
// I think the page should be extracted into a component, maybe?
// That's a far far into the future change though.

import type { NextPage } from "next";
import Layout from "../../../components/layout";
import useSWR, { mutate } from "swr";
import fetcher from "../../../utils/fetcher";
import { useEffect, useState } from "react";
import { LoadSpinner } from "../../../components/loadingSpinner";
import poster from "../../../utils/poster";
import { SSPConfig, memberType } from "../../../types/types";
import { toast } from "sonner";
import { DataTable } from "../../../components/dataTable/DataTable";
import { Title } from "../../../components/title";
import { ViewMemberModal } from "../../../components/membersModal/viewMemberModal";
import { SelectInput } from "../../../components/selectInput";
import SearchBox from "../../../components/searchBox";
import { TextInput } from "../../../components/textInput";
import { searchSortPaginate } from "../../../utils/searchSortPaginate";
import router, { useRouter } from "next/router";

const EventDetails: NextPage = () =>
{
  const router = useRouter();
  const { eventID } = router.query;
  const { data, error, isLoading } = useSWR(`/api/events/${eventID}`, fetcher);

  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Unable to retrieve event data."
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

  type schemaDef = {
    [key: string]: keyof memberType;
  };
  const schema: schemaDef = {
    "UH ID": "uh_id",
    "First": "first_name",
    "Last": "last_name",
    "Email": "email",
    "Phone": "phone_number",
    "Shirt": "shirt_size_id",
    "Timestamp": "timestamp",
  };

  type paginationDef = {
    [key: string]: number;
  };
  const paginationOpts: paginationDef = {
    "20": 20,
    "50": 50,
    "100": 100,
    "All": 1000
  };

  // search, sort, filter

  const [searchQuery, setSearchQuery] = useState("");

  const [paginationCount, setPaginationCount] = useState<string>("20");

  const [sortBy, setSortBy] = useState<keyof memberType>("first_name");
  const [sortDsc, setSortDsc] = useState(false);

  const sspConfig: SSPConfig = {
    paginate: paginationOpts[paginationCount],
    sort: {
      dir: sortDsc ? "descending" : "ascending",
      property: sortBy
    },
    query: (searchQuery === "") ? undefined : searchQuery,
  };

  const [dataPage, setDataPage] = useState(0);

  let presentableData;
  if (data)
  {
    console.log(data);
    presentableData = searchSortPaginate(data, sspConfig);
  }

  if (error)
  {
    toast.error(`Event Details Error: ${errorMessage}`);
    return (
      <Layout>
        <div className="grid h-full place-content-center">
          <h1 className="text-center text-4xl font-bold text-red-600">
            Event Details Error
          </h1>
          <h2 className="mt-2 text-center text-2xl font-medium text-white">
            {errorMessage}
          </h2>
        </div>
      </Layout>
    );
  }

  if (isLoading || !presentableData || presentableData[0] === undefined)
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
        subtitle="All past, present, and future? 🤯 CougarCS members and event attendees.">

        <div className="flex flex-row">
          <div className="mt-2 flex flex-col gap-2">
            <div>
              <span className="text-lg">Contacts per page: </span>
              <SelectInput name="pagination" ariaLabel="Contacts Per Page" height="h-fit"
                width="w-fit"
                textSize="text-lg"
                options={Object.keys(paginationOpts)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                {
                  setPaginationCount(e.target.value);
                }}
                value={paginationCount}
              />
            </div>

            <div>
              <span className="text-lg">Sort contacts by: </span>
              <SelectInput name="sortBy" ariaLabel="Sort Data By" height="h-fit"
                width="w-fit"
                textSize="text-lg"
                options={Object.keys(schema)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                {
                  const val = schema[e.target.value];
                  setSortBy(val);
                }}
                value={schema[sortBy] ? schema[sortBy] : "First"}
              />

              <label>
                <span className="ml-2 mr-1 text-lg">Descending:</span>
                <input type="checkbox" className="accent-red-500 scale-125" checked={sortDsc} onChange={e => setSortDsc(e.target.checked)} />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-3 w-full flex flex-row gap-x-4">
          <button className="px-4 py-2 bg-selectInputBG rounded-md" onClick={() => { router.push("/dashboard/addmember"); }}>Add Contact</button>
          <button className="px-4 py-2 bg-selectInputBG rounded-md" onClick={() => { router.push("/dashboard/delmember"); }}>Delete Contact</button>
          <div className="ml-auto my-auto w-2/5">
            <SearchBox initSearch={setSearchQuery} />
          </div>
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
            className=""
            schema={schema}
            data={presentableData[dataPage]}
            rowClick={(modalData) =>
            {
              setModalData(modalData);
              setModalOpen(true);
            }}
          />
        </>

      )}
    </Layout>
  );
};

export default EventDetails;