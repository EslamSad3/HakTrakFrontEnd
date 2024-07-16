import React, { useContext } from "react";
import { useFormik } from "formik";
import { Context } from "../../context";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Header from "../../components/Header";
import * as Yup from "yup";

function CreateEdrXdrDetections() {
  const { addNewEdrXdr, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    detectionTime: Yup.string().required("Detection Time Required"),
    alertID: Yup.string().required("Alert ID Required"),
    threatType: Yup.string().required("Threat Type Required"),
    severity: Yup.string().required("Severity Required"),
    bu: Yup.string().required("Bu Required"),
    device: Yup.string().required("Device Required"),
    user: Yup.string().required("User Required"),
    filePath: Yup.string().required("File Path Required"),
    actionTaken: Yup.string().required("Action Taken Required"),
    mitigationSteps: Yup.string().required("Mitigation Steps Required"),
  });

  async function hanldeaddNewEdrXdr(values) {
    await addNewEdrXdr(values);
  }

  let formik = useFormik({
    initialValues: {
      detectionTime: "",
      alertID: "",
      threatType: "",
      severity: "",
      bu: "",
      device: "",
      user: "",
      filePath: "",
      actionTaken: "",
      mitigationSteps: "",
    },
    validationSchema,
    onSubmit: hanldeaddNewEdrXdr,
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header title={"Add New EDR XDR"}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* severity */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InputLabel id="severity-label">severity</InputLabel>
            <Select
              labelId="severity-label"
              id="severity"
              name="severity"
              value={formik.values.severity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              // margin="normal"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
            </Select>
          </Box>
          {formik.errors.severity && formik.touched.severity ? (
            <Alert severity="error">
              <AlertTitle> error </AlertTitle>
              {formik.errors.severity}
            </Alert>
          ) : null}

          

          {/* Alert ID */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.alertID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="alertID"
              id="alertID"
              label="alertID"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.alertID && formik.touched.alertID ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.alertID}
            </Alert>
          ) : null}
          
          {/* detection Time */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Detection Time"
                value={formik.values.leakDate}
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
          </Box>
          {formik.errors.detectionTime && formik.touched.detectionTime ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.detectionTime}
            </Alert>
          ) : null}
          {/* Threat Type */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.threatType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="threatType"
              id="threatType"
              label="threatType"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.threatType && formik.touched.threatType ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.threatType}
            </Alert>
          ) : null}
          {/* bu */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.bu}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="bu"
              id="bu"
              label="bu"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.bu && formik.touched.bu ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.bu}
            </Alert>
          ) : null}
          {/* device */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.device}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="device"
              id="device"
              label="device"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.device && formik.touched.device ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.device}
            </Alert>
          ) : null}
          {/* user */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.user}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="user"
              id="user"
              label="user"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.user && formik.touched.user ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.user}
            </Alert>
          ) : null}
          {/* filePath */}
          <TextField
            value={formik.values.filePath}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="filePath"
            id="filePath"
            margin="normal"
            required
            fullWidth
            label={"filePath"}
          />
          {formik.errors.filePath && formik.touched.filePath ? (
            <Alert severity="error">
              <AlertTitle> Error </AlertTitle>
              {formik.errors.filePath}
            </Alert>
          ) : null}
          {/* Action Taken */}
          <TextField
            value={formik.values.actionTaken}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="actionTaken"
            id="actionTaken"
            margin="normal"
            required
            fullWidth
            label={"actionTaken"}
          />
          {formik.errors.actionTaken && formik.touched.actionTaken ? (
            <Alert severity="error">
              <AlertTitle> Error </AlertTitle>
              {formik.errors.actionTaken}
            </Alert>
          ) : null}
          {/* Mitigation Steps */}
          <TextField
            value={formik.values.mitigationSteps}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="mitigationSteps"
            id="mitigationSteps"
            margin="normal"
            required
            fullWidth
            label={"mitigationSteps"}
          />
          {formik.errors.mitigationSteps && formik.touched.mitigationSteps ? (
            <Alert severity="error">
              <AlertTitle> Error </AlertTitle>
              {formik.errors.mitigationSteps}
            </Alert>
          ) : null}
          <Button
            disabled={!(formik.isValid && formik.dirty)}
            variant="contained"
            sx={{ marginY: "20px" }}
            type="submit"
          >
            {isLoading ? <CircularProgress color="success" /> : "Create"}
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

export default CreateEdrXdrDetections;
