import { Modal, Button, Group } from '@mantine/core';
import { useState } from 'react';
import { MemberData } from '../../types/types';

// just gonna make the barebones modal component that opens
// on table element click, the actual modal details/style are for
// mohammed to implement (don't wanna steal your job)

interface MemberModalProps
{
    member: MemberData;
    open: boolean, setClose: () => void;
}

export default function MemberModal({ member, open, setClose }: MemberModalProps)
{
    // member is an object containing details of the member the user just clicked on
    // you can put them in HTML elements like I did with the div

    // Here's a really nice bit of documentation on styling/modifying the modal
    // https://mantine.dev/core/modal/
    return (
        <Modal
            opened={open}
            onClose={() => setClose()}
            title="member"
        >
            <span>firstname: {member.first_name}</span>
        </Modal>
    );
};