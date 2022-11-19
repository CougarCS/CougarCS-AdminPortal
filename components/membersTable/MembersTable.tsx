import { useState } from 'react';
import { createStyles, Table, ScrollArea } from '@mantine/core';
import { MemberData } from '../../types/types';

// This uses the "Table With Sticky Header" starter from
// https://ui.mantine.dev/category/tables
const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        transition: 'box-shadow 150ms ease',
        '& th':
        {
            border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.red[6] : theme.colors.gray[2]
                }`,
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
        },
    },

    bordering: {
        '& td': {
            border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.red[6] : theme.colors.gray[2]
                }`,
        },
        borderCollapse: 'collapse',
    },

    scrolled: {
        boxShadow: theme.shadows.lg,
    },
}));

interface MembersTableProps
{
    data: MemberData[];
}

export function MembersTable({ data }: MembersTableProps)
{
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const rows = data.map((row) => (
        <tr className={cx(classes.bordering)} key={row.contact_id}>
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

    return (
        <ScrollArea sx={{ height: "40%" }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <Table className={cx(classes.bordering)} sx={{ minWidth: 700 }}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
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
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}