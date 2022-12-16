import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../util/db";

const userget = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await prisma.user.findMany();
    res.status(200).json(data)
}

export default userget;