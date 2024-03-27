import { Box } from "@mui/material";

const ContainerAuth = ({ children, img, widthImg }) => {
  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          position: "absolute",
          right: 0,
          height: "100%",
          width: `${widthImg}%`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${img})`,
          backgroundColor: "#f4f4f4",
        }}
      />

      {children}
    </Box>
  );
};

export default ContainerAuth;
