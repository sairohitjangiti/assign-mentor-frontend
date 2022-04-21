import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "../global constants/API.js";

export function UpdateMentor() {
  const [students, setstudents] = useState(null);
  const [mentors, setmentors] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/mentors`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mentor) => setmentors(mentor));
  }, []);
  useEffect(() => {
    fetch(`${API_URL}/students`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((student) => setstudents(student));
  }, []);
  return students && mentors ? (
    <Updatementor students={students} mentors={mentors} />
  ) : (
    "Wait for Loading....."
  );
}
function Updatementor({ students, mentors }) {
  const history = useHistory();
  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      mentorName: "",
      studentsAssigned: [],
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
    fetch(`${API_URL}/assign-student`, {
      method: "PUT",
      body: JSON.stringify(newstudent),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/classdata"));
  };

  return (
    <form className="updatementor" onSubmit={handleSubmit}>
      <Typography variant="h4">Assign Students to Mentor</Typography>
      <hr />
      <Typography variant="h6">Select a Mentor</Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="mentorName"
        name="mentorName"
        value={values.mentorName}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ width: "150px" }}
      >
        {mentors.map((mentor, index) => {
          return (
            <MenuItem key={index} value={mentor.mentorName}>
              {mentor.mentorName}
            </MenuItem>
          );
        })}
      </Select>
      <br />
      {students.map((stu, index) => {
        // console.log(stu.mentorAssigned === "");
        return stu.mentorAssigned === "" ? (
          <FormControlLabel
            key={index}
            label={stu.studentName}
            name="studentsAssigned"
            value={values.studentsAssigned}
            onChange={handleChange}
            onBlur={handleBlur}
            // checked={checked={checked[0] && checked[1]}}
            control={
              <Checkbox value={stu.studentName} onChange={handleChange} />
            }
          />
        ) : (
          ""
        );
      })}
      <br />
      <Button
        variant="contained"
        color="success"
        sx={{ margin: "10px" }}
        type="submit"
      >
        Assign Students
      </Button>
    </form>
  );
}
const formvalidationSchema = Yup.object({
  mentorName: Yup.string().required("Why not select the mentor name 🤯"),
  studentsAssigned: Yup.array().required("please select atleast one student"),
});
