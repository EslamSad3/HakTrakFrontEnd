import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import DeleteDialog from "../../Actions/DeleteDialog";
import UpdateDialog from "../../Actions/UpdateDialog"; // Adjust the path as needed
import ConfirmUpdateDialog from "../../Actions/ConfirmUpdateDialog"; // Import the confirmation dialog

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

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openConfirmUpdate, setOpenConfirmUpdate] = useState(false); // State for confirmation dialog
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

  const handleClickOpenUpdate = (id) => {
    setSelectedUpdateId(id); // Store the ID to be updated
    setOpenConfirmUpdate(true); // Open confirmation dialog
  };

  const handleConfirmUpdate = async (id) => {
    setIsFetching(true);
    const ndr = await fetchOneNdr(id);
    setSelectedndrs(ndr);
    setIsFetching(false);
    setOpenConfirmUpdate(false); // Close confirmation dialog
    setOpenUpdate(true); // Open update dialog
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedndrs(null);
    setSelectedUpdateId(null); // Clear selected ID after update dialog closes
  };

  const handleupdateNdr = async (values) => {
    await updateNdr(selectedndrs._id, values);
    refreshData();
    handleCloseUpdate();
  };

  useEffect(() => {
    refreshData();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      valueGetter: (params) => {
        return params.api.getRowIndex(params.id) + 1;
      },
    },
    { field: "severity", headerName: "Severity", width: 150 },
    { field: "detectionTime", headerName: "Detection Time", width: 150 },
    { field: "alertID", headerName: "Alert ID", width: 150 },
    { field: "threatType", headerName: "Threat Type", width: 150 },
    { field: "bu", headerName: "Bu", width: 150 },
    { field: "sourceIP", headerName: "Source IP", width: 150 },
    { field: "sourcePort", headerName: "Source Port", width: 150 },
    { field: "destinationIP", headerName: "Destination IP", width: 150 },
    { field: "destinationPort", headerName: "Destination Port", width: 150 },
    { field: "actionTaken", headerName: "Action Taken", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "mitigationSteps", headerName: "Mitigation Steps", width: 250 },
    adminToken
      ? {
          field: "delete",
          headerName: "Delete",
          width: 150,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleClickOpenDelete(params.id)}
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
              onClick={() => handleClickOpenUpdate(params?.id)}
            >
              Update
            </Button>
          ),
        }
      : null,
  ].filter(Boolean); // Filter out null values

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"NDRs Detections"} subtitle={"List of NDRs Detections"} />
      <Typography variant="h4">
        Number of NDRs Detections: {ndrs?.length}
      </Typography>
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
        }}
      >
        <DataGrid
          rows={ndrs || []}
          loading={isLoading || !ndrs}
          getRowId={(row) => row?._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <DeleteDialog
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        item={deleteId}
      />

      <ConfirmUpdateDialog
        open={openConfirmUpdate}
        onClose={() => setOpenConfirmUpdate(false)}
        onConfirm={handleConfirmUpdate}
        itemId={selectedUpdateId} // Pass the selected ID to the confirmation dialog
      />

      <UpdateDialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        item={selectedndrs}
        onConfirm={handleupdateNdr}
      />
    </Box>
  );
};

export default Ndr;
