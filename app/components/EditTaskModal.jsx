"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const EditTaskModal = ({
  open,
  onClose,
  task,
  categories,
  onUpdate,
  onDelete,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    column: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        column: task.column || "",
      });
    }
  }, [task, open]);

  const handleSave = () => {
    onUpdate(task.id, formData);
  };

  if (!task) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      sx={{ backgroundColor: "#dddddd7a" }}
    >
      <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>Task Details</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <TextField
            select
            label="Move to Column"
            value={formData.column}
            onChange={(e) =>
              setFormData({ ...formData, column: e.target.value })
            }
          >
            {categories.map((col) => (
              <MenuItem key={col.id} value={col.id}>
                {col.title}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => onDelete(task.id)}
          sx={{ textTransform: "none" }}
        >
          Delete
        </Button>

        <Stack direction="row" spacing={1}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} disableElevation>
            Save Changes
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
