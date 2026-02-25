"use client";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useBoardData } from "../hooks/useBoardData";
import InlineAddTask from "./AddTask";
import EditTaskModal from "./EditTaskModal";
import TaskCard from "./TaskCard";

const KanbanBoard = () => {
  const {
    tasks,
    categories,
    tasksLoading,
    categoriesLoading,
    addTask,
    updateTask,
    deleteTask,
  } = useBoardData();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEditRequest = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  if (tasksLoading || categoriesLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 4,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          mb: 4,
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", md: "2.125rem" },
          }}
        >
          Kanban Board
        </Typography>
        <TextField
          placeholder="Search tasks..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            bgcolor: "white",
            borderRadius: 1,

            width: { xs: "100%", sm: 300 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          gap: 3,
          px: 2,
          pb: 3,
          flexGrow: 1,
          alignItems: "flex-start",
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced4da",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            borderRadius: "10px",
          },
        }}
      >
        {categories.map((col) => (
          <Box
            key={col.id}
            sx={{
              minWidth: { xs: 300, sm: 350 },
              maxWidth: { xs: 300, sm: 350 },
              mr: { xs: 1, sm: 0 },
              height: "100%",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "#ebecf0",
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                maxHeight: "calc(100vh - 200px)",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, fontWeight: 700, px: 0.5 }}
              >
                {col.title}
              </Typography>

              <Box
                sx={{
                  overflowY: "auto",
                  pr: 0.5,
                  mb: 1,
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#ced4da",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {tasks
                  .filter((t) => String(t.column) === String(col.id))
                  .filter(
                    (t) =>
                      t.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      t.description
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase()),
                  )
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditRequest}
                    />
                  ))}
              </Box>

              <InlineAddTask
                columnId={col.id}
                onAdd={(data) => addTask.mutate(data)}
                isLoading={addTask.isLoading}
              />
            </Paper>
          </Box>
        ))}
      </Box>

      <EditTaskModal
        open={isEditModalOpen}
        task={selectedTask}
        categories={categories}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={(id, updates) =>
          updateTask.mutate(
            { id, updates },
            { onSuccess: () => setIsEditModalOpen(false) },
          )
        }
        onDelete={(id) =>
          window.confirm("Delete?") &&
          deleteTask.mutate(id, { onSuccess: () => setIsEditModalOpen(false) })
        }
      />
    </Container>
  );
};

export default KanbanBoard;
