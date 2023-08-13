import { db } from '@/lib/db';
import { NextApiResponse } from 'next';
import { Prisma } from '@prisma/client'

interface bodyStructure {
    task: {
        currentColumn: string;
        description: string;
        name: string;
    },
    subTasks: SubTask[],
}

export const POST = async (req: Request, res: NextApiResponse) => {
    try {
        const body: bodyStructure = await req.json();
        const { task, subTasks } = body;
        const { description, currentColumn, name } = task;

        if (!name || !currentColumn) {
            return new Response('missing data', { status: 400 })
        }

        let getIndex = null;

        if (await db.task.count({
            where: {
                columnId: parseInt(currentColumn)
            }
        })) {
            getIndex = await db.column.findFirst({
                where: {
                    id: parseInt(currentColumn)
                },
                include: {
                    Tasks: true
                }
            })
        }

        const taskDb = await db.task.create({
            data: {
                name: name,
                description: description,
                columnId: parseInt(currentColumn),
                index: getIndex ? getIndex.Tasks.slice(-1)[0].index + 1 : 0,
                SubTasks: {
                    create: subTasks.length > 0 ? subTasks.map((task) => ({ complete: false, name: task.name })) : undefined,
                },
            }
        })

        return new Response(JSON.stringify(taskDb));
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                if (error.meta!.target[0] === 'taskId') {
                    return new Response('identical sub-task names', { status: 400 });
                }
                return new Response('Task with that name already exists', { status: 400 });
            }
        }
        console.log(error);
    }
}