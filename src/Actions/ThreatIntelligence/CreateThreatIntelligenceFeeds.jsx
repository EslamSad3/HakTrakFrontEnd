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

function CreateThreatIntelligenceFeeds() {
  const { addNewThreatIntelligenceFeeds, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    threatType: Yup.string().required(
      "Threat Intelligence Feed threat Type Required"
    ),
    severity: Yup.string().required(
      "Threat Intelligence Feed severity Required"
    ),
    source: Yup.string().required("Threat Intelligence Feed source Required"),
    description: Yup.string().required(
      "Threat Intelligence Feed  description Required"
    ),
  });

  async function hanldeaddNewThreatIntelligenceFeeds(values) {
    await addNewThreatIntelligenceFeeds(values);
  }

  let formik = useFormik({
    initialValues: {
      severity: "",
      threatType: "",
      source: "",
      description: "",
    },
    validationSchema,
    onSubmit: hanldeaddNewThreatIntelligenceFeeds,
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
      <Header title={"Add New Threat Intelligence Feed"}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <InputLabel id="severity-label">severity</InputLabel>
          {/* Threat Intelligence Feed severity */}

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
          {formik.errors.severity && formik.touched.severity ? (
            <Alert severity="error">
              <AlertTitle> error </AlertTitle>
              {formik.errors.severity}
            </Alert>
          ) : null}

          {/* indicatorValue */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.indicatorValue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="indicatorValue"
              id="indicatorValue"
              label="indicatorValue"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.indicatorValue && formik.touched.indicatorValue ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.indicatorValue}
            </Alert>
          ) : null}

          {/* threatType */}

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

export default CreateThreatIntelligenceFeeds;
