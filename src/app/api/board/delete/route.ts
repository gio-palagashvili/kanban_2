import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

interface IBody {
    boardId: string;
}

export const DELETE = async (req: Request, res: NextApiResponse) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new Response("", { status: 401 });

        const { boardId }: IBody = await req.json();
        await db.board.delete({
            where: {
                id: parseInt(boardId),
                AND: [{
                    userId: session.user.id
                }]

            }
        })
        return new Response('')
    } catch (error) {
        return new Response('', { status: 401 })
    }
}