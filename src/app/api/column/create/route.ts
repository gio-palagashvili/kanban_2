import { Prisma } from '.prisma/client';
import { db } from '@/lib/db';
import { NextApiResponse } from 'next';

interface IBody {
    data: string
    boardId: string
}
export const POST = async (req: Request, res: NextApiResponse) => {
    try {
        const { data, boardId }: IBody = await req.json();
        if (data.length === 0) {
            return new Response("name can't be empty", { status: 404 })
        }

        const newCol = await db.column.create({
            data: {
                name: data,
                boardId: parseInt(boardId)
            },
            include: { Tasks: true }
        })

        return new Response(JSON.stringify(newCol))
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return new Response('duplicate names', { status: 400 });
            }
        }
    }
}