import type { NextPage } from "next";
import Layout from "../../components/layout";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useState } from "react";
import { LoadSpinner } from "../../components/loadingSpinner";
import { SSPConfig, memberType } from "../../types/types";
import { toast } from "sonner";
import { DataTable } from "../../components/dataTable/dataTable";
import { Title } from "../../components/title";
import { SelectInput } from "../../components/formInput/selectInput";
import SearchBox from "../../components/formInput/searchBox";
import { searchSortPaginate } from "../../utils/searchSortPaginate";
import router from "next/router";
import { PaginationControl } from "../../components/paginationControl";
import { SidePanel } from "../../components/sidePanel/sidePanel";
import { ContactsController } from "../../components/sidePanel/contacts/contactsController";
import { useContactsStore } from "../../store/contactsStore";

const Members: NextPage = () => {
  const { data, error, isLoading } = useSWR("/api/members", fetcher);
  const [errorMessage, setErrorMessage] = useState(
    "Unable to retrieve member data."
  );

  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const { setContactInfo } = useContactsStore();

  type schemaDef = {
    [key: string]: keyof memberType;
  };
  const schema: schemaDef = {
    "UH ID": "uh_id",
    First: "first_name",
    Last: "last_name",
    Email: "email",
    Phone: "phone_number",
    Shirt: "shirt_size_id",
    Timestamp: "timestamp",
  };

  // for the select input, come up with a more elegant solution later
  // (when we split the tables into individual member/contact table components and simplify logic)
  type invertedSchemaDef = {
    [key: string]: string;
  };
  const invertedSchema: invertedSchemaDef = {
    uh_id: "UH ID",
    first_name: "First",
    last_name: "Last",
    email: "Email",
    phone_number: "Phone",
    shirt_size_id: "Shirt",
    timestamp: "Timestamp",
  };

  type paginationDef = {
    [key: string]: number;
  };
  const paginationOpts: paginationDef = {
    "20": 20,
    "50": 50,
    "100": 100,
    All: 1000,
  };

  // search, sort, filter

  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery);

  const [paginationCount, setPaginationCount] = useState<string>("20");

  const [sortBy, setSortBy] = useState<keyof memberType>("first_name");
  const [sortDsc, setSortDsc] = useState(false);

  const sspConfig: SSPConfig = {
    paginate: paginationOpts[paginationCount],
    sort: {
      dir: sortDsc ? "descending" : "ascending",
      property: sortBy,
    },
    query: searchQuery === "" ? undefined : searchQuery,
  };

  const [dataPage, setDataPage] = useState(0);

  let presentableData;
  if (data) {
    presentableData = searchSortPaginate(data, sspConfig) as memberType[][];
  }

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
      <Title
        title="Contacts"
        subtitle="All past, present, and future? 🤯 CougarCS members and event attendees."
      >
        <div className="flex flex-row">
          <div className="mt-3 flex flex-col">
            <div className="mb-3">
              <span className="mr-2 text-gray-100">Contacts per page: </span>
              <SelectInput
                name="pagination"
                ariaLabel="Contacts Per Page"
                height="h-fit"
                width="w-fit"
                textSize="text-base"
                options={Object.keys(paginationOpts)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setDataPage(0);
                  setPaginationCount(e.target.value);
                }}
                value={paginationCount}
              />
            </div>

            <div className="flex items-center">
              <div className="flex items-center">
                <span className="mr-2 text-gray-100">Sort contacts by: </span>
                <SelectInput
                  name="sortBy"
                  ariaLabel="Sort Data By"
                  height="h-fit"
                  width="w-fit"
                  textSize="text-base"
                  options={Object.keys(schema)}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const val = schema[e.target.value];
                    setSortBy(val);
                  }}
                  value={invertedSchema[sortBy]}
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center">
                  <span className="ml-4 mr-2 text-gray-100">Descending:</span>
                  <input
                    type="checkbox"
                    className="scale-125 accent-red-500"
                    checked={sortDsc}
                    onChange={(e) => setSortDsc(e.target.checked)}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex w-full items-center gap-x-4">
          <button
            className="rounded-md bg-selectInputBG px-4 py-2 transition-colors hover:bg-hoverBG"
            onClick={() => {
              router.push("/dashboard/addmember");
            }}
          >
            <span className="text-sm font-semibold">Add Contact</span>
          </button>
          <button
            className="rounded-md bg-selectInputBG px-4 py-2 transition-colors hover:bg-hoverBG"
            onClick={() => {
              router.push("/dashboard/delmember");
            }}
          >
            <span className="text-sm font-semibold">Delete Contact</span>
          </button>
          <div className="my-auto ml-auto w-2/5">
            <SearchBox
              initSearch={(searchQuery) => {
                setSearchQuery(searchQuery);
                setDataPage(0);
              }}
            />
          </div>
        </div>
      </Title>

      {presentableData !== undefined && presentableData[0] !== undefined ? (
        <div className="mt-6">
          <SidePanel open={openPanel} setOpen={setOpenPanel}>
            <ContactsController />
          </SidePanel>

          <DataTable
            schema={schema}
            data={presentableData[dataPage]}
            rowClick={(sidePanelData) => {
              setOpenPanel(true);
              setContactInfo(sidePanelData);
            }}
          />

          <PaginationControl
            dataPage={dataPage}
            presentableData={presentableData}
            setDataPage={setDataPage}
          />
        </div>
      ) : (
        <div className="mt-4 flex flex-col place-content-center">
          <h1 className="text-center text-3xl font-bold text-red-600">
            No Contacts Found
          </h1>
          <h2 className="mt-2 text-center text-xl font-medium text-white">
            No contacts matched your query.
          </h2>
        </div>
      )}
    </Layout>
  );
};

export default Members;

// for future ref/use
/* <button
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
  className="h-9 rounded-md bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
>
  Add Member
</button>; */
