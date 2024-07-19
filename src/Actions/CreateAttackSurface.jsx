import React, { useContext, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import { MuiFileInput } from "mui-file-input";
import { useFormik } from "formik";
import { Context } from "../context";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
} from "@mui/material";
import Header from "../components/Header";
import * as Yup from "yup";

function CreateAttackSurface() {
  const [file, setFile] = useState(null);
  const { addNewAttckSurface, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    affectedSystems: Yup.string().required("Affected Systems Required"),
    openPorts: Yup.string().required("Open Ports Required"),
    services: Yup.string().required("Services Required"),
    mitigationSteps: Yup.string().required("Mitigation Steps Required"),
  });

  async function hanldeaddNewAttckSurface(values) {
    const fd = new FormData();
    fd.append("screenshot", file);
    fd.append("affectedSystems", values.affectedSystems);
    fd.append("openPorts", values.openPorts);
    fd.append("services", values.services);
    fd.append("mitigationSteps", values.mitigationSteps);

    await addNewAttckSurface(fd);
  }

  let formik = useFormik({
    initialValues: {
      affectedSystems: "",
      openPorts: "",
      services: "",
      screenshot: "",
      mitigationSteps: "",
    },
    validationSchema,
    onSubmit: hanldeaddNewAttckSurface,
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
      <Header title={"Add New Attack Serface"}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* affectedSystems */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"Affected Systems"}
            value={formik.values.affectedSystems}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="affectedSystems"
            id="affectedSystems"
          />
          {formik.errors.affectedSystems && formik.touched.affectedSystems ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.affectedSystems}
            </Alert>
          ) : null}

          {/* Open Ports */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"Open Ports"}
            value={formik.values.openPorts}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="openPorts"
            id="openPorts"
          />
          {formik.errors.openPorts && formik.touched.openPorts ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.openPorts}
            </Alert>
          ) : null}

          {/* Screenshot */}
          <MuiFileInput
            sx={{ my: "25px" }}
            label="Select a screenshot"
            value={formik.values.screenshot}
            onChange={(e) => setFile(e)}
            inputProps={{ accept: "image/*" }}
            getInputText={(value) => (value ? "uploading..." : "Select a screenshot")}
            clearIconButtonProps={{
              title: "Remove",
              children: <CloseIcon fontSize="small" />,
            }}
          />

          {/* Services */}
          <TextField
            value={formik.values.services}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="services"
            id="services"
            label="Services"
            margin="normal"
            required
            fullWidth
          />
          {formik.errors.services && formik.touched.services ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.services}
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
            label={"Mitigation Steps"}
          />
          {formik.errors.mitigationSteps && formik.touched.mitigationSteps ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.mitigationSteps}
            </Alert>
          ) : null}

          {/* Submit Button */}
          <Button variant="contained" sx={{ marginY: "20px" }} type="submit">
            {isLoading ? <CircularProgress color="success" /> : "Create"}
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

export default CreateAttackSurface;
