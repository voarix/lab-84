import { UserMutation } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { userLogin } from "../../features/users/usersThunks.ts";
import UserForm from "../../features/users/components/UserForm.tsx";
import { selectUserLoginLoading } from "../../features/users/usersSlice.ts";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const dispatch = useAppDispatch();
  const loginLoading = useAppSelector(selectUserLoginLoading);
  const navigate = useNavigate();

  const onLoginUser = async (user: UserMutation) => {
    try {
      await dispatch(userLogin(user)).unwrap();
      navigate("/tasks");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <UserForm onSubmit={onLoginUser} loading={loginLoading} isLogin={true}/>
    </>
  );
};

export default LoginUser;