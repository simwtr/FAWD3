import { Stack } from "@mui/system";
import React from "react";
import { Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: "8px",
        position: "fixed",
        bottom: 0,
        width: "50%",
        height: "70px",
        backgroundColor: "#2196F3",
        color: "#fff",
        borderTop: "1px solid #ccc",
      }}
    >
      <Typography variant="body2">
        Made with ❤️ by Nancy - {new Date().getFullYear()}
      </Typography>
    </Stack>
  );
};
