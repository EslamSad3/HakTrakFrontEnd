import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import DeleteDialog from "../../Actions/DeleteDialog";
import UpdateDialog from "../../Actions/UpdateDialog"; // Adjust the path as needed

const Iocs = () => {
  const {
    iocs,
    isLoading,
    deleteIoc,
    adminToken,
    refreshData,
    fetchOneIoc,
    updateIoc,
  } = useContext(Context);
  const theme = useTheme();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deletedIoc, setDeletedIoc] = useState(null);
  const [selectedIoc, setSelectedIoc] = useState(null);

  const handleClickOpenDelete = (id) => {
    setDeletedIoc(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeletedIoc(null);
  };

  const handleConfirmDelete = async (id) => {
    await deleteIoc(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    const Ioc = await fetchOneIoc(id);
    setSelectedIoc(Ioc);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedIoc(null);
  };

  const handleUpdateIoc = async (values) => {
    await updateIoc(selectedIoc?._id, values);
    refreshData();
    handleCloseUpdate();
  };

  useEffect(() => {
    refreshData();
  }, []);

  const transformedData = iocs?.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    { field: "iOCType", headerName: "IOC Type", width: 150 },
    { field: "indicatorValue", headerName: "Indicator Value", width: 150 },
    { field: "threatType", headerName: "Threat Type", width: 150 },
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
      <Header title={"IOCs"} subtitle={"List of IOCs"} />
      <Typography variant="h4">Number of IOCs: {iocs?.length}</Typography>
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
        item={deletedIoc}
      />

      <UpdateDialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        item={selectedIoc}
        onConfirm={handleUpdateIoc}
      />
    </Box>
  );
};

export default Iocs;
