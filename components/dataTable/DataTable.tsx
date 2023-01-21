import React from "react";

interface DataTableProps
{
    columns?: any[] | undefined;
    rows?: any[] | undefined;
    className?: string;
}
export const DataTable = ({ columns, rows, className }: DataTableProps) =>
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

export const Demo = () =>
{
    const elements = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    ];

    const rows = elements.map((element) => (
        [
            element.position,
            element.name,
            element.symbol,
            element.mass
        ]
    ));

    return (
        <DataTable columns={["Element Position", "Element Name", "Symbol", "Atomic Mass"]} rows={rows} />
    );
};
