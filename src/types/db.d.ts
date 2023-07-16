import { Column } from "@prisma/client";

interface Board {
    id: string;
    name: string;
    userId: string;
    columns: Column[]
}