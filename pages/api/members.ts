import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({
      error: "Unauthorized",
      description:
        "The user does not have an active session or is not authenticated",
    });
  }

  if (req.method === "POST") {
    const { body } = req;

    const { data, error } = await supabase
      .from("contacts")
      .insert([body])
      .select();

    if (error) {
      if (error.code === "23505") {
        return res.status(409).json({
          error: "Conflict",
          description: "This contact already exists.",
        });
      }

      return res.status(500).json({
        error: "Internal Server Error",
        description: "Something went wrong.",
      });
    }

    return res.status(200).json({ data: data });
  }

  if (req.method === "GET") {
    const { data: contacts, error } = await supabase
      .from("contacts")
      .select("*");

    if (error) {
      return res.status(500).json({
        error: "Internal Server Error",
        description: "Something went wrong.",
      });
    }

    return res.status(200).json(contacts);
  }

  if (req.method === "PUT") {
    const { body } = req;

    const contactResponse = await supabase
      .from("contacts")
      .update([body])
      .eq("contact_id", body.contact_id)
      .select("*");

    if (contactResponse.error)
    {
      return res.status(500).json({
        error: "Internal Server Error",
        description: "Something went wrong: We couldn't update the member.",
      });
    }

    return res.status(200).json(contactResponse);
  }
};

export default handler;
