import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
{
    const supabase = createServerSupabaseClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session)
    {
        return res.status(401).json({
            error: "Unauthorized",
            description:
                "The user does not have an active session or is not authenticated",
        });
    }

    if (req.method === "GET")
    {
        const { body } = req;
        console.log(body.eventID);

        const { data, error } = await supabase
            .from("event")
            .select(`*, contact(*), event_attendance(*)`)
            .eq('event_id', body.eventID);

        if (!error)
        {
            return res.status(500).json({
                error: "Internal Server Error",
                description: "Something went wrong.",
            });
        }

        console.log(data);

        return res.status(200).json(data);
    }
};

export default handler;
