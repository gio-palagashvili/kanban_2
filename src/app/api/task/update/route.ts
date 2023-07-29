import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

interface IBody {
    board: Board;
    task: Task,
    destColId: string,
}

export const POST = async (req: Request, res: NextApiResponse) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new Response("", { status: 401 });

        const { board, destColId, task }: IBody = await req.json();
        const isAllowed: number = await db.board.count({
            where: {
                userId: session.user.id,
                AND: [{
                    id: parseInt(board.id)
                }]
            }
        });

        if (isAllowed === 0) {
            return new Response('', { status: 401 })
        }

        await db.task.update({
            where: {
                id: parseInt(task.id)
            },
            data: {
                columnId: parseInt(destColId)
            }
        })

        return new Response('')
    } catch (error) {

    }
}