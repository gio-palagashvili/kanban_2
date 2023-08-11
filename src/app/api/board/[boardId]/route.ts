import { db } from '@/lib/db';
import { NextApiResponse } from 'next';

export const GET = async (req: any, res: NextApiResponse) => {
    try {
        const id = new URL(req.url).pathname.split('/').slice(-1)[0];

        const board = await db.board.findFirst({
            where: {
                id: parseInt(id),
            },
            include: {
                columns: {
                    include: {
                        Tasks: {
                            include: {
                                SubTasks: true
                            },
                            orderBy: { index: 'asc' }
                        }
                    }
                }
            }
        })
        return new Response(JSON.stringify(board))
    } catch (error) {
        return new Response(JSON.stringify(error))
    }
}