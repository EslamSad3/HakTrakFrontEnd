import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "./Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import DeleteDialog from "../Actions/DeleteDialog";
import UpdateDialog from "../Actions/UpdateDialog"; // Adjust the path as needed
import VulnsPieChart from "./Scenes/VulnsPieChart";
import { useNavigate } from "react-router-dom";

const VulnerabilitiesIntelligences = () => {
  const {
    vulnerabilitiesIntelligences,
    isLoading,
    deleteVulnerabilitiesIntelligence,
    adminToken,
    refreshData,
    fetchOneVulnerabilitiesIntelligence,
    updateVulnerabilitiesIntelligence,
  } = useContext(Context);
  const theme = useTheme();
  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [
    deletedVulnerabilitiesIntelligence,
    setDeletedVulnerabilitiesIntelligence,
  ] = useState(null);
  const [
    selectedVulnerabilitiesIntelligence,
    setSelectedVulnerabilitiesIntelligence,
  ] = useState(null);

  const handleClickOpenDelete = (id) => {
    setDeletedVulnerabilitiesIntelligence(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setDeletedVulnerabilitiesIntelligence(null);
  };

  const handleConfirmDelete = async (id) => {
    await deleteVulnerabilitiesIntelligence(id);
    refreshData();
    handleCloseDelete();
  };

  const handleClickOpenUpdate = async (id) => {
    const VulnerabilitiesIntelligence =
      await fetchOneVulnerabilitiesIntelligence(id);
    setSelectedVulnerabilitiesIntelligence(VulnerabilitiesIntelligence);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedVulnerabilitiesIntelligence(null);
  };

  const handleupdateVulnerabilitiesIntelligence = async (values) => {
    await updateVulnerabilitiesIntelligence(
      selectedVulnerabilitiesIntelligence?._id,
      values
    );
    refreshData();
    handleCloseUpdate();
  };

  useEffect(() => {
    refreshData();
  }, []);

  const transformedData = vulnerabilitiesIntelligences?.map((item, index) => ({
    ...item,
    id: index + 1,
  }));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    { field: "vulnerabilityID", headerName: "Vulnerability ID", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    {
      field: "affectedSystems",
      headerName: "Affected Systems",
      width: 150,
    },
    { field: "severity", headerName: "Severity", width: 150 },
    { field: "impact", headerName: "Impact", width: 150 },
    { field: "cvsScore", headerName: "CVS Score", width: 150 },
    {
      field: "exploitAvailability",
      headerName: "Exploit Availability",
      width: 150,
    },
    {
      field: "patchAvailability",
      headerName: "Patch Availability",
      width: 150,
    },
    {
      field: "vendor",
      headerName: "Vendor",
      width: 150,
    },
    { field: "mitigationSteps", headerName: "Mitigation Steps", width: 300 },
    { field: "status", headerName: "Status", width: 300 },
    { field: "references", headerName: "References", width: 300 },
    ,
    {
      field: "details",
      headerName: "Details",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate(`/vulnerabilities-intelligence/${params.id}`)}
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
    <Box m="1.5rem 2.5rem" textAlign={"center"}>
      <Header title={"Vulnerability Intelligence"} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "20px",
        }}
      >
        <VulnsPieChart vulnerabilities={vulnerabilitiesIntelligences} />
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
        item={deletedVulnerabilitiesIntelligence}
      />
      <UpdateDialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        item={selectedVulnerabilitiesIntelligence}
        onConfirm={handleupdateVulnerabilitiesIntelligence}
      />
    </Box>
  );
};

export default VulnerabilitiesIntelligences;
