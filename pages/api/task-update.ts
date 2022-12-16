import { NextApiRequest, NextApiResponse } from "next"

const taskUpdate = (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === "UPDATE") {
        const data = JSON.parse(req.body)

        res.status(201).json(data)
    }
}

export default taskUpdate