import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import DeleteDialog from "../../Actions/DeleteDialog";
import UpdateDialog from "../../Actions/UpdateDialog"; // Adjust the path as needed
import LeakedCreBarChart from "../Scenes/LeakedCreBarChart";

const LeakedCredentials = () => {
  const {
    leakedCredentials,
    isLoading,
    deleteLeakedCredentials,
    adminToken,
    refreshData,
    fetchOneLeakedCredentials,
    updateLeakedCredentials,
  } = useContext(Context);
  const theme = useTheme();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedleakedCredentials, setSelectedleakedCredentials] =
    useState(null);

  const handleClickOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    await deleteLeakedCredentials(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    const leakedCredentials = await fetchOneLeakedCredentials(id);
    setSelectedleakedCredentials(leakedCredentials);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedleakedCredentials(null);
  };

  const handleupdateLeakedCredentials = async (values) => {
    await updateLeakedCredentials(selectedleakedCredentials._id, values);
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
    { field: "user", headerName: "User", width: 150 },
    { field: "password", headerName: "Password", width: 150 },
    { field: "bu", headerName: "BU", width: 150 },
    { field: "leakDate", headerName: "Leak Date", width: 200 },
    { field: "source", headerName: "Source", width: 150 },
    { field: "mitigationSteps", headerName: "Mitigation Steps", width: 150 },
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
    <Box m="1.5rem 2.5rem" textAlign={"center"}>
      <Header title={"Leaked Credential"} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LeakedCreBarChart />
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
          rows={leakedCredentials || []}
          loading={isLoading || !leakedCredentials}
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
        item={selectedleakedCredentials}
        onConfirm={handleupdateLeakedCredentials}
      />
    </Box>
  );
};

export default LeakedCredentials;
