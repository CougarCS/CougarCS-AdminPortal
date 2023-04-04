import React from "react";
import { dataTableProps } from "../../types/types";

export const DataTable = ({ columns, rows, className }: dataTableProps) =>
{
  const styledHeaderColumns = columns?.map(columnTitle =>
    <th key={columnTitle} className="border border-red-400 bg-black px-2 py-2">
      {columnTitle}
    </th>);

  // Outermost map is for each row, innermost map is for each column in that row
  const styledRows = rows?.map((rowData: any[], index) =>
    <tr key={index} className="cursor-pointer border border-y-zinc-700 text-gray-300 first:border-t-0 last:border-b-red-400 hover:bg-zinc-800">
      {rowData.map((rowCol: any, index) =>
        <td key={index} className="border-x border-x-red-400 px-3 py-1.5">
          {rowCol}
        </td>)}
    </tr>);

  return (
    <table className={`table-auto border border-red-400 ${className}`}>
      <thead>
        <tr className="sticky top-0">
          {styledHeaderColumns}
        </tr>
      </thead>

      <tbody>
        {styledRows}
      </tbody>
    </table>
  );
};
