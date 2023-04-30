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
    const { query } = req;
    if (!query.eventID || query.eventID === "undefined")
    {
      return res.status(401).json({
        error: "Unauthorized",
        description:
          "The event does not have any attendees!",
      });
    }

    // not implementing swag/timestamp for now, gonna chat w/ johnny
    // regarding the usecase

    // after like 3 hours of messing with this I decided to just
    // split this into two separate API calls because 
    // event_attendance is structured oddly and I can't
    // get everything with 1 query

    const { data: eventData, error: eventDataError } = await supabase
      .from("event")
      .select()
      .eq("event_id", query.eventID)
      .single();

    const { data: attendanceData, error: eventAttendanceError } = await supabase
      .from("contacts")
      .select(`*, event_attendance!inner (timestamp, swag, event_id)`)
      .eq("event_attendance.event_id", query.eventID);

    if (eventDataError || eventAttendanceError)
    {
      return res.status(500).json({
        error: "Internal Server Error",
        description: `Something went wrong: ${(eventDataError ? eventDataError.message : eventAttendanceError!.message)}`,
      });
    }

    const resp = {
      ...eventData,
      attendees: attendanceData
    };

    return res.status(200).json(resp);
  }
};

export default handler;
