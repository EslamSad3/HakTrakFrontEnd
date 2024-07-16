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

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Header from "../../components/Header";
import * as Yup from "yup";

function CreateLeakedCredentials() {
  const { addNewLeakedCredentials, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    source: Yup.string().required("source  Required"),
    user: Yup.string().required("user  Required"),
    password: Yup.string().required("password  Required"),
    bu: Yup.string().required("bu  Required"),
    leakDate: Yup.string().required("leakDate  Required"),
    mitigationSteps: Yup.string().required("mitigation Steps  Required"),
  });

  async function hanldeaddNewLeakedCredentials(values) {
    await addNewLeakedCredentials(values);
  }

  let formik = useFormik({
    initialValues: {
      mitigationSteps: "",
      source: "",
      user: "",
      password: "",
      bu: "",
      leakDate: null,
    },
    validationSchema,
    onSubmit: hanldeaddNewLeakedCredentials,
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
      <Header title={"Add New Leaked Credentials"}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* User */}
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

          {/* Password */}
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

          {/* Bu */}
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

          {/* Leaked Date */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Leak Date"
                value={formik.values.leakDate}
                onChange={(value) => formik.setFieldValue("leakDate", value)}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="leakDate"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          {formik.errors.leakDate && formik.touched.leakDate ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.leakDate}
            </Alert>
          ) : null}
          
          {/* Leaked Credentials Steps*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.mitigationSteps}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="mitigationSteps"
              id="mitigationSteps"
              label="Mitigation Steps"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.mitigationSteps && formik.touched.mitigationSteps ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.mitigationSteps}
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

export default CreateLeakedCredentials;
