import "./App.css";
import { Container, CssBaseline, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import NewUser from "./Containers/User/NewUser.tsx";
import AppToolbar from "./components/ToolBar.tsx";
import Tasks from "./features/tasks/Tasks.tsx";
import LoginUser from "./Containers/User/LoginUser.tsx";

const App = () => {

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl" sx={{mt: 5}}>
          <Routes>
            <Route path="/register" element={<NewUser/>}/>
            <Route path="/" element={<NewUser/>}/>
            <Route path="/session" element={<LoginUser/>}/>
            <Route path="/tasks" element={<Tasks/>}/>
            <Route
              path="*"
              element={<Typography variant="h4">Not found page</Typography>}
            />
          </Routes>
        </Container>
      </main>
    </>
  );
};
export default App;
