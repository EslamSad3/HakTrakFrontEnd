import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import DeleteDialog from "../../Actions/DeleteDialog";
import UpdateDialog from "../../Actions/UpdateDialog"; // Adjust the path as needed

const AptFeeds = () => {
  const {
    aptFeeds,
    isLoading,
    deleteAptFeed,
    adminToken,
    refreshData,
    fetchOneAptFeed,
    updateAptFeed,
  } = useContext(Context);
  const theme = useTheme();



  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedAptFeed, setSelectedAptFeed] = useState({});

  const handleClickOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    await deleteAptFeed(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    const aptFeed = await fetchOneAptFeed(id);
    setSelectedAptFeed(aptFeed);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedAptFeed(null);
  };

  const handleUpdateAptFeed = async (values) => {
    await updateAptFeed(selectedAptFeed._id, values);
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
    { field: "aptGroupName", headerName: "Apt Group Name", width: 150 },
    { field: "threatType", headerName: "Threat Type", width: 150 },
    { field: "ttps", headerName: "TTPs", width: 150 },
    { field: "targetSectors", headerName: "Target Sectors", width: 150 },
    { field: "geographicFocus", headerName: "Geographic Focus", width: 150 },
    { field: "iocs", headerName: "IOCs", width: 150 },
    { field: "source", headerName: "Source", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
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
      <Header title={"AptFeedS"} subtitle={"List of AptFeedS"} />
      <Typography variant="h4">
        Number of AptFeeds: {aptFeeds?.length}
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
          rows={aptFeeds || []}
          loading={isLoading || !aptFeeds}
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
        item={selectedAptFeed}
        onConfirm={handleUpdateAptFeed}
      />
    </Box>
  );
};

export default AptFeeds;
