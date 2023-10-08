import type { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const supabase = createServerSupabaseClient({ req, res });

	const session = await supabase.auth.getSession();

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
			.select("*, membership(*)")
			.eq("uh_id", body.uh_id);

		if (error) {
			return res.status(500).json({
				error: "Internal Server Error",
				description: "Something went wrong.",
			});
		}

		return res.status(200).json(data);
	}
};

export default handler;
