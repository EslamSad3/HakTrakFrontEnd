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

function CreatePortals() {
  const { addNewPortal, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    value: Yup.string()
      .required( "value Required" )
      .min(7,  "To Short value (Min 7)" ),
    location: Yup.string()
      .required( "location Required" )
      .min(2,  "To Short location (Min 2)" ),
    description: Yup.string()
      .required( "description Required" )
      .min(6,  "To Short description (Min 6)" ),
  });

  async function hanldeAddNewPortal(values) {
    await addNewPortal(values);
  }

  let formik = useFormik({
    initialValues: {
      value: "",
      location: "",
      description: "",
    },
    validationSchema,
    onSubmit: hanldeAddNewPortal,
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
      <Header title={ "Add New Portal" }></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* value */}

          <TextField
            margin="normal"
            required
            fullWidth
            label={  "Portal value" }
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

          {/* location */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="location"
              id="location"
              label="location"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.location && formik.touched.location ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.location}
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
            label={ "description" }
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

export default CreatePortals;
