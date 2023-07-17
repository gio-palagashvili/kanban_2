
interface Board {
    id: string;
    name: string;
    userId: string;
    columns: Column[]
}

interface Column {
    id: string;
    name: String;
    Tasks: Task[]
}