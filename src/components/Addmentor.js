import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem, InputLabel, Button } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { API_URL } from "../global constants/API.js";

export function Addmentor() {
  const history = useHistory();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        mentorName: "",
        mail: "",
        mobileNo: "",
        expertin: "",
        studentsAssigned: [],
      },
      // validate: validateForm,
      validationSchema: formvalidationSchema,
      // only no errors is sbmitted by validate form with call
      onSubmit: (newmentor) => {
        // console.log("onSubmit", newmentor);
        addmentor(newmentor);
      },
    });

  const addmentor = (newmentor) => {
    // console.log(newmentor);
    fetch(`${API_URL}/create-mentor`, {
      method: "POST",
      body: JSON.stringify(newmentor),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/"));
  };
  return (
    <form className="addstudent" onSubmit={handleSubmit}>
      <TextField
        sx={{ margin: "10px" }}
        variant="standard"
        fullWidth
        label="Name"
        name="mentorName"
        placeholder="Enter your Name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.mentorName}
        error={errors.mentorName && touched.mentorName}
        helperText={
          errors.mentorName && touched.mentorName && errors.mentorName
        }
      ></TextField>
      <TextField
        sx={{ margin: "10px" }}
        variant="standard"
        fullWidth
        label="Email"
        name="mail"
        placeholder="Enter your Email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.mail}
        error={errors.mail && touched.mail}
        helperText={errors.mail && touched.mail && errors.mail}
      ></TextField>
      <TextField
        sx={{ margin: "10px" }}
        variant="standard"
        fullWidth
        label="Mobile No"
        name="mobileNo"
        placeholder="Enter your Mobile No"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.mobileNo}
        error={errors.mobileNo && touched.mobileNo}
        helperText={errors.mobileNo && touched.mobileNo && errors.mobileNo}
      ></TextField>
      <InputLabel id="demo-simple-select-label">
        Select a dept that mentor Expert
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={values.expertin}
        label="expertin"
        name="expertin"
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ width: "150px" }}
      >
        <MenuItem value="React JS">React JS</MenuItem>
        <MenuItem value="MERN Stack">MERN Stack</MenuItem>
        <MenuItem value="Data Science">Data Science</MenuItem>
        <MenuItem value="Javascript">Javascript</MenuItem>
        <MenuItem value="Data Structure">Data Structure</MenuItem>
        <MenuItem value="Node JS">Node JS</MenuItem>
      </Select>

      <br />
      <Button
        variant="contained"
        color="success"
        sx={{ margin: "10px" }}
        type="submit"
      >
        Add Mentor
      </Button>
    </form>
  );
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formvalidationSchema = Yup.object({
  mentorName: Yup.string().required("Why not fill your name 🤯"),
  mail: Yup.string().email().required("please fill the email field"),
  mobileNo: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Why not fill this phone no 🤯")
    .min(8, "Please Enter the valid phone number")
    .max(10, "Please Enter the valid phone number"),
  expertin: Yup.string().required(
    "Why not fill this which dept you're expert 🤯"
  ),
});
