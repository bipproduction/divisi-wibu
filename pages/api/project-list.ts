import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../util/db";

const projectList = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await prisma.project.findMany({
        select: {
            id: true,
            name: true,
            UserProject: {
                select: {
                    User: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            Task: {
                select: {
                    id: true,
                    start: true,
                    end: true,
                    dependencies: true,
                    displayOrder: true,
                    hideChildren: true,
                    isDisabled: true,
                    name: true,
                    progress: true,
                    type: true,
                    project: true
                }
            }
        }
    })

    res.status(200).json(data)
}

export default projectList;