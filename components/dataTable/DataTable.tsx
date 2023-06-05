import React from "react";
import { dataTableProps } from "../../types/types";
import dayjs from 'dayjs';

export const DataTable = ({
  schema,
  data,
  className,
  rowClick,
}: dataTableProps) => {
    // schema stays the same so we get the names + values outside of the maps
  const headerNames = Object.keys(schema);
  const columnValues = Object.values(schema);

  const headerElements = headerNames.map((columnTitle) => (
    <th key={columnTitle} className="bg-tableHD text-left px-3 py-2 rounded-2xl">
      {columnTitle}
    </th>
  ));

  const rowElements = data.map((row: any, rowIndex) => {
    row.timestamp = dayjs(row.timestamp).format('MM-DD-YYYY');
    const columns = columnValues.map((value: any, colIndex) => {
      return (
        <td
          key={`${rowIndex}-${colIndex}`} // Use a combination of rowIndex and colIndex as the key
          className=" border-collapse px-3 py-1.5"
          onClick={() => {
            if (row && rowClick) rowClick(row);
          }}
        >
          {row[value]}
        </td>
      );
    });

    return (
      <tr
        key={rowIndex} // Use rowIndex as the key
        className="cursor-pointer bg-sidebarBG hover:bg-zinc-800 border-b-2 border-b-tableHD"
      >
        {columns}
      </tr>
    );
  });

  return (
    <table className={`border-collapse w-full rounded-md bg-tableHD ${className}`}>
      <thead>
        <tr className="sticky top-0">{headerElements}</tr>
      </thead>
      <tbody>{rowElements}</tbody>
    </table>
  );
};