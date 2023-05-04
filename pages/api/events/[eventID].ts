import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { memberAttendanceType, memberType } from "../../../types/types";

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

    // event data
    const { data: eventData, error: eventDataError } = await supabase
      .from("event")
      .select()
      .eq("event_id", query.eventID)
      .single();

    // attendance data
    const { data: attendanceData, error: eventAttendanceError } = await supabase
      .from("contacts")
      .select(`*, event_attendance!inner (timestamp, swag, event_id)`)
      .eq("event_attendance.event_id", query.eventID);

    // replace 'timestamp' for members with 'timestamp' in member.event_attendnace
    // so it can be mapped in a DataTable
    for (const member of attendanceData as unknown as memberAttendanceType[])
    {
      member.timestamp = member.event_attendance.timestamp;
      member.swag = member.event_attendance.swag;
    }

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

  if (req.method === "DELETE")
  {
    const { query, body } = req;

    if (!query.eventID || query.eventID === "undefined")
    {
      return res.status(401).json({
        error: "Unauthorized",
        description:
          "The event does not have any attendees!",
      });
    }

    const deleteResponse = await supabase
      .from("event_attendance")
      .delete()
      .eq("contact_id", body.contact_id);

    if (deleteResponse.error)
    {
      return res.status(500).json({
        error: "Internal Server Error",
        description: "Something went wrong: We couldn't delete the member.",
      });
    }

    return res.status(200).json(deleteResponse);
  }
};

export default handler;
