import React, { useContext } from "react";
import { useFormik } from "formik";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import * as Yup from "yup";
import { Context } from "../../context";
import Header from "../../components/Header";

function CreateKillChain() {
  const { addNewCyberKillChain, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    incidentId: Yup.string().required("incident Id Required"),
    killChainStage: Yup.string().required("killChainStage Required"),
    description: Yup.string().required("description Required"),
    ipAddress: Yup.string().required("Ip Address Required"),
    user: Yup.string().required("user Required"),
    device: Yup.string().required("device Required"),
    businessUnit: Yup.string().required("Business Unit Required"),
    timestamp: Yup.string().required("time stamp Required"),
    severity: Yup.string().required("severity Required"),
    status: Yup.string().required("status Required"),
  });

  async function hanldeaddNewCyberKillChain(values) {
    await addNewCyberKillChain(values);
  }

  let formik = useFormik({
    initialValues: {
      incidentId: "",
      description: "",
      killChainStage: "",
      severity: "",
      description: "",
      ipAddress: "",
      user: "",
      device: "",
      status: "",
      businessUnit: "",
      mitigationSteps: "",
    },
    validationSchema,
    onSubmit: hanldeaddNewCyberKillChain,
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
      <Header title={"Add New Mitre Attqck"}></Header>
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
              <MenuItem value="low">low</MenuItem>
              <MenuItem value="medium">medium</MenuItem>
              <MenuItem value="high">high</MenuItem>
              <MenuItem value="critical">critical</MenuItem>
            </Select>
          </Box>
          {formik.errors.severity && formik.touched.severity ? (
            <Alert severity="error">{formik.errors.severity}</Alert>
          ) : null}

          {/* status */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={" status"}
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="status"
            id="status"
          />
          {formik.errors.status && formik.touched.status ? (
            <Alert severity="error">{formik.errors.status}</Alert>
          ) : null}

          {/* incidentId */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={" incidentId"}
            value={formik.values.incidentId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="incidentId"
            id="incidentId"
          />
          {formik.errors.incidentId && formik.touched.incidentId ? (
            <Alert severity="error"> {formik.errors.incidentId}</Alert>
          ) : null}
          {/* killChainStage */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"killChainStage"}
            value={formik.values.killChainStage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="killChainStage"
            id="killChainStage"
          />
          {formik.errors.killChainStage && formik.touched.killChainStage ? (
            <Alert severity="error"> {formik.errors.killChainStage}</Alert>
          ) : null}

          {/* description */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="description"
            id="description"
          />
          {formik.errors.description && formik.touched.description ? (
            <Alert severity="error"> {formik.errors.description}</Alert>
          ) : null}
          {/* ipAddress */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"ipAddress"}
            value={formik.values.ipAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="ipAddress"
            id="ipAddress"
          />
          {formik.errors.ipAddress && formik.touched.ipAddress ? (
            <Alert severity="error"> {formik.errors.ipAddress}</Alert>
          ) : null}
          {/* user */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"user"}
            value={formik.values.user}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="user"
            id="user"
          />
          {formik.errors.user && formik.touched.user ? (
            <Alert severity="error"> {formik.errors.user}</Alert>
          ) : null}
          {/* device */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"device"}
            value={formik.values.device}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="device"
            id="device"
          />
          {formik.errors.device && formik.touched.device ? (
            <Alert severity="error">{formik.errors.device}</Alert>
          ) : null}

          {/* businessUnit */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"businessUnit"}
            value={formik.values.businessUnit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="businessUnit"
            id="businessUnit"
          />
          {formik.errors.businessUnit && formik.touched.businessUnit ? (
            <Alert severity="error">{formik.errors.businessUnit}</Alert>
          ) : null}

          {/* timestamp */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"timestamp"}
            value={formik.values.timestamp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="timestamp"
            id="timestamp"
          />
          {formik.errors.timestamp && formik.touched.timestamp ? (
            <Alert severity="error"> {formik.errors.timestamp}</Alert>
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

export default CreateKillChain;
