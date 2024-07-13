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
} from "@mui/material";

const UpdateDialog = ({ open, onClose, item, onConfirm }) => {
  const formik = useFormik({
    initialValues: {
      value: item?.value || "",
      location: item?.location || "",
      description: item?.description || "",
    },
    validationSchema: Yup.object({
      value: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
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
            helperText={formik.touched.description && formik.errors.description}
            margin="normal"
          />
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
