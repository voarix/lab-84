import React, { useEffect, useState } from "react";
import { UserMutation } from "../../../types";
import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";

interface Props {
  onSubmit: (data: UserMutation) => void;
  loading: boolean;
  isLogin: boolean;
}

const initialForm: UserMutation = {
  username: "",
  password: "",
};

const UserForm: React.FC<Props> = ({onSubmit, loading, isLogin}) => {
  const [form, setForm] = useState<UserMutation>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.username.trim() && form.password.trim()) {
      onSubmit({
        username: form.username.trim(),
        password: form.password.trim(),
      });

      setForm(initialForm);
    } else {
      alert("Please enter password or username");
    }
  };

  useEffect(() => {
    setForm(initialForm);
  }, [isLogin]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
      mt: 4,
      p: 3,
      maxWidth: 700,
      mx: "auto",
      backgroundColor: "white",
      borderRadius: 2,
      boxShadow: 2,
    }}>
      <Typography variant="h6" sx={{mb: 1}}>{isLogin ? "Sign In" : "Register"}</Typography>

      <TextField
        name="username"
        label="Your name"
        value={form.username}
        onChange={handleChange}
        fullWidth
        sx={{mb: 1}}
      />

      <TextField
        name="password"
        type="password"
        label="Your password"
        value={form.password}
        onChange={handleChange}
        fullWidth
        required
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{mt: 2}}
      >
        {loading ? (
          <CircularProgress size={20} color="inherit"/>
        ) : (
          isLogin ? "Sign In" : "Register"
        )}
      </Button>
    </Box>
  );
};

export default UserForm;