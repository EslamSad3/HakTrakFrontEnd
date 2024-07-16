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
      leakDate: item?.leakDate || "",
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
        leakDate: item.leakDate || "",
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
