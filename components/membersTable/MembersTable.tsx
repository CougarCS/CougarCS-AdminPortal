import { MemberData } from '../../types/types';

interface MembersTableProps
{
    data: MemberData[];
    setSelectedMember: (selected: MemberData) => void;
    setModalOpen: (open: boolean) => void;
}

export function MembersTable({ data, setSelectedMember, setModalOpen }: MembersTableProps)
{
    const rows = data.map((row) => (
        <tr className="border border-y-zinc-700 first:border-t-0 last:border-b-red-400 text-gray-300 hover:bg-zinc-800 cursor-pointer" key={row.contact_id} onClick={() => { setSelectedMember(row); setModalOpen(true); }}>
            <td className="px-1 py-1.5 border-x border-x-red-400">{row.contact_id}</td>
            <td className="px-1 py-1.5 border-x border-x-red-400">{row.uh_id}</td>
            <td className="px-1 py-1.5 border-x border-x-red-400">{row.first_name}</td>
            <td className="px-1 py-1.5 border-x border-x-red-400">{row.last_name}</td>
            <td className="px-1 py-1.5 border-x border-x-red-400">{row.email}</td>
            <td className="px-1 py-1.5 border-x border-x-red-400">{row.phone_number}</td>
            <td className="px-1 py-1.5 border-x border-x-red-400">{row.shirt_size_id}</td>
            <td className="px-1 py-1.5 border-x border-x-red-400">{row.timestamp}</td>
        </tr>
    ));

    const headers = (
        <tr className="sticky top-0">
            {['Contact ID', 'UH ID', 'First', 'Last', 'Email', 'Phone', 'Shirt', 'Timestamp'].map((label =>
                <th className="p-0 border border-red-400">
                    <div className="px-1 py-2 bg-black text-slate-100">
                        {label}
                    </div>
                </th>
            ))}
        </tr>
    );

    return (
        <table className="table-auto border border-t-0 border-x-red-400">
            <thead>
                {headers}
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}