import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

interface IBody {
    complete: boolean,
    subtaskId: string
}

export const POST = async (req: Request, res: NextApiResponse) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new Response("", { status: 401 });

        const { complete, subtaskId }: IBody = await req.json();

        await db.subTask.update({
            data: {
                complete: complete
            },
            where: {
                id: parseInt(subtaskId),
            }
        })

        return new Response('');
    } catch (error) {
        return new Response('', { status: 400 });
    }
}