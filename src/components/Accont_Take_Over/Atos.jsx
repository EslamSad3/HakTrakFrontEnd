import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import DeleteDialog from "../../Actions/DeleteDialog";
import UpdateDialog from "../../Actions/UpdateDialog"; // Adjust the path as needed
import AtoBarChart from "../Scenes/AtoBarChart";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deletedAto, setDeletedAto] = useState(null);
  const [selectedAto, setSelectedAto] = useState(null);

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

  const transformedData = atos?.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    { field: "user", headerName: "User" },
    { field: "password", headerName: "Password" },
    { field: "url", headerName: "URL" },
    { field: "source", headerName: "Source" },
    { field: "bu", headerName: "BU" },
    { field: "mitigationSteps", headerName: "Mitigation Steps" },
    ,
    {
      field: "details",
      headerName: "Details",

      renderCell: (params) => (
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate(`/account-take-over/${params.id}`)}
        >
          Details
        </Button>
      ),
    },
    {
      field: "screenshot",
      headerName: "Screenshot",

      renderCell: (params) => (
        <Button variant="contained" color="info">
          <a
            href={params.row.screenshot}
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        </Button>
      ),
    },
    adminToken
      ? {
          field: "delete",
          headerName: "Delete",
          width: 100,
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
          width: 100,
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
    <Box m="1.5rem 2.5rem" textAlign={"center"}>
      <Header title={"ATOs"} mb="2rem" />
      <br />
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
