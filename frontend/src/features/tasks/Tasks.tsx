import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectTasks } from "./tasksSlice.ts";
import { useEffect } from "react";
import { fetchAllTasks } from "./tasksThunks.ts";

const Tasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  // const tasksFetchLoading = useAppSelector(selectTasksLoading);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  return (
    <div>
      {
        tasks.map((task) => (
          <div  key={task._id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
            <p>{task.user}</p>
          </div>
        ))
      }
    </div>
  );
};

export default Tasks;