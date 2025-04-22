import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { selectTaskCreateLoading } from "../tasksSlice.ts";
import { createTask, fetchAllTasks } from "../tasksThunks.ts";

const initialState = {
  title: "",
  description: "",
}

const NewTask = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectTaskCreateLoading);
  const [form, setForm] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Please enter title or description");
      return;
    }

    try {
      await dispatch(createTask(
        {
          title: form.title.trim(),
          description: form.description.trim(),
        }
      )).unwrap();
      await dispatch(fetchAllTasks());
      setForm(initialState);
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
      mb: 8,
      p: 3,
      maxWidth: 700,
      mx: "auto",
      borderRadius: 2,
      boxShadow: 2,
    }}>

      <TextField
        name="title"
        label="title"
        value={form.title}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={20} color="inherit" /> : "Create"}
      </Button>
    </Box>
  );
};

export default NewTask;