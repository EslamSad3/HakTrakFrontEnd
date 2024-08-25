import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import DeleteDialog from "../../Actions/DeleteDialog";
import UpdateDialog from "../../Actions/UpdateDialog";
import LeakedCreBarChart from "../Scenes/LeakedCreBarChart";
import { useNavigate } from "react-router-dom";

const LeakedCredentials = () => {
  const {
    leakedCredentials,
    isLoading,
    deleteLeakedCredentials,
    adminToken,
    refreshData,
    fetchOneLeakedCredentials,
    updateLeakedCredentials,
  } = useContext(Context);
  const theme = useTheme();
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedLeakedCredentials, setSelectedLeakedCredentials] =
    useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleClickOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    await deleteLeakedCredentials(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    setIsFetching(true);
    const leakedCredentials = await fetchOneLeakedCredentials(id);
    setSelectedLeakedCredentials(leakedCredentials);
    setIsFetching(false);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedLeakedCredentials(null);
  };

  const handleStatusChange = async (event, id) => {
    const newStatus = event.target.value;

    // Find the leaked credentials that need to be updated
    const updatedLeakedCredentials = selectedLeakedCredentials
      ? { ...selectedLeakedCredentials, status: newStatus }
      : null;

    setSelectedLeakedCredentials(updatedLeakedCredentials);

    // Update the leaked credentials status in the backend
    await updateLeakedCredentials(id, { status: newStatus });
    refreshData();
  };

  const handleUpdateLeakedCredentials = async (values) => {
    await updateLeakedCredentials(selectedLeakedCredentials._id, values);
    refreshData();
    handleCloseUpdate();
  };

    const transformedData = leakedCredentials?.map((item, index) => ({
      ...item,
      id: index + 1,
    }));

  useEffect(() => {
    refreshData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "user", headerName: "User", width: 150 },
    { field: "password", headerName: "Password", width: 150 },
    { field: "bu", headerName: "BU", width: 150 },
    { field: "leakDate", headerName: "Leak Date", width: 200 },
    { field: "source", headerName: "Source", width: 150 },
    { field: "mitigationSteps", headerName: "Mitigation Steps", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Select
          value={params.row.status || ""}
          onChange={(event) => handleStatusChange(event, params.row._id)}
          displayEmpty
          inputProps={{ "aria-label": "Status" }}
        >
          <MenuItem value="" disabled>
            Select Status
          </MenuItem>
          <MenuItem value="unresolved">Unresolved</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
          <MenuItem value="investigating">investigating</MenuItem>
          {/* Add more status options as needed */}
        </Select>
      ),
    },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="info"
          onClick={() =>
            navigate(`/dark-web-monitoring/leaked-credential/${params.id}`)
          }
        >
          Details
        </Button>
      ),
    },
    adminToken
      ? {
          field: "delete",
          headerName: "Delete",
          width: 150,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleClickOpenDelete(params.row._id)}
            >
              Delete
            </Button>
          ),
        }
      : null,
    adminToken
      ? {
          field: "update",
          headerName: "Update",
          width: 150,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClickOpenUpdate(params.row._id)}
            >
              Update
            </Button>
          ),
        }
      : null,
  ].filter(Boolean); // Filter out null values

  return (
    <Box m="1.5rem 2.5rem" textAlign={"center"}>
      <Header title={"Leaked Credentials"} />
      <br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "20px",
        }}
      >
        <LeakedCreBarChart leakedCredentials={leakedCredentials} />
      </Box>
      <Box
        mt="40px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          height: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DataGrid
          sx={{
            height: "80vh",
            width: "70vw",
          }}
          rows={transformedData || []}
          loading={isLoading || !transformedData}
          getRowId={(row) => row._id}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>

      <DeleteDialog
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        item={deleteId}
      />

      <UpdateDialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        item={selectedLeakedCredentials}
        onConfirm={handleUpdateLeakedCredentials}
      />
    </Box>
  );
};

export default LeakedCredentials;
