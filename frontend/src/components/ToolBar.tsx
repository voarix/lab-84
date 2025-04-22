import { AppBar, Box, Container, styled, Toolbar, Typography } from "@mui/material";
import {NavLink} from "react-router-dom";

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            <Link to="/register">ToDoList</Link>
          </Typography>

          <Box>
            <Link to="/session" sx={{mr: 2}}>Login</Link>
            |
            <Link to="/register" sx={{ml: 2}}>Register</Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};


export default AppToolbar;