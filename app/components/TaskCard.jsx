import { Paper, Typography, IconButton } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

const TaskCard = ({ task, onEdit }) => {
  return (
    <Paper
      elevation={0}
      onClick={() => onEdit(task)}
      sx={{
        p: 1.5,
        mb: 1.5,
        borderRadius: 1,
        position: "relative",
        cursor: "pointer",
        bgcolor: "white",
        transition: "0.2s",
        border: "1px solid #e2e8f0",
        "&:hover": {
          bgcolor: "#fdfdfd",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{ pr: 3, flexGrow: 1, fontWeight: 600, color: "#172b4d" }}
      >
        {task.title}
      </Typography>

      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(task);
        }}
        sx={{
          position: "absolute",
          right: 4,
          top: 4,
          opacity: 0.6,
          color: "primary.main",
          "&:hover": { opacity: 1 },
        }}
      >
        <EditTwoToneIcon fontSize="small" />
      </IconButton>

      {task.description && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mt: 1,
            lineHeight: 1.4,
          }}
        >
          {task.description}
        </Typography>
      )}
    </Paper>
  );
};

export default TaskCard;
