import React from "react";
import { dataTableProps } from "../../types/types";

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
    <th key={columnTitle} className="border-collapse  bg-tableHD text-left px-3 py-2">
      {columnTitle}
    </th>
  ));

  const rowElements = data.map((row: any, rowIndex) => {
    const columns = columnValues.map((value: any, colIndex) => {
      return (
        <td
          key={colIndex}
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
        key={rowIndex}
        className="cursor-pointer bg-sidebarBG hover:bg-zinc-800"
      >
        {columns}
      </tr>
    );
  });

  return (
    <table className={`border-separate rounded-md bg-tableHD ${className}`}>
      <thead>
        <tr className="sticky top-0">{headerElements}</tr>
      </thead>

      <tbody>{rowElements}</tbody>

    </table>
  );
};
