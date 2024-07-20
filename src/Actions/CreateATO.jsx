import React, { useContext } from "react";
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

function CreateATO() {
  const { addNewATO, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    user: Yup.string().required("user Required"),
    password: Yup.string().required("password Required"),
    url: Yup.string().required("url Required"),
    source: Yup.string().required("source Required"),
    bu: Yup.string().required("bu Required"),
    mitigationSteps: Yup.string().required("Mitigation Steps Required"),
  });

  async function hanldeaddNewATO(values) {
    await addNewATO(values);
  }

  let formik = useFormik({
    initialValues: {
      user: "",
      password: "",
      url: "",
      source: "",
      bu: "",
      mitigationSteps: "",
    },
    validationSchema,
    onSubmit: hanldeaddNewATO,
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
      <Header title={"Add New ATO"}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* user */}

          <TextField
            margin="normal"
            required
            fullWidth
            label={"ATO user"}
            value={formik.values.user}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="user"
            id="user"
          />
          {formik.errors.user && formik.touched.user ? (
            <Alert severity="error">
              <AlertTitle> error </AlertTitle>
              {formik.errors.user}
            </Alert>
          ) : null}

          {/* password */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="password"
              id="password"
              label="password"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.password && formik.touched.password ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.password}
            </Alert>
          ) : null}

          {/* url */}

          <TextField
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="url"
            id="url"
            margin="normal"
            required
            fullWidth
            label={"url"}
          />
          {formik.errors.url && formik.touched.url ? (
            <Alert severity="error">
              <AlertTitle> Error </AlertTitle>
              {formik.errors.url}
            </Alert>
          ) : null}

          <TextField
            value={formik.values.source}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="source"
            id="source"
            margin="normal"
            required
            fullWidth
            label={"source"}
          />
          {formik.errors.source && formik.touched.source ? (
            <Alert severity="error">
              <AlertTitle> Error </AlertTitle>
              {formik.errors.source}
            </Alert>
          ) : null}

          <TextField
            value={formik.values.bu}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="bu"
            id="bu"
            margin="normal"
            required
            fullWidth
            label={"bu"}
          />
          {formik.errors.bu && formik.touched.bu ? (
            <Alert severity="error">
              <AlertTitle> Error </AlertTitle>
              {formik.errors.bu}
            </Alert>
          ) : null}

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

export default CreateATO;
