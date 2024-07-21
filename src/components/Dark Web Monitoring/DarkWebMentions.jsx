import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import DeleteDialog from "../../Actions/DeleteDialog";
import UpdateDialog from "../../Actions/UpdateDialog"; // Adjust the path as needed

const DarkWebMentions = () => {
  const {
    darkWebMentions,
    isLoading,
    deleteDarkWebMention,
    adminToken,
    refreshData,
    fetchOneDarkWebMention,
    updateDarkWebMention,
  } = useContext(Context);
  const theme = useTheme();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selecteddarkWebMentions, setSelecteddarkWebMentions] = useState(null);

  const handleClickOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    await deleteDarkWebMention(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    const darkWebMentions = await fetchOneDarkWebMention(id);
    setSelecteddarkWebMentions(darkWebMentions);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelecteddarkWebMentions(null);
  };

  const handleupdateDarkWebMention = async (values) => {
    await updateDarkWebMention(selecteddarkWebMentions._id, values);
    refreshData();
    handleCloseUpdate();
  };

  useEffect(() => {
    refreshData();
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 90,
      valueGetter: (params) => {
        return params;
      },
    },
    { field: "source", headerName: "Source", width: 150 },
    { field: "mitigationSteps", headerName: "Mitigation Steps", width: 350 },
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
      <Header
        title={"Dark Web Mentions"}
        subtitle={"List of Dark Web Mentions"}
      />
      <Typography variant="h4">
        Number of Dark Web Mentions: {darkWebMentions?.length}
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
          rows={darkWebMentions || []}
          loading={isLoading || !darkWebMentions}
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
        item={selecteddarkWebMentions}
        onConfirm={handleupdateDarkWebMention}
      />
    </Box>
  );
};

export default DarkWebMentions;
