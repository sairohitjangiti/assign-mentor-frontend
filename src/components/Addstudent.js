import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem, InputLabel, Button } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { API_URL } from "../global constants/API.js";

export function Addstudent() {
  const [mentors, setmentors] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/mentors`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mentor) => setmentors(mentor));
  }, []);

  const history = useHistory();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        studentName: "",
        studentMail: "",
        course: "",
        mentorAssigned: "",
      },
      // validate: validateForm,
      validationSchema: formvalidationSchema,
      // only no errors is sbmitted by validate form with call
      onSubmit: (newstudent) => {
        // console.log("onSubmit", newstudent);
        addstudent(newstudent);
      },
    });

  const addstudent = (newstudent) => {
    // console.log(newstudent);
    fetch(`${API_URL}/create-student`, {
      method: "POST",
      body: JSON.stringify(newstudent),
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
        name="studentName"
        placeholder="Enter your Name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.studentName}
        error={errors.studentName && touched.studentName}
        helperText={
          errors.studentName && touched.studentName && errors.studentName
        }
      ></TextField>
      <TextField
        sx={{ margin: "10px" }}
        variant="standard"
        fullWidth
        label="Email"
        name="studentMail"
        placeholder="Enter your Email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.studentMail}
        error={errors.studentMail && touched.studentMail}
        helperText={
          errors.studentMail && touched.studentMail && errors.studentMail
        }
      ></TextField>
      <InputLabel id="demo-simple-select-label">Select a Course</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={values.course}
        label="course"
        name="course"
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
      <InputLabel id="demo-simple-select-label">Select a Mentor</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={values.mentorAssigned}
        name="mentorAssigned"
        label="mentor"
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ width: "150px" }}
      >
        {mentors.length > 0 &&
          mentors.map((mentor, index) => {
            return (
              <MenuItem key={index} value={mentor.mentorName}>
                {mentor.mentorName}
              </MenuItem>
            );
          })}
        {/* <MenuItem value="Raghav">Raghav</MenuItem>
        <MenuItem value="Rajesh">Rajesh</MenuItem>
        <MenuItem value="Karthick">Karthick</MenuItem>
        <MenuItem value="Natarajan">Natarajan</MenuItem> */}
        {/* <MenuItem value="Mariappan">Mariappan</MenuItem> */}
      </Select>
      <br />
      <Button
        variant="contained"
        color="success"
        sx={{ margin: "10px" }}
        type="submit"
      >
        Add Student
      </Button>
    </form>
  );
}
const formvalidationSchema = Yup.object({
  studentName: Yup.string().required("Why not fill your name 🤯"),
  studentMail: Yup.string().email().required("please file the email field"),
});
