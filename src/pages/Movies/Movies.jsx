import { Avatar, Box, Chip, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchAllMovies } from "../../hooks/useFetchAllMovies";
import { showToast } from "../../utils/functions";
import moment from "moment";
import NoImgIcon from "../../assets/images/no-image-icon.png";
import MoviesActions from "./MoviesActions";

const Movies = () => {
  const { movies, error, onRequest } = useFetchAllMovies();

  const [allMovies, setAllMovies] = useState(movies);

  useEffect(() => {
    setAllMovies(movies);
  }, [movies]);

  console.log(allMovies);

  const columns = [
    {
      field: "poster_path",
      headerName: "Poster",
      width: 100,
      renderCell: (params) => (
        <img
          width="70px"
          height="40px"
          src={params.row?.poster_path || NoImgIcon}
          variant="rounded"
          alt={params.row?.title}
        />
      ),
      sortable: false,
      filterable: false,
    },
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "overview",
      headerName: "Overview",
      flex: 1,
    },
    {
      field: "tagline",
      headerName: "Tagline",
      flex: 1,
    },
    {
      field: "stateMovie",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip label={params.row?.state_movie} variant="rounded" />
      ),
    },
    {
      field: "admin_created",
      headerName: "Created by",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <MoviesActions {...{ params }} setAllMovies={setAllMovies} />
      ),
    },
  ];

  if (onRequest) {
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

  if (error) {
    showToast(error.message, "error");
  }

  return (
    allMovies && (
      <Box m="20px">
        <Header
          title="Movies"
          subtitle="List of Contacts for Future Reference"
        />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "1px solid D5D5D5 !important",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#FCFDFD",
              border: "1px solid D5D5D5 !important",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#fff",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#FCFDFD",
              border: "1px solid D5D5D5 !important",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: `600 !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `violet !important`,
            },
          }}
        >
          <DataGrid columns={columns} rows={allMovies} />
        </Box>
      </Box>
    )
  );
};

export default Movies;
