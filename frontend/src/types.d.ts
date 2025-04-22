export interface ITask {
  _id: string;
  user: string;
  title: string;
  description?: string;
  status: "new" | "in progress" | "complete";
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  token: string;
}

export interface UserMutation {
  username: string;
  password: string;
}