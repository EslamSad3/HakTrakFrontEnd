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
import Header from "../../components/Header";
import * as Yup from "yup";

function CreateAptFeeds() {
  const { addNewAptFeeds, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    aptGroupName: Yup.string().required("Apt Group Name Required"),
    threatType: Yup.string().required("Threat Type Required"),
    ttps: Yup.string().required("ttps Required"),
    targetSectors: Yup.string().required("target Sectors Required"),
    geographicFocus: Yup.string().required("Geographic Focus Required"),
    iocs: Yup.string().required("iocs Required"),
    source: Yup.string().required("source Type Required"),
    description: Yup.string().required("description Type Required"),
  });

  async function hanldeaddNewAptFeeds(values) {
    await addNewAptFeeds(values);
  }

  let formik = useFormik({
    initialValues: {
      aptGroupName: "",
      threatType: "",
      ttps: "",
      targetSectors: "",
      geographicFocus: "",
      iocs: "",
      source: "",
      description: "",
    },
    validationSchema,
    onSubmit: hanldeaddNewAptFeeds,
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
      <Header title={"Add New APT Feed"}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* apt Group Name */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.aptGroupName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="aptGroupName"
              id="aptGroupName"
              label="aptGroupName"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.aptGroupName && formik.touched.aptGroupName ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.aptGroupName}
            </Alert>
          ) : null}

          {/* threat Type */}

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

          {/* ttps */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.ttps}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="ttps"
              id="ttps"
              label="ttps"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.ttps && formik.touched.ttps ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.ttps}
            </Alert>
          ) : null}

          {/* target Sectors */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.targetSectors}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="targetSectors"
              id="targetSectors"
              label="target Sectors"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.targetSectors && formik.touched.targetSectors ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.targetSectors}
            </Alert>
          ) : null}

          {/* geographic Focus */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.geographicFocus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="geographicFocus"
              id="geographicFocus"
              label="geographic Focus"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.geographicFocus && formik.touched.geographicFocus ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.geographicFocus}
            </Alert>
          ) : null}

          {/* Iocs */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.iocs}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="iocs"
              id="iocs"
              label="Iocs"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.iocs && formik.touched.iocs ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.iocs}
            </Alert>
          ) : null}

          {/* source */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.source}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="source"
              id="source"
              label="source"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.source && formik.touched.source ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.source}
            </Alert>
          ) : null}

          {/* description */}

          <TextField
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="description"
            id="description"
            margin="normal"
            required
            fullWidth
            label={"description"}
          />
          {formik.errors.description && formik.touched.description ? (
            <Alert severity="error">
              <AlertTitle> Error </AlertTitle>
              {formik.errors.description}
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

export default CreateAptFeeds;
