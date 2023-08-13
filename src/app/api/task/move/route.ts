import { authOptions } from '@/lib/authOptions';
import { db } from '@/lib/db';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { DropResult } from 'react-beautiful-dnd';

interface IBody {
    board: Board;
    task: Task,
    domestic: boolean
    drag: DropResult,
    draggedDest: Task,
}

export const POST = async (req: Request, res: NextApiResponse) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return new Response("", { status: 401 });

        const { board, task, domestic, drag, draggedDest }: IBody = await req.json();
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
        const destIndex = drag.destination?.index;
        const srcIndex = drag.source?.index;
        console.log(destIndex);
        if (!domestic) {
            await db.$transaction(async () => {
                await db.task.update({
                    where: {
                        id: parseInt(task.id)
                    },
                    data: {
                        columnId: parseInt(drag.destination!.droppableId.split('_')[0]),
                        index: destIndex
                    }
                });
                if (draggedDest && destIndex) {
                    await db.task.update({
                        where: {
                            id: parseInt(draggedDest.id)
                        },
                        data: {
                            index: destIndex + 1
                        }
                    });
                }
            });

        } else {
            if (!drag) return new Response('Error dragging', { status: 400 })

            await db.$transaction([
                db.task.update({
                    where: {
                        id: parseInt(drag.draggableId)
                    },
                    data: {
                        index: destIndex
                    }
                }),
                db.task.update({
                    where: {
                        id: parseInt(draggedDest.id)
                    },
                    data: {
                        index: srcIndex
                    }
                })
            ]);
        }
        return new Response('')
    } catch (error) {
        return new Response('')
    }
}