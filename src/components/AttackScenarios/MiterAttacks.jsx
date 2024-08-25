import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import DeleteDialog from "../../Actions/DeleteDialog";
import UpdateDialog from "../../Actions/UpdateDialog"; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import MitreAttacksBarChart from "../Scenes/MitreAttacksBarChart";

const MitreAttacks = () => {
  const {
    allMitreAttacks,
    isLoading,
    deleteMitreAttacks,
    adminToken,
    refreshData,
    fetchOneMitreAttacks,
    updateMitreAttacks,
  } = useContext(Context);
  const theme = useTheme();
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedMitreAttacks, setSelectedMitreAttacks] = useState(null);

  const handleClickOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    await deleteMitreAttacks(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    const oneMiterAttack = await fetchOneMitreAttacks(id);
    setSelectedMitreAttacks(oneMiterAttack);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedMitreAttacks(null);
  };

  const handleupdateMitreAttacks = async (values) => {
    await updateMitreAttacks(selectedMitreAttacks._id, values);
    refreshData();
    handleCloseUpdate();
  };
  const transformedData = allMitreAttacks?.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  useEffect(() => {
    refreshData();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      valueGetter: (params) => {
        return params;
      },
    },
    { field: "incidentId", headerName: "Incident Id" },
    { field: "tactic", headerName: "Tactic" },
    { field: "technique", headerName: "Technique" },
    { field: "description", headerName: "Description" },
    { field: "ipAddress", headerName: "Ip Address" },
    { field: "user", headerName: "User" },
    { field: "device", headerName: "Device" },
    { field: "businessUnit", headerName: "Business Unit" },
    { field: "timestamp", headerName: "Time Stamp" },
    { field: "severity", headerName: "Severity" },
    { field: "status", headerName: "Status" },
    ,
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="info"
          onClick={() =>
            navigate(`/attack-secnarios/mitre-attacks/${params.id}`)
          }
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
      <Header title={"Miter Attacks"} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MitreAttacksBarChart />
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
        item={deleteId}
      />
      <UpdateDialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        item={selectedMitreAttacks}
        onConfirm={handleupdateMitreAttacks}
      />
    </Box>
  );
};

export default MitreAttacks;
