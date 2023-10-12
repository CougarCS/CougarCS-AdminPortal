import { NextPage } from "next";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../components/layout";
import router, { useRouter } from "next/router";

import { Title } from "../../components/title";
import
{
    memberType,
} from "../../types/types";

import fetcher from "../../utils/fetcher";
import poster from "../../utils/poster";

import useSWR, { mutate } from "swr";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { SelectInput } from "../../components/selectInput";
import MemberStatusBox from "../../components/memberStatusBox";

const MemberCbeck: NextPage = () =>
{
    const [idSearch, setIdSearch] = useState("");
    const [existingContact, setExistingContact] = useState<
        memberType | undefined
    >(undefined);

    return (
        <Layout title="Check Membership">
            <Title title="Check Membership" subtitle="Quickly check ✅ a student’s membership status.">
            </Title>

            <div className="w-5/12 mx-auto mt-4">
                <label className="w-full">
                    UH ID
                    <input
                        className="h-9 w-full rounded-sm border border-zinc-700 bg-zinc-800 px-4 text-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        name="uhid"
                        placeholder={"UH ID"}
                        maxLength={7}
                        value={idSearch}
                        onChange={async (e) =>
                        {
                            setIdSearch(e.target.value);
                            const id = parseInt(e.target.value);
                            if (id)
                            {
                                const data = await poster(`/api/members/verify`, {
                                    uh_id: id,
                                });



                                const memberDat = data as memberType[];
                                console.log(memberDat);

                                setExistingContact(
                                    memberDat.find((member) => member.uh_id === id)
                                );
                            }
                        }}
                    />
                </label>

                {idSearch.length === 7 && (
                    <MemberStatusBox member={existingContact} memberships={[]} />
                )}

                <div className="mx-auto mt-4 w-full">
                    {/* lil note */}
                    {idSearch.length < 7 && (
                        <div className="my-4 rounded-sm border border-neutral-500 bg-neutral-700 bg-opacity-10 px-4 py-2 text-center">
                            You can use this page to quickly check if a student is a paid CougarCS member.
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default MemberCbeck;