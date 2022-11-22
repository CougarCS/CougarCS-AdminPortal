import { Box, createStyles, Table } from '@mantine/core';
import { MemberData } from '../../types/types';

// This uses the "Table With Sticky Header" starter from
// https://ui.mantine.dev/category/tables
const tableStyles = createStyles((theme) =>
{
    const redQuery = theme.colorScheme === 'dark' ? theme.colors.red[5] : theme.white;
    const borderWidth = "1px";

    return {
        table:
        {
            border: `${borderWidth} solid ${redQuery}`,

            '& thead tr th': {
                position: 'sticky',
                top: -1,
                padding: '0',

                /*
                    removes the weird barely visible grey bottom border on header
                    from default Mantine styles
                */
                borderBottomWidth: "0",

                /*
                    Narrowed the earlier header border issues down to weird rendering
                    of borders on header cells that had background colors.
                    Wrapping the header cell content with divs and styling the divs
                    seems to fix this perfectly
                */
                '& div': {
                    padding: '0.5rem',
                    textAlign: 'center',

                    color: `${theme.colors.gray[3]}`,
                    backgroundColor: `${theme.colors.dark[9]}`,
                    borderBottom: `1px solid ${redQuery}`,
                },
            },

            // responsible for the inter-table red columns and making table content lighter
            // (easier to read)
            '& th,td': {
                color: `${theme.colors.gray[4]}`,
                borderRight: `${borderWidth} solid ${redQuery}`,
            },
        },
    };
});

interface MembersTableProps
{
    data: MemberData[];
    setSelectedMember: (selected: MemberData) => void;
    setModalOpen: (open: boolean) => void;
}

export function MembersTable({ data, setSelectedMember, setModalOpen }: MembersTableProps)
{
    // const { classes, cx } = useStyles();
    const { classes, cx } = tableStyles();

    const rows = data.map((row) => (
        <tr key={row.contact_id} onClick={() => { setSelectedMember(row); setModalOpen(true); }}>
            <td>{row.contact_id}</td>
            <td>{row.uh_id}</td>
            <td>{row.first_name}</td>
            <td>{row.last_name}</td>
            <td>{row.email}</td>
            <td>{row.phone_number}</td>
            <td>{row.shirt_size_id}</td>
            <td>{row.timestamp}</td>
        </tr>
    ));

    const headers = (
        <tr>
            {['Contact ID', 'UH ID', 'First', 'Last', 'Email', 'Phone', 'Shirt', 'Timestamp'].map((cat =>
                <th>
                    <div>
                        {cat}
                    </div>
                </th>
            ))}
        </tr>
    );

    return (
        <Table withBorder withColumnBorders className={cx(classes.table)} sx={{ marginTop: "1rem", marginBottom: "3rem", minWidth: 700 }}>
            <thead>
                {headers}
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}