import { NextPage } from "next";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../components/layout";

import { toast } from "sonner";
import { LoadSpinner } from "../../components/loadingSpinner";
import { Title } from "../../components/title";

import useSWR, { mutate } from "swr";
import fetcher from "../../utils/fetcher";

const Events: NextPage = () =>
{
    const supabase = useSupabaseClient();
    const [loading, setLoading] = useState(false);

    const { data, error, isLoading } = useSWR("/api/events", fetcher);
    console.log(data);

    if (isLoading)
    {
        return (
            <Layout title="Events">
                <div className="w-5/12 mx-auto place-content-center">
                    <h1>Loading</h1>
                    <LoadSpinner />
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Events">
            <Title
                title="Events"
                subtitle="Let's get the party started! 🎉 Check event attendance and make new events here.">
            </Title>
            <div className="w-5/12 mx-auto place-content-center">

            </div>
        </Layout>
    );
};

export default Events;
