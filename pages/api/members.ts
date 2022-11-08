import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";
// import memberJSON from "../../data/members.json";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const mockDataDirectory = path.join(process.cwd(), "data");
  const mockMembers = JSON.parse(
    await fs.readFile(mockDataDirectory + "/MOCK_MEMBER_DATA.json", "utf8")
  );

  res.status(200).json(mockMembers);
};

export default handler;
