import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useContext, useEffect } from "react";
import { Context } from "../../context";
import { Link } from "react-router-dom";

const IPs = () => {
  const { ips, isLoading, deleteIp, fetchAllIps, refreshData } =
    useContext(Context);
  const theme = useTheme();

  useEffect(() => {
    refreshData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "value", headerName: "Value", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={async () => {
            await deleteIp(params.id);
            refreshData();
          }}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "update",
      headerName: "Update",
      width: 150,
      renderCell: (params) => (
        <Link to={`/assets/ips/${params.id}/edit`}>
          <Button variant="contained" color="primary">
            Update
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={"IPS"} subtitle={"List of IPS"} />
      <Typography variant="h4">Number of IPS: {ips.length}</Typography>
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
          rows={ips || []}
          loading={isLoading || !ips}
          getRowId={(row) => row._id}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default IPs;
