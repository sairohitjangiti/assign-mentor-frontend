import { MenuItem, Select, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { API_URL } from "../global constants/API.js";

export function UpdateStudent() {
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
    <Updatestudent students={students} mentors={mentors} />
  ) : (
    "Wait for Loading....."
  );
}
function Updatestudent({ students, mentors }) {
  const history = useHistory();
  const { handleChange, handleBlur, handleSubmit, values } = useFormik({
    initialValues: {
      studentName: "",
      mentorAssigned: "",
    },
    // validate: validateForm,
    validationSchema: formvalidationSchema,
    // only no errors is sbmitted by validate form with call
    onSubmit: (Mentor) => {
      // console.log("onSubmit", Mentor);
      assignMentor(Mentor);
    },
  });

  const assignMentor = (Mentor) => {
    fetch(`${API_URL}/assign-mentor`, {
      method: "PUT",
      body: JSON.stringify(Mentor),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/classdata"));
  };
  return (
    <form className="assignmentor" onSubmit={handleSubmit}>
      <Typography variant="h4">Assign Mentor to Students</Typography>
      <hr />
      <Typography variant="h6">Select a Student</Typography>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="studentName"
        name="studentName"
        value={values.studentName}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ width: "150px" }}
      >
        {students.map((student, index) => {
          return (
            <MenuItem key={index} value={student.studentName}>
              {student.studentName}
            </MenuItem>
          );
        })}
      </Select>
      <br />
      <Typography variant="h4">Select a mentor for Student</Typography>
      <Typography variant="h6">
        Select a mentor to assign or change to student
      </Typography>
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={values.mentorAssigned}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {mentors.map((mentor, index) => {
          return (
            <FormControlLabel
              key={index}
              value={values.mentorAssigned}
              name="mentorAssigned"
              onChange={handleChange}
              onBlur={handleBlur}
              control={
                <Radio value={mentor.mentorName} onChange={handleChange} />
              }
              label={mentor.mentorName}
            />
          );
        })}
      </RadioGroup>
      <Button
        variant="contained"
        color="success"
        sx={{ margin: "10px" }}
        type="submit"
      >
        Assign Mentor
      </Button>
    </form>
  );
}

const formvalidationSchema = Yup.object({
  studentName: Yup.string().required("Why not select a student"),
  mentorAssigned: Yup.string().required("please select a student"),
});
