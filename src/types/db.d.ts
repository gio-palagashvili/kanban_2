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
interface Task {
    id: string;
    name: String;
    SubTasks: SubTask[]
}
interface SubTask {
    id: string;
    name: String;
    complete: boolean;
}