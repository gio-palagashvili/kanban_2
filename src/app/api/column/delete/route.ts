import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

interface IBody {
    colId: string;
}

export const POST = async (req: Request, res: NextApiResponse) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new Response("", { status: 401 });

        const { colId }: IBody = await req.json();
        await db.column.delete({
            where: {
                id: parseInt(colId),
                Board: {
                    userId: session.user.id
                }
            }
        })
        return new Response('')
    } catch (error) {
        return new Response(`${error}`)
    }
}