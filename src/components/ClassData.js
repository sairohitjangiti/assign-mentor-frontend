import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { API_URL } from "../global constants/API.js";

export function ClassData() {
  const [students, setstudents] = useState(null);
  const [mentors, setmentors] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/students`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((student) => setstudents(student));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/mentors`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mentor) => setmentors(mentor));
  }, []);

  return mentors ? (
    <Classdata students={students} mentors={mentors} />
  ) : (
    "Wait for Loading...."
  );
}

function Classdata({ students, mentors }) {
  //   console.log(students);
  //   console.log(mentors);
  return (
    <div className="home">
      <Typography variant="h4">Mern Class</Typography>
      <hr />
      <Typography variant="h4">Mentor Data</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Expertise</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Students</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentors.map((mentor) => {
              return (
                <TableRow key={mentor._id}>
                  <TableCell>{mentor.mentorName}</TableCell>
                  <TableCell>{mentor.mail}</TableCell>
                  <TableCell>{mentor.expertin}</TableCell>
                  <TableCell>{mentor.mobileNo}</TableCell>

                  <TableCell>
                    {mentor.studentsAssigned.length > 0
                      ? "Students Assigned"
                      : "Not Assigned"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <hr />
      <Typography variant="h4">Student Data</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Mentor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((stud) => {
              return (
                <TableRow key={stud._id}>
                  <TableCell>{stud.studentName}</TableCell>
                  <TableCell>{stud.studentMail}</TableCell>
                  <TableCell>{stud.course}</TableCell>
                  <TableCell>
                    {stud.mentorAssigned ? "Mentor Assigned" : "Not Assigned"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
