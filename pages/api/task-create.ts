import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../util/db";

const taskCreate = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = JSON.parse(req.body);

        const data = await prisma.task.create({
            data: body
        })

        res.status(201).json("success")
    }
}

export default taskCreate