import { Chip } from "@mui/material";
import { statusMovieColor } from "../../../utils/functions";

const StatusMovieChip = ({ value }) => {
  const { label, bg } = statusMovieColor(value);

  return (
    label && (
      <Chip
        label={label}
        sx={{
          backgroundColor: `${bg}33`,
          color: bg,
          borderRadius: "4px",
          fontWeight: "bold",
          minWidth: "115px",
        }}
      />
    )
  );
};

export default StatusMovieChip;
