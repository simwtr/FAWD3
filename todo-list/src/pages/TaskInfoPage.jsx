import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Typography, Paper, Stack } from "@mui/material";

export const TaskInfoPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.selectedTask) {
      navigate("/todos");
    }
  }, [state?.selectedTask, navigate]);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#fff",
          width: "50%",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          {state?.selectedTask.title}
        </Typography>
        <Typography variant="body1">
          {state?.selectedTask.description}
        </Typography>
      </Paper>
    </Stack>
  );
};
