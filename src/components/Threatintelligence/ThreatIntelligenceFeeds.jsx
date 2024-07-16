import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import DeleteDialog from "../../Actions/DeleteDialog";
import UpdateDialog from "../../Actions/UpdateDialog"; // Adjust the path as needed

const ThreatIntelligenceFeeds = () => {
  const {
    threatIntelligenceFeeds,
    isLoading,
    deletethreatintelligenceFeed,
    adminToken,
    refreshData,
    fetchOnethreatintelligenceFeed,
    updatethreatintelligenceFeed,
  } = useContext(Context);
  const theme = useTheme();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedthreatIntelligenceFeeds, setSelectedthreatIntelligenceFeeds] = useState({});

  const handleClickOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    await deletethreatintelligenceFeed(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    const threatIntelligenceFeeds = await fetchOnethreatintelligenceFeed(id);
    setSelectedthreatIntelligenceFeeds(threatIntelligenceFeeds);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedthreatIntelligenceFeeds(null);
  };

  const handleupdatethreatintelligenceFeed = async (values) => {
    await updatethreatintelligenceFeed(selectedthreatIntelligenceFeeds._id, values);
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
    { field: "threatType", headerName: "Threat Type", width: 150 },
    { field: "severity", headerName: "Severity", width: 150 },
    { field: "source", headerName: "Source", width: 150 },
    { field: "description", headerName: "description", width: 300 },
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
              onClick={() => handleClickOpenUpdate(params.id)}
            >
              Update
            </Button>
          ),
        }
      : null,
  ].filter(Boolean); // Filter out null values

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"threatIntelligenceFeeds"} subtitle={"List of threatIntelligenceFeeds"} />
      <Typography variant="h4">
        Number of threatIntelligenceFeeds: {threatIntelligenceFeeds?.length}
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
          rows={threatIntelligenceFeeds || []}
          loading={isLoading || !threatIntelligenceFeeds}
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

      <UpdateDialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        item={selectedthreatIntelligenceFeeds}
        onConfirm={handleupdatethreatintelligenceFeed}
      />
    </Box>
  );
};

export default ThreatIntelligenceFeeds;
