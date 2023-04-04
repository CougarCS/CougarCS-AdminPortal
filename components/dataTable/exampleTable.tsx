import { DataTable } from "./DataTable";
import { memberType } from "../../types/types";
import demoData from "./demoData.json";

// data should be an array of objects
const data = demoData as memberType[];

// column headings for the table should be an array of strings
const headings = [
  "UH ID",
  "First",
  "Last",
  "Email",
  "Shirt",
  "Timestamp"
];

// turn the array of objects into something the table will understand
// by mapping it into an array of values

const rows = data.map((row: memberType) =>
  [
    row.uh_id,
    row.first_name,
    row.last_name,
    row.email,
    row.shirt_size_id,
    row.timestamp
  ]
);

export const ExampleDataTable = () =>
{
  return <DataTable className="my-4" columns={headings} rows={rows} />;
};