import { Box, Typography } from "@mui/material";
import { iconsInfoDashboard } from "../../../utils/functions";
import TrendingDown from "../../../assets/Dashboard/TrendingDown.svg";
import TrendingUp from "../../../assets/Dashboard/TrendingUp.svg";

const showIconTrending = (value) =>
  value > 0 ? (
    <Box display="flex" alignItems="center">
      <img src={TrendingUp} alt="TrendingUp" />
      <Typography ml={1} color="#00B69B">{`${value} %`}</Typography>
      <Typography component="span" fontSize={13} ml={1}>
        Up from yesterday
      </Typography>
    </Box>
  ) : (
    <Box display="flex" alignItems="center">
      <img src={TrendingDown} alt="TrendingDown" />
      <Typography ml={1} color="#F93C65">{`${value} %`}</Typography>
      <Typography component="span" fontSize={13} ml={1}>
        Down from yesterday
      </Typography>
    </Box>
  );

const StatBox = ({ title, value, trending, state }) => {
  return (
    <Box
      gridColumn="span 3"
      backgroundColor="white"
      borderRadius="8px"
      padding={2}
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography component="span">{title}</Typography>
            <Typography
              color="#202224"
              fontSize={38}
              fontWeight={600}
              component="h5"
            >
              {value}
            </Typography>
          </Box>
          {iconsInfoDashboard(state)}
        </Box>
        <Box>{showIconTrending(trending)}</Box>
      </Box>
    </Box>
  );
};

export default StatBox;
