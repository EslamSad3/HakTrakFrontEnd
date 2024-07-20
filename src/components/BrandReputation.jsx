import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "./Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import DeleteDialog from "../Actions/DeleteDialog";
import UpdateDialog from "../Actions/UpdateDialog"; // Adjust the path as needed

const BrandReputation = () => {
  const {
    brandReputations,
    isLoading,
    deleteBrandReputation,
    adminToken,
    refreshData,
    fetchOneBrandReputation,
    updateBrandReputation,
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
    await deleteBrandReputation(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    const ato = await fetchOneBrandReputation(id);
    setSelectedAto(ato);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedAto(null);
  };

  const handleupdateBrandReputation = async (values) => {
    await updateBrandReputation(selectedAto?._id, values);
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
    { field: "domainName", headerName: "Domain Name", width: 150 },
    { field: "brandName", headerName: "Brand Name", width: 150 },
    {
      field: "incidentDescription",
      headerName: "Incident Description",
      width: 150,
    },
    { field: "status", headerName: "Status", width: 150 },
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
    <Box m="1.5rem 2.5rem">
      <Header
        title={"Brand Reputation "}
        subtitle={"List of Brand Reputation "}
      />
      <Typography variant="h4">
        Number of Brand Reputation : {brandReputations?.length}
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
          rows={brandReputations || []}
          loading={isLoading || !brandReputations}
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
        onConfirm={handleupdateBrandReputation}
      />
    </Box>
  );
};

export default BrandReputation;
