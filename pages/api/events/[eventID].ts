import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { memberAttendanceType, memberType } from "../../../types/types";
import poster from "../../../utils/poster";

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
      .from("event_attendance")
      .select(`event_id, timestamp, swag, contacts (*)`)
      .eq("event_id", query.eventID);

    type eventAttInfo = {
      event_id: string;
      swag: boolean;
      timestamp: string;
      contacts: memberAttendanceType;
    };

    // this puts the event attendance info on the "top-level"
    // of each contact, so it can be mapped in a DataTable
    for (const member of attendanceData as unknown as eventAttInfo[])
    {
      member.contacts.event_id = member.event_id;
      member.contacts.event_timestamp = member.timestamp;
      member.contacts.swag = member.swag;
    }

    let memberAttendanceOutput = attendanceData?.map(member => member.contacts);

    if (eventDataError || eventAttendanceError)
    {
      return res.status(500).json({
        error: "Internal Server Error",
        description: `Something went wrong: ${(eventDataError ? eventDataError.message : eventAttendanceError!.message)}`,
      });
    }

    const resp = {
      ...eventData,
      attendees: memberAttendanceOutput
    };

    return res.status(200).json(resp);
  }

  if (req.method === "POST")
  {
    console.dir(req.body.member);
    const { query } = req;
    const { member, swag } = req.body;

    if (!query.eventID || query.eventID === "undefined")
    {
      return res.status(401).json({
        error: "Unauthorized",
        description:
          "No event specified.",
      });
    }

    // check if they're already in the event, if so, just update swag
    const { data: attendanceData, error: eventAttendanceError } = await supabase
      .from("event_attendance")
      .select(`event_id, timestamp, swag, contact_id`)
      .eq("contact_id", member.contact_id)
      .eq("event_id", query.eventID);

    if (attendanceData && attendanceData.length > 0)
    {
      const { data: swagUpdated, error: swagUpdateError } = await supabase
        .from("event_attendance")
        .update({ swag: swag })
        .eq("contact_id", member.contact_id)
        .eq("event_id", query.eventID)
        .select();

      if (swagUpdateError)
      {
        return res.status(500).json({
          error: "Internal Server Error",
          description: `Something went wrong. ${(swagUpdateError ? swagUpdateError.message : "")}`,
        });
      }

      return res.status(200).json(swagUpdated);
    }

    // not already in the event
    const { data: attendanceAdded, error: attendanceAddError } = await supabase
      .from("event_attendance")
      .insert({ event_id: query.eventID, contact_id: member.contact_id, swag: swag })
      .select();

    if (attendanceAddError)
    {
      return res.status(500).json({
        error: "Internal Server Error",
        description: `Something went wrong. ${(attendanceAddError ? attendanceAddError.message : "")}`,
      });
    }

    return res.status(200).json(attendanceAdded);
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
