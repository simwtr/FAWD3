import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #2196F3",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export const TaskCreateModal = ({
  isModalOpen,
  setIsModalOpen,
  createTask,
  errors,
}) => {
  const [taskData, setTaskData] = useState({
    taskTitle: "",
    taskDescription: "",
  });

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box sx={style}>
        <Stack spacing={2}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "20px", color: "#2196F3" }}
          >
            Task Creation
          </Typography>
          <TextField
            error={errors.taskTitle}
            helperText={errors.taskTitle}
            name="taskTitle"
            placeholder="Enter Task Title"
            size="small"
            value={taskData.taskTitle}
            onChange={handleTaskChange}
            sx={{ width: "100%" }}
          />
          <TextField
            name="taskDescription"
            error={errors.taskDescription}
            helperText={errors.taskDescription}
            value={taskData.taskDescription}
            placeholder="Enter Task Descritpion"
            multiline
            maxRows={4}
            onChange={handleTaskChange}
            sx={{ width: "100%" }}
          />
          <Stack direction="row">
            <Button
              sx={{
                width: "100%",
                textTransform: "none",
                marginTop: "20px",
                backgroundColor: "#2196F3",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1565C0",
                },
              }}
              variant="contained"
              disabled={!taskData.taskTitle || !taskData.taskDescription}
              onClick={() => createTask(taskData)}
            >
              Submit Task
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};
