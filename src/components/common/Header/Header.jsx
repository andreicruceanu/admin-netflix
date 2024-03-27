import { Box, Typography } from "@mui/material";

const Header = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography
        variant="h4"
        color="black"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body" sx={{ opacity: 0.8 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default Header;
