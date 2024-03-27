import { Box, Avatar, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useFetchAllUsers } from "../../hooks/useFetchAllUsers";
import { showToast } from "../../utils/functions";
import Header from "../../components/common/Header/Header";
import moment from "moment";
import UsersAppActions from "./UsersAppActions";

const UsersApp = () => {
  const { users, onRequestInfo, error } = useFetchAllUsers();

  const [allUsers, setAllUsers] = useState(users);

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "profilePicture",
      headerName: "Avatar",
      renderCell: (params) => <Avatar src={params.row.profilePicture} />,
    },
    { field: "firstName", headerName: "First Name", flex: 1 },
    {
      field: "lastName",
      headerName: "LastName",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Account Creation Date",
      width: 200,
      renderCell: (params) =>
        moment(params.row.createdAt).format("YYYY-MM-DD HH:MM:SS"),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <UsersAppActions {...{ params }} setAllUsers={setAllUsers} />
      ),
    },
  ];

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

  if (error) {
    showToast(error.message, "error");
  }

  return (
    allUsers && (
      <Box m="20px">
        <Header title="Users App" />
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
          <DataGrid columns={columns} rows={allUsers} />
        </Box>
      </Box>
    )
  );
};

export default UsersApp;
