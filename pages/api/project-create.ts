import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../util/db";

const projectCreate = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const data = JSON.parse(req.body)

        console.log("datanya", data)

        await prisma.project.create({
            data: {
                name: data.name,
                UserProject: {
                    createMany: {
                        data: data.user,
                        skipDuplicates: true
                    }
                }
            }
        })

        res.status(201).send("success")
    }
}

export default projectCreate