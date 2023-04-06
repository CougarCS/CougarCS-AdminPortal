import React from "react";
import { dataTableProps } from "../../types/types";

import Modal from "react-modal";

export const DataTable = ({ schema, data, className, rowClick }: dataTableProps) =>
{
  // schema stays the same so we get the names + values outside of the maps
  const headerNames = Object.keys(schema);
  const columnValues = Object.values(schema);

  const headerElements = headerNames.map(columnTitle =>
    <th key={columnTitle} className="border border-red-400 bg-black px-2 py-2">
      {columnTitle}
    </th>);

  const rowElements = data.map((row: any, rowIndex) =>
  {
    const columns = columnValues.map((value: any, colIndex) =>
    {
      return (
        <td key={colIndex} className="border-x border-x-red-400 px-3 py-1.5" onClick={() => { if (row && rowClick) rowClick(row); }}>
          {row[value]}
        </td>
      );
    });

    return (
      <tr key={rowIndex} className="cursor-pointer border border-y-zinc-700 text-gray-300 first:border-t-0 last:border-b-red-400 hover:bg-zinc-800">
        {columns}
      </tr>
    );
  });

  return (
    <table className={`table-auto border border-red-400 ${className}`}>
      <thead>
        <tr className="sticky top-0">
          {headerElements}
        </tr>
      </thead>

      <tbody>
        {rowElements}
      </tbody>
    </table>
  );
};