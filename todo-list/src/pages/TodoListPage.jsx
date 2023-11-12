import React, { useDeferredValue } from "react";
import { Stack } from "@mui/system";
import { Header } from "../components/Header/Header";
import { TaskList } from "../components/TaskList/TaskList";
import { useEffect, useState, forwardRef } from "react";
import Pagination from "@mui/material/Pagination";
import { TASK_PER_PAGE, FILTER_OPTIONS, SORT_ORDER } from "../consts";
import { TaskCreateModal } from "../components/TaskCreateModal/TaskCreateModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Footer } from "../components/Footer/Footer";
import { sortObjectsCallback } from "../utils";
import { validationSchema } from "../validationSchema";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const TodoListPage = () => {
  const [taskList, setTaskList] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isTaskCreateOpen, setIsTaskCreateOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.NONE);

  const [snackbarOptions, setSnackbarOptions] = useState({
    isOpen: false,
    snackbarText: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3004/todos`)
      .then((response) => response.json())
      .then((json) => {
        setTaskList(json);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setSnackbarOptions({
          isOpen: true,
          snackbarText: err,
        });
      });
  }, []);

  useEffect(() => {
    let category;

    switch (categoryFilter) {
      case FILTER_OPTIONS.COMPLETED:
        category = true;
        break;
      case FILTER_OPTIONS.NOT_COMPLETED:
        category = false;
        break;
      default:
        category = "";
        break;
    }

    fetch(
      `http://localhost:3004/todos?title_like=${searchFilter}&completed_like=${category}`
    )
      .then((response) => response.json())
      .then((json) => {
        setTaskList(json);
      });
  }, [searchFilter, categoryFilter]);

  useEffect(() => {
    setTaskList((prevTaskList) =>
      [...prevTaskList].sort(sortObjectsCallback(sortOrder))
    );
  }, [sortOrder]);

  const removeTask = (taskId) => {
    fetch(`http://localhost:3004/todos/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      const nTaskList = taskList.filter((task) => task.id !== taskId);
      setTaskList(nTaskList);
      setSnackbarOptions({
        isOpen: true,
        snackbarText: "Task has been removed!",
      });
    });
  };

  const setTaskCompleted = (taskId) => {
    const isTaskCompleted = taskList.find(
      (task) => task.id === taskId
    ).completed;

    fetch(`http://localhost:3004/todos/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !isTaskCompleted }),
    }).then(() => {
      const nTaskList = taskList.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });

      setTaskList(nTaskList);

      setSnackbarOptions({
        isOpen: true,
        snackbarText: "Task has been updated!",
      });
    });
  };

  const handlePageChange = (_, value) => {
    setPageNumber(value);
  };

  const createTaskHandler = (taskData) => {
    try {
      validationSchema.validateSync(taskData, { abortEarly: false });
      // Validation passed, proceed with creating the task

      let newId = 1;
      if (taskList.length !== 0) {
        newId = taskList[taskList.length - 1].id + 1;
      }
      const data = {
        userId: 1,
        id: newId,
        completed: false,
        title: taskData.taskTitle,
        description: taskData.taskDescription,
      };

      fetch("http://localhost:3004/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        setIsTaskCreateOpen(false);
        setSnackbarOptions({
          isOpen: true,
          snackbarText: "Task has been created!",
        });
        setTaskList((prevTaskList) => [...prevTaskList, data]);
        setValidationErrors({});
      });
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setValidationErrors(validationErrors);
    }
  };

  const handleSnackBarClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOptions({ isOpen: false, snackbarText: "" });
  };

  const handleSortOrderChange = () => {
    if (sortOrder === SORT_ORDER.NONE) {
      setSortOrder(SORT_ORDER.ASC);
    } else if (sortOrder === SORT_ORDER.ASC) {
      setSortOrder(SORT_ORDER.DESC);
    } else if (sortOrder === SORT_ORDER.DESC) {
      setSortOrder(SORT_ORDER.NONE);
    }
  };

  const defferedTaskList = useDeferredValue(taskList);

  return (
    <Stack
      alignItems="center"
      spacing={2}
      sx={{
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Header
        setSearchFilter={setSearchFilter}
        setCategoryFilter={setCategoryFilter}
        searchFilter={searchFilter}
        categoryFilter={categoryFilter}
        setOpenModal={setIsTaskCreateOpen}
      />

      <TaskList
        setSortOrder={handleSortOrderChange}
        sortOrder={sortOrder}
        isListLoading={isLoading}
        page={pageNumber}
        taskList={defferedTaskList}
        removeTask={removeTask}
        setTaskCompleted={setTaskCompleted}
      />

      <TaskCreateModal
        errors={validationErrors}
        isModalOpen={isTaskCreateOpen}
        setIsModalOpen={setIsTaskCreateOpen}
        createTask={createTaskHandler}
      />

      <Snackbar
        onClose={handleSnackBarClose}
        open={snackbarOptions.isOpen}
        autoHideDuration={3000}
        message={snackbarOptions.snackbarText}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarOptions.snackbarText}
        </Alert>
      </Snackbar>

      <Pagination
        page={pageNumber}
        onChange={handlePageChange}
        count={Math.ceil(taskList.length / TASK_PER_PAGE)}
        variant="outlined"
        shape="rounded"
        sx={{ marginTop: "20px" }}
      />

      <Footer />
    </Stack>
  );
};
