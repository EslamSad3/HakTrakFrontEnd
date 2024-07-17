import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  Alert,
  AlertTitle,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const UpdateDialog = ({ open, onClose, item, onConfirm }) => {
  console.log(item, "item");

  const formik = useFormik({
    initialValues: {
      value: item?.value || "",
      source: item?.source || "",
      description: item?.description || "",
      aptGroupName: item?.aptGroupName || "",
      threatType: item?.threatType || "",
      location: item?.location || "",
      iOCType: item?.iOCType || "",
      indicatorValue: item?.indicatorValue || "",
      ttps: item?.ttps || "",
      targetSectors: item?.targetSectors || "",
      geographicFocus: item?.geographicFocus || "",
      iocs: item?.iocs || "",
      severity: item?.severity || "",
      mitigationSteps: item?.mitigationSteps || "",
      user: item?.user || "",
      password: item?.password || "",
      bu: item?.bu || "",
      alertID: item?.alertID || "",
      device: item?.device || "",
      filePath: item?.filePath || "",
      destinationIP: item?.destinationIP || "",
      destinationPort: item?.destinationPort || "",
      sourceIP: item?.sourceIP || "",
      sourcePort: item?.sourcePort || "",
      actionTaken: item?.actionTaken || "",
      url: item?.url || "",
      domainName: item?.domainName || "",
      brandName: item?.brandName || "",
      incidentDescription: item?.incidentDescription || "",
      status: item?.status || "",
      leakDate: item?.leakDate ? dayjs(item.leakDate) : null,
      detectionTime: item?.detectionTime ? dayjs(item.detectionTime) : null,
    },
    onSubmit: (values) => {
      onConfirm(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (item) {
      formik.setValues({
        value: item.value || "",
        source: item.source || "",
        description: item.description || "",
        aptGroupName: item.aptGroupName || "",
        threatType: item.threatType || "",
        location: item.location || "",
        iOCType: item.iOCType || "",
        indicatorValue: item.indicatorValue || "",
        ttps: item.ttps || "",
        targetSectors: item.targetSectors || "",
        geographicFocus: item.geographicFocus || "",
        iocs: item.iocs || "",
        severity: item.severity || "",
        mitigationSteps: item.mitigationSteps || "",
        user: item.user || "",
        password: item.password || "",
        bu: item.bu || "",
        alertID: item.alertID || "",
        device: item.device || "",
        filePath: item.filePath || "",
        destinationIP: item.destinationIP || "",
        destinationPort: item.destinationPort || "",
        sourceIP: item.sourceIP || "",
        sourcePort: item.sourcePort || "",
        actionTaken: item.actionTaken || "",
        url: item.url || "",
        domainName: item.domainName || "",
        brandName: item.brandName || "",
        incidentDescription: item.incidentDescription || "",
        status: item.status || "",
        leakDate: item.leakDate ? dayjs(item.leakDate) : null,
        detectionTime: item.detectionTime ? dayjs(item.detectionTime) : null,
      });
    }
  }, [item]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update {item?.value || "item"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} p={3}>
          {/* Common */}
          {item && item?.value && (
            <TextField
              fullWidth
              id="value"
              name="value"
              label="Value"
              value={formik.values.value}
              onChange={formik.handleChange}
              error={formik.touched.value && Boolean(formik.errors.value)}
              helperText={formik.touched.value && formik.errors.value}
              margin="normal"
            />
          )}
          {item && item?.source && (
            <TextField
              fullWidth
              id="source"
              name="source"
              label="Source"
              value={formik.values.source}
              onChange={formik.handleChange}
              error={formik.touched.source && Boolean(formik.errors.source)}
              helperText={formik.touched.source && formik.errors.source}
              margin="normal"
            />
          )}

          {item && item?.url && (
            <TextField
              fullWidth
              id="url"
              name="url"
              label="url"
              value={formik.values.url}
              onChange={formik.handleChange}
              error={formik.touched.url && Boolean(formik.errors.url)}
              helperText={formik.touched.url && formik.errors.url}
              margin="normal"
            />
          )}

          {item && item?.description && (
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              margin="normal"
            />
          )}

          {/* Unique */}
          {item && item?.location && (
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
              margin="normal"
            />
          )}

          {item && item?.iOCType && (
            <Box>
              <InputLabel id="iOCType-label">IOC Type</InputLabel>
              <Select
                labelId="iOCType-label"
                id="iOCType"
                name="iOCType"
                value={formik.values.iOCType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                margin="normal"
              >
                <MenuItem value="hash">hash</MenuItem>
                <MenuItem value="ip">ip</MenuItem>
                <MenuItem value="domain">domain</MenuItem>
                <MenuItem value="url">url</MenuItem>
              </Select>
              {formik.errors.iOCType && formik.touched.iOCType ? (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {formik.errors.iOCType}
                </Alert>
              ) : null}
            </Box>
          )}

          {item && item?.severity && (
            <Box>
              <InputLabel id="severity-label">Severity</InputLabel>
              <Select
                labelId="severity-label"
                id="severity"
                name="severity"
                value={formik.values.severity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                margin="normal"
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="critical">Critical</MenuItem>
              </Select>
              {formik.errors.severity && formik.touched.severity ? (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {formik.errors.severity}
                </Alert>
              ) : null}
            </Box>
          )}

          {item && item?.status && (
            <Box>
              <InputLabel id="status-label">status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                fullWidth
                margin="normal"
              >
                <MenuItem value="taking down">Taking Down</MenuItem>
                <MenuItem value="in progress">In Progress</MenuItem>
                <MenuItem value="false positive">False Positive</MenuItem>
                <MenuItem value="resolving">Resolving</MenuItem>
              </Select>
              {formik.errors.status && formik.touched.status ? (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {formik.errors.status}
                </Alert>
              ) : null}
            </Box>
          )}

          {item && item?.indicatorValue && (
            <TextField
              fullWidth
              id="indicatorValue"
              name="indicatorValue"
              label="Indicator Value"
              value={formik.values.indicatorValue}
              onChange={formik.handleChange}
              error={
                formik.touched.indicatorValue &&
                Boolean(formik.errors.indicatorValue)
              }
              helperText={
                formik.touched.indicatorValue && formik.errors.indicatorValue
              }
              margin="normal"
            />
          )}

          {item && item?.mitigationSteps && (
            <TextField
              fullWidth
              id="mitigationSteps"
              name="mitigationSteps"
              label="Mitigation Steps"
              value={formik.values.mitigationSteps}
              onChange={formik.handleChange}
              error={
                formik.touched.mitigationSteps &&
                Boolean(formik.errors.mitigationSteps)
              }
              helperText={
                formik.touched.mitigationSteps && formik.errors.mitigationSteps
              }
              margin="normal"
            />
          )}

          {item && item?.threatType && (
            <TextField
              fullWidth
              id="threatType"
              name="threatType"
              label="Threat Type"
              value={formik.values.threatType}
              onChange={formik.handleChange}
              error={
                formik.touched.threatType && Boolean(formik.errors.threatType)
              }
              helperText={formik.touched.threatType && formik.errors.threatType}
              margin="normal"
            />
          )}
          {item && item?.aptGroupName && (
            <TextField
              fullWidth
              id="aptGroupName"
              name="aptGroupName"
              label="APT Group Name"
              value={formik.values.aptGroupName}
              onChange={formik.handleChange}
              error={
                formik.touched.aptGroupName &&
                Boolean(formik.errors.aptGroupName)
              }
              helperText={
                formik.touched.aptGroupName && formik.errors.aptGroupName
              }
              margin="normal"
            />
          )}
          {item && item?.ttps && (
            <TextField
              fullWidth
              id="ttps"
              name="ttps"
              label="TTPs"
              value={formik.values.ttps}
              onChange={formik.handleChange}
              error={formik.touched.ttps && Boolean(formik.errors.ttps)}
              helperText={formik.touched.ttps && formik.errors.ttps}
              margin="normal"
            />
          )}
          {item && item?.targetSectors && (
            <TextField
              fullWidth
              id="targetSectors"
              name="targetSectors"
              label="Target Sectors"
              value={formik.values.targetSectors}
              onChange={formik.handleChange}
              error={
                formik.touched.targetSectors &&
                Boolean(formik.errors.targetSectors)
              }
              helperText={
                formik.touched.targetSectors && formik.errors.targetSectors
              }
              margin="normal"
            />
          )}
          {item && item?.geographicFocus && (
            <TextField
              fullWidth
              id="geographicFocus"
              name="geographicFocus"
              label="Geographic Focus"
              value={formik.values.geographicFocus}
              onChange={formik.handleChange}
              error={
                formik.touched.geographicFocus &&
                Boolean(formik.errors.geographicFocus)
              }
              helperText={
                formik.touched.geographicFocus && formik.errors.geographicFocus
              }
              margin="normal"
            />
          )}
          {item && item?.iocs && (
            <TextField
              fullWidth
              id="iocs"
              name="iocs"
              label="IOCs"
              value={formik.values.iocs}
              onChange={formik.handleChange}
              error={formik.touched.iocs && Boolean(formik.errors.iocs)}
              helperText={formik.touched.iocs && formik.errors.iocs}
              margin="normal"
            />
          )}

          {item && item?.user && (
            <TextField
              fullWidth
              id="user"
              name="user"
              label="user"
              value={formik.values.user}
              onChange={formik.handleChange}
              error={formik.touched.user && Boolean(formik.errors.user)}
              helperText={formik.touched.user && formik.errors.user}
              margin="normal"
            />
          )}
          {item && item?.password && (
            <TextField
              fullWidth
              id="password"
              name="password"
              label="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />
          )}
          {item && item?.bu && (
            <TextField
              fullWidth
              id="bu"
              name="bu"
              label="bu"
              value={formik.values.bu}
              onChange={formik.handleChange}
              error={formik.touched.bu && Boolean(formik.errors.bu)}
              helperText={formik.touched.bu && formik.errors.bu}
              margin="normal"
            />
          )}

          {item && item?.alertID && (
            <TextField
              fullWidth
              id="alertID"
              name="alertID"
              label="alertID"
              value={formik.values.alertID}
              onChange={formik.handleChange}
              error={formik.touched.alertID && Boolean(formik.errors.alertID)}
              helperText={formik.touched.alertID && formik.errors.alertID}
              margin="normal"
            />
          )}
          {item && item?.device && (
            <TextField
              fullWidth
              id="device"
              name="device"
              label="device"
              value={formik.values.device}
              onChange={formik.handleChange}
              error={formik.touched.device && Boolean(formik.errors.device)}
              helperText={formik.touched.device && formik.errors.device}
              margin="normal"
            />
          )}
          {item && item?.filePath && (
            <TextField
              fullWidth
              id="filePath"
              name="filePath"
              label="filePath"
              value={formik.values.filePath}
              onChange={formik.handleChange}
              error={formik.touched.filePath && Boolean(formik.errors.filePath)}
              helperText={formik.touched.filePath && formik.errors.filePath}
              margin="normal"
            />
          )}
          {item && item?.actionTaken && (
            <TextField
              fullWidth
              id="actionTaken"
              name="actionTaken"
              label="actionTaken"
              value={formik.values.actionTaken}
              onChange={formik.handleChange}
              error={
                formik.touched.actionTaken && Boolean(formik.errors.actionTaken)
              }
              helperText={
                formik.touched.actionTaken && formik.errors.actionTaken
              }
              margin="normal"
            />
          )}

          {/* Date */}
          {item && item?.leakDate && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Leak Date"
                value={formik.values.leakDate}
                onChange={(value) => formik.setFieldValue("leakDate", value)}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="leakDate"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
          )}
          {/* Detection Date */}
          {item && item?.detectionTime && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Leak Date"
                value={formik.values.detectionTime}
                onChange={(value) =>
                  formik.setFieldValue("detectionTime", value)
                }
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="detectionTime"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
          )}

          {item && item?.sourceIP && (
            <TextField
              fullWidth
              id="sourceIP"
              name="sourceIP"
              label="sourceIP"
              value={formik.values.sourceIP}
              onChange={formik.handleChange}
              error={formik.touched.sourceIP && Boolean(formik.errors.sourceIP)}
              helperText={formik.touched.sourceIP && formik.errors.sourceIP}
              margin="normal"
            />
          )}

          {item && item?.sourcePort && (
            <TextField
              fullWidth
              id="sourcePort"
              name="sourcePort"
              label="sourcePort"
              value={formik.values.sourcePort}
              onChange={formik.handleChange}
              error={
                formik.touched.sourcePort && Boolean(formik.errors.sourcePort)
              }
              helperText={formik.touched.sourcePort && formik.errors.sourcePort}
              margin="normal"
            />
          )}

          {item && item?.destinationIP && (
            <TextField
              fullWidth
              id="destinationIP"
              name="destinationIP"
              label="destinationIP"
              value={formik.values.destinationIP}
              onChange={formik.handleChange}
              error={
                formik.touched.destinationIP &&
                Boolean(formik.errors.destinationIP)
              }
              helperText={
                formik.touched.destinationIP && formik.errors.destinationIP
              }
              margin="normal"
            />
          )}

          {item && item?.destinationPort && (
            <TextField
              fullWidth
              id="destinationPort"
              name="destinationPort"
              label="destinationPort"
              value={formik.values.destinationPort}
              onChange={formik.handleChange}
              error={
                formik.touched.destinationPort &&
                Boolean(formik.errors.destinationPort)
              }
              helperText={
                formik.touched.destinationPort && formik.errors.destinationPort
              }
              margin="normal"
            />
          )}
          {item && item?.domainName && (
            <TextField
              fullWidth
              id="domainName"
              name="domainName"
              label="domainName"
              value={formik.values.domainName}
              onChange={formik.handleChange}
              error={
                formik.touched.domainName && Boolean(formik.errors.domainName)
              }
              helperText={formik.touched.domainName && formik.errors.domainName}
              margin="normal"
            />
          )}
          {item && item?.brandName && (
            <TextField
              fullWidth
              id="brandName"
              name="brandName"
              label="brandName"
              value={formik.values.brandName}
              onChange={formik.handleChange}
              error={
                formik.touched.brandName && Boolean(formik.errors.brandName)
              }
              helperText={formik.touched.brandName && formik.errors.brandName}
              margin="normal"
            />
          )}
          {item && item?.incidentDescription && (
            <TextField
              fullWidth
              id="incidentDescription"
              name="incidentDescription"
              label="incidentDescription"
              value={formik.values.incidentDescription}
              onChange={formik.handleChange}
              error={
                formik.touched.incidentDescription &&
                Boolean(formik.errors.incidentDescription)
              }
              helperText={
                formik.touched.incidentDescription &&
                formik.errors.incidentDescription
              }
              margin="normal"
            />
          )}

          <Box mt={2}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Update
            </Button>
            <Button
              color="secondary"
              variant="contained"
              fullWidth
              onClick={onClose}
              sx={{ mt: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
