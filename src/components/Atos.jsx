import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import DeleteDialog from "../Actions/DeleteDialog";
import UpdateDialog from "../Actions/UpdateDialog"; // Adjust the path as needed
import AtoBarChart from "./Scenes/AtoBarChart";

const ATOs = () => {
  const {
    atos,
    isLoading,
    deleteATO,
    adminToken,
    refreshData,
    fetchOneATO,
    updateATO,
  } = useContext(Context);
  const theme = useTheme();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deletedAto, setDeletedAto] = useState(null);
  const [selectedAto, setSelectedAto] = useState(null);
  console.log(selectedAto);

  const handleClickOpenDelete = (id) => {
    setDeletedAto(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeletedAto(null);
  };

  const handleConfirmDelete = async (id) => {
    await deleteATO(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    const ato = await fetchOneATO(id);
    setSelectedAto(ato);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedAto(null);
  };

  const handleupdateATO = async (values) => {
    await updateATO(selectedAto?._id, values);
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
    { field: "user", headerName: "User", width: 150 },
    { field: "password", headerName: "Password", width: 150 },
    { field: "url", headerName: "Url", width: 150 },
    { field: "source", headerName: "Source", width: 150 },
    { field: "bu", headerName: "Bu", width: 150 },
    { field: "mitigationSteps", headerName: "Mitigation Steps", width: 300 },
    adminToken
      ? {
          field: "delete",
          headerName: "Delete",
          width: 150,
          renderCell: (params) => (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleClickOpenDelete(params?.id)}
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
    <Box m="1.5rem 2.5rem" textAlign={"center"}>
      <Header title={"ATOs"} mb="2rem"/>
      <br />
      {/* <Typography variant="h4">Number of ATOs: {atos?.length}</Typography> */}
      <AtoBarChart />
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
          rows={atos || []}
          loading={isLoading || !atos}
          getRowId={(row) => row?._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      <DeleteDialog
        open={openDelete}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        item={deletedAto}
      />

      <UpdateDialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        item={selectedAto}
        onConfirm={handleupdateATO}
      />
    </Box>
  );
};

export default ATOs;
