import { db } from '@/lib/db';
import { NextApiResponse } from 'next';

interface IBody {
    colId: string,
    taskId: string,
}
export const PATCH = async (req: Request, res: NextApiResponse) => {
    try {
        const { colId, taskId }: IBody = await req.json();
        await db.task.update({
            data: {
                columnId: parseInt(colId),
            },
            where: {
                id: parseInt(taskId)
            }
        })
        return new Response('')
    } catch (error) {
        return new Response('Error moving')
    }
}