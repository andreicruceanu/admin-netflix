import {
  Box,
  Button,
  Typography,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
import Header from "../../components/common/Header/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useFetchInfo } from "../../hooks/useFetchInfo";
import StatBox from "../../components/common/StatBox/StatBox";
import LineChart from "../../components/common/LineChart/LineChart";
import { releaseYear } from "../../utils/functions";
const Dashboard = () => {
  const { info, onRequestInfo, recentBooksCreated } = useFetchInfo();

  if (onRequestInfo) {
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: "#4880FF",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {info?.length > 0 &&
          info.map((el) => (
            <StatBox
              key={el.state}
              title={el.title}
              value={el.value}
              trending={el.trending}
              state={el.state}
            />
          ))}
        {/* ROW 2 */}
        <Box gridColumn="span 7" gridRow="span 2" backgroundColor="white">
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5" fontWeight="600">
                Grapghip App
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon sx={{ fontSize: "26px" }} />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          overflow="auto"
          backgroundColor="white"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid #F5F6FA`}
            p="15px"
          >
            <Typography variant="h6" fontWeight="600">
              Recent Books Created
            </Typography>
          </Box>
          {recentBooksCreated.map((book) => (
            <Box
              key={book?._id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid #F5F6FA`}
              p="15px"
            >
              <Box>
                <img src={book.poster_path} alt={book.title} width="100px" />
              </Box>
              <Box>
                <Typography textAlign="center" variant="h6" fontWeight={700}>
                  {book.title}
                </Typography>
                <Typography textAlign="center" variant="body2">
                  ({releaseYear(book.release_date)})
                </Typography>
              </Box>
              <Chip
                p="5px 10px"
                color="primary"
                borderRadius="4px"
                label={book.state_movie}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
