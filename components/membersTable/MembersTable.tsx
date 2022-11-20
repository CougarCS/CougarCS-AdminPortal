import { useState } from 'react';
import { createStyles, Table, ScrollArea } from '@mantine/core';
import { MemberData } from '../../types/types';

// This uses the "Table With Sticky Header" starter from
// https://ui.mantine.dev/category/tables

const useStyles = createStyles((theme) =>
{
    const redQuery = theme.colorScheme === 'dark' ? theme.colors.red[5] : theme.white;
    const borderWidth = "1px";
    return {
        // set top to -1 because text that was getting scrolled over was appearing
        // in a slight gap at the top
        header: {
            position: 'sticky',
            top: -1,
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
            transition: 'box-shadow 150ms ease',
            '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
            },
        },

        borders: {
            '& thead tr th': {
                border: `${borderWidth} solid ${redQuery}`,
                borderBottomWidth: 0,
            },
            '& tbody tr td': {
                borderLeft: `${borderWidth} solid ${redQuery}`,
                borderRight: `${borderWidth} solid ${redQuery}`,
            },

            borderCollapse: "collapse",
            borderSpacing: 0,
        },

        scrolled: {
            boxShadow: theme.shadows.lg,
        },
    };
});

interface MembersTableProps
{
    data: MemberData[];
}

export function MembersTable({ data }: MembersTableProps)
{
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const rows = data.map((row) => (
        <tr key={row.contact_id}>
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
            <th>Contact ID</th>
            <th>UH ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Shirt</th>
            <th>Timestamp</th>
        </tr>
    );

    return (
        <Table  className={cx(classes.borders)} sx={{ marginTop: "1rem", minWidth: 700 }}>
            <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                {headers}
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}