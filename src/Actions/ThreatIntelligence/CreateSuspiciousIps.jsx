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
  TextField,
} from "@mui/material";
import Header from "../../components/Header";
import * as Yup from "yup";

function CreateSuspiciousIps() {
  const { addNewSuspiciousIps, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    value: Yup.string().required("value Required"),
    source: Yup.string().required("source Required"),
    description: Yup.string().required("description Required"),
  });

  async function hanldeaddNewSuspiciousIps(values) {
    await addNewSuspiciousIps(values);
  }

  let formik = useFormik({
    initialValues: {
      value: "",
      source: "",
      description: "",
    },
    validationSchema,
    onSubmit: hanldeaddNewSuspiciousIps,
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
      <Header title={"Add New suspicious Ip"}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* value */}

          <TextField
            margin="normal"
            required
            fullWidth
            label={"suspicious ip value"}
            value={formik.values.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="value"
            id="value"
          />
          {formik.errors.value && formik.touched.value ? (
            <Alert severity="error">
              <AlertTitle> error </AlertTitle>
              {formik.errors.value}
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

export default CreateSuspiciousIps;
