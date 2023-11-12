import React from "react";
import {
  TextField,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import { Stack } from "@mui/system";
import { FILTER_OPTIONS } from "../../consts";

export const Header = ({
  setSearchFilter,
  setCategoryFilter,
  searchFilter,
  categoryFilter,
  setOpenModal,
}) => {
  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  return (
    <Stack
      sx={{
        width: "47%",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#2196F3",
        color: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
      alignItems="center"
      spacing={2}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "10px" }}
      >
        Fancy Todo List
      </Typography>
      <Stack direction="row" spacing={3} alignItems="center">
        <TextField
          value={searchFilter}
          onChange={handleSearchChange}
          variant="outlined"
          sx={{ backgroundColor: "#fff", borderRadius: "4px" }}
        />
        <FormControl variant="outlined" sx={{ minWidth: "120px" }}>
          <Select
            sx={{
              backgroundColor: "#fff",
              borderRadius: "4px",
            }}
            value={categoryFilter}
            onChange={handleCategoryChange}
          >
            <MenuItem value={FILTER_OPTIONS.ALL}>All Tasks</MenuItem>
            <MenuItem value={FILTER_OPTIONS.COMPLETED}>Show Completed</MenuItem>
            <MenuItem value={FILTER_OPTIONS.NOT_COMPLETED}>
              Show Not Completed
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={handleModalOpen}
          variant="contained"
          sx={{ backgroundColor: "#4CAF50", color: "#fff" }}
        >
          Create Task
        </Button>
      </Stack>
    </Stack>
  );
};
