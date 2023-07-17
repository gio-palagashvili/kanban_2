import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

export const POST = async (req: Request, res: NextApiResponse) => {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("", { status: 401 });

    try {
        const boards = await db.board.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                columns: true
            }
        })

        return new Response(JSON.stringify(boards), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 400 })
    }
}