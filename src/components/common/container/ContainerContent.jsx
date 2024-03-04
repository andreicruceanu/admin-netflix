import { Box, Typography } from "@mui/material";

const ContainerContent = ({ title, children }) => {
  return (
    <Box padding={4}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
        {title}
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          width: "100%",
          padding: "40px 0",
          minHeight: "640px",
          border: "0.3px solid #B9B9B9",
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ContainerContent;
