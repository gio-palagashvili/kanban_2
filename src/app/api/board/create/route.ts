import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';
import { BoardValidator, ColsZod, ColsValidator } from '@/types/zod/board.zod';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { ZodError } from 'zod'


interface bodyType {
    name: string;
    cols: ColsZod[]
}

export const POST = async (req: Request, res: NextApiResponse) => {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("", { status: 401 });

    try {
        const body: bodyType = await req.json();
        const { name } = BoardValidator.parse(body);
        const vals = ColsValidator.parse(body.cols);

        const board = await db.board.create({
            data: {
                name: name,
                userId: session.user.id,
                columns: {
                    create: vals.map((column) => ({ name: column.value })),
                }
            },
            select: {
                id: true,
                name: true,
                userId: true,
                columns: true,
            }
        })

        return new Response(JSON.stringify(board))
    } catch (error) {
        if (error instanceof ZodError) {
            return new Response('invalid data', { status: 500 });
        }
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        }
        return new Response('unknown error', { status: 500 });
    }
}