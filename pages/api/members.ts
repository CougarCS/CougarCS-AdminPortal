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
    console.log("POST request received with body: ", body);

    return res.status(200).json({ message: "POST request received" });
  }

  if (req.method === "GET") {
    const { data: contacts, error } = await supabase
      .from("contacts")
      .select("*");

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json(contacts);
  }
};

export default handler;
