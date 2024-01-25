// The cool thing about the UI we wrote for the Contacts page
// is that a lot of it can also be used for the event details page.
// I think the page should be extracted into a component, maybe?
// That's a far far into the future change though.

import type { NextPage } from "next";
import Layout from "../../../components/layout";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import { useState } from "react";
import { LoadSpinner } from "../../../components/loadingSpinner";
import {
  SSPConfig,
  eventDetails,
  memberAttendanceType,
} from "../../../types/types";
import { toast } from "sonner";
import { DataTable } from "../../../components/tables/DataTable";
import { Title } from "../../../components/title";
import { SelectInput } from "../../../components/formInput/selectInput";
import SearchBox from "../../../components/formInput/searchBox";
import { searchSortPaginate } from "../../../utils/searchSortPaginate";
import { useRouter } from "next/router";
import { SidePanel } from "../../../components/sidePanel/sidePanel";
import { useEventAttendeeStore } from "../../../store/eventAttendeeStore";
import { ViewEventAttendee } from "../../../components/sidePanel/eventAttendees/viewEventAttendee";

const EventDetails: NextPage = () => {
  const router = useRouter();
  const { eventID } = router.query;
  const { data, error, isLoading } = useSWR<
    eventDetails & { attendees: memberAttendanceType[] }
  >(eventID ? `/api/events/${eventID}` : null, eventID ? fetcher : null);

  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Unable to retrieve event data."
  );

  const { setAttendeeState } = useEventAttendeeStore();
  const [isPanelOpen, setPanelOpen] = useState<boolean>(false);

  type schemaDef = {
    [key: string]: keyof memberAttendanceType;
  };
  const schema: schemaDef = {
    "UH ID": "uh_id",
    First: "first_name",
    Last: "last_name",
    Shirt: "shirt_size_id",
    Attended: "event_timestamp",
    Swag: "swag",
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

  const [paginationCount, setPaginationCount] = useState<string>("20");

  const [sortBy, setSortBy] =
    useState<keyof memberAttendanceType>("first_name");
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
    presentableData = searchSortPaginate(data.attendees, sspConfig);
  }

  if (error) {
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

  if (isLoading || !data) {
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
      <Title title={data.title} subtitle={data.description}>
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

        <div className="mt-3 flex w-full flex-row gap-x-4">
          <button
            className="rounded-md bg-selectInputBG px-4 py-2 transition-colors hover:bg-hoverBG"
            onClick={() => {
              router.push(`/dashboard/events/${eventID}/addAttendee`);
            }}
          >
            <span className="text-sm font-semibold">Add Attendee</span>
          </button>
          <div className="my-auto ml-auto w-2/5">
            <SearchBox initSearch={setSearchQuery} />
          </div>
        </div>
      </Title>
      <br />

      {presentableData !== undefined && presentableData[0] !== undefined ? (
        // TODO: ADD DATATABLE CHANGES HERE
        <>
          <SidePanel open={isPanelOpen} setOpen={setPanelOpen}>
            <ViewEventAttendee />
          </SidePanel>

          <DataTable
            className=""
            schema={schema}
            data={presentableData[dataPage]}
            rowClick={(modalData) => {
              setAttendeeState(modalData);
              setPanelOpen(true);
            }}
          />
        </>
      ) : (
        <div className="mt-4 flex flex-col place-content-center">
          <h1 className="text-center text-3xl font-bold text-red-600">
            No Attendees Found
          </h1>
        </div>
      )}
    </Layout>
  );
};

export default EventDetails;
