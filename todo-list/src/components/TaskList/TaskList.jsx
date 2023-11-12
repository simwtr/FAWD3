import { Stack } from "@mui/system";
import { TaskBlock } from "../TaskBlock/TaskBlock";
import { SORT_ORDER, TASK_PER_PAGE } from "../../consts";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const TaskList = ({
  taskList,
  removeTask,
  setTaskCompleted,
  page,
  isListLoading,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <Stack sx={{ width: "50%" }} spacing={2}>
      {taskList.length !== 0 ? (
        isListLoading ? (
          <Skeleton animation="wave" sx={{ width: "100%" }} />
        ) : (
          <>
            <Stack direction="row" sx={{ cursor: "pointer" }}>
              <Typography onClick={setSortOrder}>Sort By</Typography>
              {sortOrder !== SORT_ORDER.NONE &&
                (sortOrder === SORT_ORDER.ASC ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                ))}
            </Stack>
            {[...taskList]
              .splice(TASK_PER_PAGE * (page - 1), TASK_PER_PAGE)
              .map((task) => {
                return (
                  <TaskBlock
                    key={task.id}
                    task={task}
                    removeTask={removeTask}
                    setTaskCompleted={setTaskCompleted}
                  />
                );
              })}
          </>
        )
      ) : (
        <Typography variant="h4" sx={{ alignSelf: "center" }}>
          No Elements Have Been Found
        </Typography>
      )}
    </Stack>
  );
};
