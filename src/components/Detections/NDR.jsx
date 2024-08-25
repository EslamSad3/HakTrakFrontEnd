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
import UpdateDialog from "../../Actions/UpdateDialog"; // Adjust the path as needed
import NdrPieChart from "../Scenes/NdrPieChart";
import { useNavigate } from "react-router-dom";

const Ndr = () => {
  const {
    ndrs,
    isLoading,
    deleteNdr,
    adminToken,
    refreshData,
    fetchOneNdr,
    updateNdr,
  } = useContext(Context);
  const theme = useTheme();
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedndrs, setSelectedndrs] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedUpdateId, setSelectedUpdateId] = useState(null); // State to hold selected ID for update

  const handleClickOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    await deleteNdr(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    setSelectedUpdateId(id); // Store the ID to be updated
    setIsFetching(true);
    const ndr = await fetchOneNdr(id);
    setSelectedndrs(ndr);
    setIsFetching(false);
    setOpenUpdate(true); // Open update dialog
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedndrs(null);
    setSelectedUpdateId(null); // Clear selected ID after update dialog closes
  };

  const handleStatusChange = async (event, id) => {
    const newStatus = event.target.value;

    // Find the NDR that needs to be updated
    const updatedNdrs = selectedndrs
      ? selectedndrs.map((ndr) => {
          if (ndr._id === id) {
            return { ...ndr, status: newStatus };
          }
          return ndr;
        })
      : null;

    setSelectedndrs(updatedNdrs);

    // Update the NDR status in the backend
    await updateNdr(id, { status: newStatus });
    refreshData();
  };

  const handleUpdateNdr = async (values) => {
    await updateNdr(selectedndrs._id, values);
    refreshData();
    handleCloseUpdate();
  };

  useEffect(() => {
    refreshData();
  }, []);

  const transformedData = ndrs?.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    { field: "severity", headerName: "Severity", width: 150 },
    { field: "detectionTime", headerName: "Detection Time", width: 150 },
    { field: "alertID", headerName: "Alert ID", width: 150 },
    { field: "threatType", headerName: "Threat Type", width: 150 },
    { field: "bu", headerName: "BU", width: 150 },
    { field: "sourceIP", headerName: "Source IP", width: 150 },
    { field: "sourcePort", headerName: "Source Port", width: 150 },
    { field: "destinationIP", headerName: "Destination IP", width: 150 },
    { field: "destinationPort", headerName: "Destination Port", width: 150 },
    { field: "actionTaken", headerName: "Action Taken", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "mitigationSteps", headerName: "Mitigation Steps", width: 250 },
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
          onClick={() => navigate(`/detections/ndr-detection/${params.id}`)}
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
      <Header title={"NDR Detection"} />
      <br />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "20px",
        }}
      >
        <NdrPieChart ndrs={ndrs} />
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
            height: " 80vh",
            width: " 70vw",
          }}
          rows={transformedData || []}
          loading={isLoading || !transformedData}
          getRowId={(row) => row?._id}
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
        item={selectedndrs}
        onConfirm={handleUpdateNdr} // Correct reference here
      />
    </Box>
  );
};

export default Ndr;
