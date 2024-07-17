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

function CreateVulnerabilitiesIntelligences() {
  const { addNewVulnerabilitiesIntelligence, isLoading } = useContext(Context);

  const validationSchema = Yup.object().shape({
    vulnerabilityID: Yup.string().required("vulnerabilityID Required"),
    description: Yup.string().required("description Required"),
    affectedSystems: Yup.string().required("affectedSystems Required"),
    severity: Yup.string().required("severity Required"),
    impact: Yup.string().required("impact Required"),
    cvsScore: Yup.string().required("cvsScore Required"),
    exploitAvailability: Yup.string().required("exploitAvailability Required"),
    patchAvailability: Yup.string().required("patchAvailability Required"),
    vendor: Yup.string().required("vendor Required"),
    status: Yup.string().required("status Required"),
    references: Yup.string().required("references Required"),
    mitigationSteps: Yup.string().required("mitigationSteps Required"),
  });

  async function hanldeaddNewVulnerabilitiesIntelligence(values) {
    await addNewVulnerabilitiesIntelligence(values);
  }

  let formik = useFormik({
    initialValues: {
      vulnerabilityID: "",
      description: "",
      affectedSystems: "",
      severity: "",
      impact: "",
      cvsScore: "",
      exploitAvailability: "",
      patchAvailability: "",
      vendor: "",
      status: "",
      references: "",
      mitigationSteps: "",
    },
    validationSchema,
    onSubmit: hanldeaddNewVulnerabilitiesIntelligence,
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
      <Header title={"Add New Vulnerabilities Intelligences"}></Header>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          {/* severity */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InputLabel id="severity-label">severity</InputLabel>
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
              <MenuItem value="low">low</MenuItem>
              <MenuItem value="medium">medium</MenuItem>
              <MenuItem value="high">high</MenuItem>
              <MenuItem value="critical">critical</MenuItem>
            </Select>
          </Box>
          {formik.errors.severity && formik.touched.severity ? (
            <Alert severity="error">{formik.errors.severity}</Alert>
          ) : null}

          {/* status */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={" status"}
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="status"
            id="status"
          />
          {formik.errors.status && formik.touched.status ? (
            <Alert severity="error">{formik.errors.status}</Alert>
          ) : null}

          {/* vulnerabilityID */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={" vulnerabilityID"}
            value={formik.values.vulnerabilityID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="vulnerabilityID"
            id="vulnerabilityID"
          />
          {formik.errors.vulnerabilityID && formik.touched.vulnerabilityID ? (
            <Alert severity="error"> {formik.errors.vulnerabilityID}</Alert>
          ) : null}
          {/* affectedSystems */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"affectedSystems"}
            value={formik.values.affectedSystems}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="affectedSystems"
            id="affectedSystems"
          />
          {formik.errors.affectedSystems && formik.touched.affectedSystems ? (
            <Alert severity="error"> {formik.errors.affectedSystems}</Alert>
          ) : null}

          {/* impact */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"impact"}
            value={formik.values.impact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="impact"
            id="impact"
          />
          {formik.errors.impact && formik.touched.impact ? (
            <Alert severity="error"> {formik.errors.impact}</Alert>
          ) : null}
          {/* cvsScore */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"cvsScore"}
            value={formik.values.cvsScore}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="cvsScore"
            id="cvsScore"
          />
          {formik.errors.cvsScore && formik.touched.cvsScore ? (
            <Alert severity="error"> {formik.errors.cvsScore}</Alert>
          ) : null}
          {/* exploitAvailability */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"exploitAvailability"}
            value={formik.values.exploitAvailability}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="exploitAvailability"
            id="exploitAvailability"
          />
          {formik.errors.exploitAvailability &&
          formik.touched.exploitAvailability ? (
            <Alert severity="error"> {formik.errors.exploitAvailability}</Alert>
          ) : null}
          {/* patchAvailability */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"patchAvailability"}
            value={formik.values.patchAvailability}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="patchAvailability"
            id="patchAvailability"
          />
          {formik.errors.patchAvailability &&
          formik.touched.patchAvailability ? (
            <Alert severity="error"> {formik.errors.patchAvailability}</Alert>
          ) : null}
          {/* vendor */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"vendor"}
            value={formik.values.vendor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="vendor"
            id="vendor"
          />
          {formik.errors.vendor && formik.touched.vendor ? (
            <Alert severity="error">{formik.errors.vendor}</Alert>
          ) : null}

          {/* references */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"references"}
            value={formik.values.references}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="references"
            id="references"
          />
          {formik.errors.references && formik.touched.references ? (
            <Alert severity="error">{formik.errors.references}</Alert>
          ) : null}

          {/* description */}
          <TextField
            margin="normal"
            required
            fullWidth
            label={"description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="description"
            id="description"
          />
          {formik.errors.description && formik.touched.description ? (
            <Alert severity="error"> {formik.errors.description}</Alert>
          ) : null}

          {/* mitigationSteps */}
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
            <Alert severity="error">{formik.errors.mitigationSteps}</Alert>
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

export default CreateVulnerabilitiesIntelligences;
