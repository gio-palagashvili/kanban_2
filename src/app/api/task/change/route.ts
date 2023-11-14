import { db } from '@/lib/db';
import { NextApiResponse } from 'next';

interface IBody {
    colId: string,
    taksId: string,
}
export const PATCH = async (req: Request, res: NextApiResponse) => {
    try {
        const { colId, taksId }: IBody = await req.json();
        await db.task.update({
            data: {
                columnId: parseInt(colId),
            },
            where: {
                id: parseInt(taksId)
            }
        })
        return new Response('')
    } catch (error) {
        return new Response('Error moving')
    }
}