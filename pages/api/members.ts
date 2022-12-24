import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";
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
    const mockDataDirectory = path.join(process.cwd(), "data");
    const mockMembers = JSON.parse(
      await fs.readFile(mockDataDirectory + "/MOCK_MEMBER_DATA.json", "utf8")
    );

    return res.status(200).json(mockMembers);
  }
};

export default handler;
