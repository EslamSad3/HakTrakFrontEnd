import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "./Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import DeleteDialog from "../Actions/DeleteDialog";
import UpdateDialog from "../Actions/UpdateDialog"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deletedBrand, setDeletedBrand] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  console.log(selectedBrand);

  const handleClickOpenDelete = (id) => {
    setDeletedBrand(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeletedBrand(null);
  };

  const handleConfirmDelete = async (id) => {
    await deleteBrandReputation(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    const brand = await fetchOneBrandReputation(id);
    setSelectedBrand(brand);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedBrand(null);
  };

  const handleupdateBrandReputation = async (values) => {
    await updateBrandReputation(selectedBrand?._id, values);
    refreshData();
    handleCloseUpdate();
  };

  useEffect(() => {
    refreshData();
  }, []);

  const transformedData = brandReputations?.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
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
    ,
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate(`/brand-reputation/${params.id}`)}
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
        Number of Brand Reputation : {transformedData?.length}
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
        item={deletedBrand}
      />

      <UpdateDialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        item={selectedBrand}
        onConfirm={handleupdateBrandReputation}
      />
    </Box>
  );
};

export default BrandReputation;
