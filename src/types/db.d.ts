interface Board {
    id: string;
    name: string;
    userId: string;
    columns: Column[]
}
interface Column {
    id: string;
    name: string;
    Tasks: Task[]
}
interface Task {
    id: string;
    index: Number;
    name: string;
    SubTasks: SubTask[]
}
interface SubTask {
    id: string;
    name: string;
    complete: boolean;
}