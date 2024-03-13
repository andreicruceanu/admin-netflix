import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/common/Header/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useFetchInfo } from "../../hooks/useFetchInfo";
import StatBox from "../../components/common/StatBox/StatBox";

const Dashboard = () => {
  const { info, onRequestInfo, error } = useFetchInfo();

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: "blue",
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

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
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
      </Box>
    </Box>
  );
};

export default Dashboard;
