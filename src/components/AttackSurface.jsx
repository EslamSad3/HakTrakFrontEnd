import { Box, Button, useTheme } from "@mui/material";
import Header from "./Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import DeleteDialog from "../Actions/DeleteDialog";
import UpdateDialog from "../Actions/UpdateDialog"; // Adjust the path as needed
import AttackSurfaceBarChart from "./Scenes/AttackSurfaceBarChart";
import { useNavigate } from "react-router-dom";

const AttackSurface = () => {
  const {
    attackSurfaces,
    isLoading,
    deleteAttckSurface,
    adminToken,
    refreshData,
    fetchOneAttckSurface,
    updateAttckSurface,
  } = useContext(Context);
  const theme = useTheme();
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deletedAttack, setDeletedAttack] = useState(null);
  const [selectedAttack, setSelectedAttack] = useState(null);

  const handleClickOpenDelete = (id) => {
    setDeletedAttack(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeletedAttack(null);
  };

  const handleConfirmDelete = async (id) => {
    await deleteAttckSurface(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    const attack = await fetchOneAttckSurface(id);
    setSelectedAttack(attack);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedAttack(null);
  };

  const handleupdateAttckSurface = async (values) => {
    await updateAttckSurface(selectedAttack?._id, values);
    refreshData();
    handleCloseUpdate();
  };

  useEffect(() => {
    refreshData();
  }, []);

  const transformedData = attackSurfaces?.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    { field: "affectedSystems", headerName: "Affected Systems", width: 150 },
    {
      field: "openPorts",
      headerName: "Open Ports",
      width: 150,
      valueGetter: (params) => params.join(", "),
    },
    { field: "services", headerName: "Services", width: 150 },
    { field: "mitigationSteps", headerName: "Mitigation Steps", width: 300 },
    {
      field: "screenshot",
      headerName: "Screenshot",
      width: 150,
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
    ,
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate(`/attack-surface/${params.id}`)}
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
    <Box m="1.5rem 2.5rem" textAlign={"center"}>
      <Header title={"Attack Surface"} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: "20px",
        }}
      >
        <AttackSurfaceBarChart attackSurfaces={attackSurfaces} />
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
        item={deletedAttack}
      />

      <UpdateDialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        item={selectedAttack}
        onConfirm={handleupdateAttckSurface}
      />
    </Box>
  );
};

export default AttackSurface;
