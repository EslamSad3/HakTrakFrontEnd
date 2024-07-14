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

function CreateIocs() {
  const { addNewIoc, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    iOCType: Yup.string().required("iOC Type Required"),
    indicatorValue: Yup.string().required("indicator Value Required"),
    threatType: Yup.string().required("threat Type Required"),
    source: Yup.string().required("source Type Required"),
    description: Yup.string().required("description Type Required"),
  });

  async function hanldeAddNewIoc(values) {
    await addNewIoc(values);
  }

  let formik = useFormik({
    initialValues: {
      iOCType: "",
      indicatorValue: "",
      threatType: "",
      source: "",
      description: "",
    },
    validationSchema,
    onSubmit: hanldeAddNewIoc,
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
      <Header title={"Add New Ioc"}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
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

export default CreateIocs;
