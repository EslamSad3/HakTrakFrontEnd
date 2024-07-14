import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  Alert,
  AlertTitle,
} from "@mui/material";

const UpdateDialog = ({ open, onClose, item, onConfirm }) => {
  const formik = useFormik({
    initialValues: {
      value: item?.value || "",
      location: item?.location || "",
      description: item?.description || "",
      iOCType: item?.iOCType || "",
      indicatorValue: item?.indicatorValue || "",
      threatType: item?.threatType || "",
    },
    // validationSchema: Yup.object({
    //   value: Yup.string().required("Required"),
    //   location: Yup.string().required("Required"),
    //   description: Yup.string().required("Required"),
    // }),
    onSubmit: (values) => {
      onConfirm(values);
    },
    enableReinitialize: true,
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update {item?.value || "item"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} p={3}>
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
          {item && item?.iOCType && (
            <Box>
              <InputLabel id="iOCType-label">IOC Type</InputLabel>
              {/* iOCType */}

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
                  <AlertTitle> error </AlertTitle>
                  {formik.errors.iOCType}
                </Alert>
              ) : null}
            </Box>
          )}
          {item && item?.indicatorValue && (
            <TextField
              fullWidth
              id="indicatorValue"
              name="indicatorValue"
              label="indicatorValue"
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
          {item && item?.threatType && (
            <TextField
              fullWidth
              id="threatType"
              name="threatType"
              label="threatType"
              value={formik.values.threatType}
              onChange={formik.handleChange}
              error={
                formik.touched.threatType && Boolean(formik.errors.threatType)
              }
              helperText={formik.touched.threatType && formik.errors.threatType}
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
