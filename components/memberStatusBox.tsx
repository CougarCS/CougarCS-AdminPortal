import { NextPage } from "next";
import React, { useState } from "react";

import { memberType } from "../types/types";

type memberStatusProps = {
    member: memberType | undefined;
    memberships: any[];
};

const MemberStatusBox = ({ member, memberships }: memberStatusProps) =>
{
    return (
        <div className="my-4 rounded-sm border border-red-500 bg-red-700 bg-opacity-10 px-4 py-2 text-center text-lg">
            <span className="mx-2 block text-2xl font-semibold">
                No Membership Found.
            </span>
            We could not find a valid
            membership for this UH ID.
        </div>
    );
};

export default MemberStatusBox;