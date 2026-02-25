"use client";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  IconButton,
  Stack,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const InlineAddTask = ({ columnId, onAdd, isLoading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (title.trim()) {
      onAdd({ title: title.trim(), column: columnId, description: "" });
      setTitle("");
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <Button
        fullWidth
        startIcon={<AddIcon />}
        onClick={() => setIsEditing(true)}
        sx={{
          justifyContent: "center",
          color: "#444",
          textTransform: "none",
          fontWeight: 600,
          border: "1px dashed #8080803d",
          borderRadius: 1,
          py: 1,
          "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
        }}
      >
        Add a card
      </Button>
    );
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Paper
        elevation={0}
        sx={{ p: 1, mb: 1, borderRadius: 1, border: "1px solid #ddd" }}
      >
        <TextField
          fullWidth
          multiline
          placeholder="Enter a title for this card..."
          variant="standard"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{ disableUnderline: true }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAdd();
            }
          }}
          sx={{ fontSize: "0.9rem" }}
        />
      </Paper>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="contained"
          size="small"
          onClick={handleAdd}
          disabled={isLoading}
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          {isLoading ? "Adding..." : "Add card"}
        </Button>
        <IconButton size="small" onClick={() => setIsEditing(false)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default InlineAddTask;
