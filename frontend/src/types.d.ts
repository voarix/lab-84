export interface ITask {
  _id: string;
  user: string;
  title: string;
  description?: string;
  status: "new" | "in progress" | "complete";
}

export interface TaskMutation {
  title: string;
  description?: string;
  status?: "new" | "in progress" | "complete";
}

export interface TaskResponse {
    tasks: Task[];
    user: IUser;
}

export interface IUser {
  _id: string;
  username: string;
  token: string;
}

export interface UserMutation {
  username: string;
  password: string;
}