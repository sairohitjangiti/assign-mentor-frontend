import { useState, useEffect } from "react";
import { Select, MenuItem, Typography } from "@mui/material";
import { API_URL } from "../global constants/API.js";

export function GetStudents() {
  const [mentors, setmentors] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/mentors`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mentor) => setmentors(mentor));
  }, []);
  return mentors ? <Getstudent mentors={mentors} /> : "Wait for Loading...";
}

function Getstudent({ mentors }) {
  const [mentor, setmentor] = useState("");
  return (
    <div className="liststudent">
      <Typography variant="h4">
        Select a mentor for getting assigned students:
      </Typography>
      <Select
        name="mentorName"
        label="mentorName"
        value={mentor}
        onChange={(ev) => setmentor(ev.target.value)}
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
      <Typography variant="h5">
        students who are assigned to {mentor}:
      </Typography>
      <div className="students">
        <ul>
          {mentors
            // eslint-disable-next-line eqeqeq
            .filter((mento) => mento.mentorName == mentor)
            .map((mento) => {
              return mento.studentsAssigned.map((stu, index) => {
                return <li key={index}>{stu}</li>;
              });
            })}
        </ul>
      </div>
    </div>
  );
}
