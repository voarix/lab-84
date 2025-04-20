export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface TaskMutation {
  user: string;
  title: string;
  description?: string;
  status: "new" | "in progress" | "complete";
}
