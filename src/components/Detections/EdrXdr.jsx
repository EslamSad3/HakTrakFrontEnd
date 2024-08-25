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
import ExdrPieChart from "../Scenes/ExdrPieChart";
import { useNavigate } from "react-router-dom";

const EdrXdr = () => {
  const {
    edrXdrs,
    isLoading,
    deleteEdrXdr,
    adminToken,
    refreshData,
    fetchOneEdrXdr,
    updateEdrXdr,
  } = useContext(Context);
  const theme = useTheme();
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectededrXdrs, setSelectededrXdrs] = useState(null);
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
    await deleteEdrXdr(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    setSelectedUpdateId(id); // Store the ID to be updated
    setIsFetching(true);
    const edrXdr = await fetchOneEdrXdr(id);
    setSelectededrXdrs(edrXdr);
    setIsFetching(false);
    setOpenUpdate(true); // Open update dialog
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectededrXdrs(null);
    setSelectedUpdateId(null); // Clear selected ID after update dialog closes
  };

  const handleStatusChange = async (event, id) => {
    const newStatus = event.target.value;

    // Find the EDR/XDR that needs to be updated
    const updatedEdrXdrs = selectededrXdrs
      ? selectededrXdrs.map((edrXdr) => {
          if (edrXdr._id === id) {
            return { ...edrXdr, status: newStatus };
          }
          return edrXdr;
        })
      : null;

    setSelectededrXdrs(updatedEdrXdrs);

    // Update the EDR/XDR status in the backend
    await updateEdrXdr(id, { status: newStatus });
    refreshData();
  };

  const handleupdateEdrXdr = async (values) => {
    await updateEdrXdr(selectededrXdrs._id, values);
    refreshData();
    handleCloseUpdate();
  };

  useEffect(() => {
    refreshData();
  }, []);

  const transformedData = edrXdrs?.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    { field: "user", headerName: "User", width: 150 },
    { field: "detectionTime", headerName: "Detection Time", width: 150 },
    { field: "alertID", headerName: "Alert ID", width: 150 },
    { field: "threatType", headerName: "Threat Type", width: 150 },
    { field: "severity", headerName: "Severity", width: 150 },
    { field: "bu", headerName: "BU", width: 150 },
    { field: "device", headerName: "Device", width: 150 },
    { field: "filePath", headerName: "File Path", width: 150 },
    { field: "actionTaken", headerName: "Action Taken", width: 150 },
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
          <MenuItem value="investigating">Investigating</MenuItem>
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
          onClick={() => navigate(`/detections/edrxdr-detection/${params.id}`)}
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
      <Header title={"EDR XDR Detection"} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "20px",
        }}
      >
        <ExdrPieChart edrXdrs={edrXdrs} />
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
        item={selectededrXdrs}
        onConfirm={handleupdateEdrXdr}
      />
    </Box>
  );
};

export default EdrXdr;
