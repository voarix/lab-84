import { UserMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { userCreate } from "../../features/users/usersThunks.ts";
import UserForm from "../../features/users/components/UserForm.tsx";
import { selectUserCreateLoading } from "../../features/users/usersSlice.ts";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectUserCreateLoading);
  const navigate = useNavigate();

  const onNewUser = async (newUser: UserMutation) => {
    try {
      await dispatch(userCreate(newUser)).unwrap();
      navigate("/tasks");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <UserForm onSubmit={onNewUser} loading={createLoading} isLogin={false}/>
    </>
  );
};

export default NewUser;