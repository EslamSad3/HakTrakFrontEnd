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

function CreateDarkWebMentions() {
  const { addNewDarkWebMentions, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    source: Yup.string().required("source Type Required"),
    mitigationSteps: Yup.string().required("mitigation Steps Type Required"),
  });

  async function hanldeaddNewDarkWebMentions(values) {
    await addNewDarkWebMentions(values);
  }

  let formik = useFormik({
    initialValues: {
      mitigationSteps: "",
      source: "",
    },
    validationSchema,
    onSubmit: hanldeaddNewDarkWebMentions,
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
      <Header title={"Add New Dark Web Mention"}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* Dark Web Mention Mitigation Steps*/}
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

export default CreateDarkWebMentions;
