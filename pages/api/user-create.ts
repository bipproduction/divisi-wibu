import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../util/db";

const userCreate = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = JSON.parse(req.body);
        await prisma.user.create({ data: body })
        res.status(201).json(body)
    }
}

export default userCreate