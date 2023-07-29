import React from "react";
import { dataTableProps2 } from "../../types/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const DataTable = ({
  data,
  rowClick,
}: {
  data: dataTableProps2[];
  rowClick: any;
}) => {
  // schema stays the same so we get the names + values outside of the maps
  console.log(data);
  const headerNames = Object.keys(data[0]);
  const columnValues = Object.values(data[0]);

  const headerElements = headerNames.map((columnTitle) => (
    <th
      key={columnTitle}
      className="rounded-2xl bg-tableHD px-3 py-2 text-left"
    >
      {columnTitle}
    </th>
  ));

  const rowElements = data.map((row: dataTableProps2, rowIndex) => {
    const values = Object.keys(row);
    const columns = values.map((value: string) => {
      // replacement system changed so the original objects
      // are nolonger modified

      let replacement;
      switch (value) {
        case "timestamp":
          replacement = dayjs(row.timestamp).format("MM-DD-YYYY");
          break;

        case "event_timestamp":
          replacement = dayjs(row.timestamp).format("MM-DD-YYYY[ ]h:mm[ ]A");
          break;
        case "swag":
          replacement = row.swag ? "TRUE" : "FALSE";
          break;

        default:
          break;
      }

      return (
        <td
          key={`${row.uh_id}-${value}`} // colIndex as the key
          className="border-collapse px-3 py-1.5"
          onClick={() => {
            if (row && rowClick) rowClick(row);
          }}
        >
          <span>{replacement ? replacement : row[value]}</span>
        </td>
      );
    });

    return (
      <tr
        key={rowIndex} // Use rowIndex as the key
        className="cursor-pointer overflow-x-auto whitespace-nowrap border-b-2 border-b-tableHD bg-sidebarBG hover:bg-zinc-800"
      >
        {columns}
      </tr>
    );
  });

  return (
    <table
      className={`w-full max-w-[900px] border-collapse rounded-md bg-tableHD`}
    >
      <thead>
        <tr className="sticky top-0">{headerElements}</tr>
      </thead>
      <tbody> {rowElements}</tbody>
    </table>
  );
};
