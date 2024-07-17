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
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Header from "../components/Header";
import * as Yup from "yup";

function CreateBrandReputation() {
  const { addNewBrandReputation, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    domainName: Yup.string().required("Domain Name Required"),
    brandName: Yup.string().required("Brand Name Required"),
    incidentDescription: Yup.string().required("Incident Description Required"),
    status: Yup.string().required("status Required"),
    mitigationSteps: Yup.string().required("Mitigation Steps Required"),
  });

  async function hanldeaddNewBrandReputation(values) {
    await addNewBrandReputation(values);
  }

  let formik = useFormik({
    initialValues: {
      domainName: "",
      brandName: "",
      incidentDescription: "",
      status: "",
      mitigationSteps: "",
    },
    validationSchema,
    onSubmit: hanldeaddNewBrandReputation,
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
      <Header title={"Add New Brand Reputation"}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* status */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InputLabel id="status-label">status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              fullWidth
              // margin="normal"
            >
              <MenuItem value="taking down">Taking Down</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="false positive">False Positive</MenuItem>
              <MenuItem value="resolving">Resolving</MenuItem>
            </Select>
          </Box>
          {formik.errors.status && formik.touched.status ? (
            <Alert security="error">
              <AlertTitle> error </AlertTitle>
              {formik.errors.status}
            </Alert>
          ) : null}
          {/* domainName */}

          <TextField
            margin="normal"
            required
            fullWidth
            label={" Domain Name"}
            value={formik.values.domainName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="domainName"
            id="domainName"
          />
          {formik.errors.domainName && formik.touched.domainName ? (
            <Alert severity="error">
              <AlertTitle> error </AlertTitle>
              {formik.errors.domainName}
            </Alert>
          ) : null}

          {/* brandName */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              value={formik.values.brandName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              name="brandName"
              id="brandName"
              label="brandName"
              margin="normal"
              required
              fullWidth
            />
          </Box>
          {formik.errors.brandName && formik.touched.brandName ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {formik.errors.brandName}
            </Alert>
          ) : null}

          {/* incidentDescription */}

          <TextField
            value={formik.values.incidentDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="incidentDescription"
            id="incidentDescription"
            margin="normal"
            required
            fullWidth
            label={"incidentDescription"}
          />
          {formik.errors.incidentDescription &&
          formik.touched.incidentDescription ? (
            <Alert severity="error">
              <AlertTitle> Error </AlertTitle>
              {formik.errors.incidentDescription}
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

export default CreateBrandReputation;
