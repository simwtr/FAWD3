import React from "react";
import { IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";

export const TaskBlock = ({ task, removeTask, setTaskCompleted }) => {
  const navigate = useNavigate();

  const routeHandle = (taskId) => {
    navigate(`/todos/${taskId}`, { state: { selectedTask: task } });
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography
        sx={{
          cursor: "pointer",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#333",
        }}
        onClick={() => routeHandle(task.id)}
      >
        {task.title}
      </Typography>

      <Stack direction="row" sx={{ marginLeft: "auto !important" }}>
        <IconButton onClick={() => setTaskCompleted(task.id)}>
          <DoneIcon sx={{ color: task.completed ? "green" : "#888" }} />
        </IconButton>
        <IconButton onClick={() => removeTask(task.id)}>
          <DeleteForeverIcon sx={{ color: "#ff4d4d" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};
