import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useHistory, Switch, Route } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { ClassData } from "./components/ClassData";
import { Addstudent } from "./components/Addstudent";
import { Addmentor } from "./components/Addmentor";
import { UpdateMentor } from "./components/UpdateMentor";
import { UpdateStudent } from "./components/UpdateStudent";
import { Home } from "./components/Home";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { GetStudents } from "./components/GetStudents";

export default function App() {
  const [opened, setopened] = useState(false);
  const handleDrawerOpen = () => {
    setopened(true);
  };
  const handleDrawerClose = () => {
    setopened(false);
  };
  const history = useHistory();
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h4">Class</Typography>
          <Button
            sx={{
              ml: "auto",
              display: { xs: "none", sm: "none", md: "block" },
            }}
            color="inherit"
            onClick={() => history.push("/")}
          >
            HOME
          </Button>
          <Button
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            color="inherit"
            onClick={() => history.push("/classdata")}
          >
            Class Database
          </Button>
          <Button
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            color="inherit"
            onClick={() => history.push("/create-student")}
          >
            Create Student
          </Button>
          <Button
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            color="inherit"
            onClick={() => history.push("/create-mentor")}
          >
            Create Mentor
          </Button>
          <Button
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            color="inherit"
            onClick={() => history.push("/assign-mentor")}
          >
            Assign Mentor
          </Button>
          <Button
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            color="inherit"
            onClick={() => history.push("/get-students")}
          >
            Get Students
          </Button>
          <Button
            sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            color="inherit"
            onClick={() => history.push("/assign-student")}
          >
            Assign Student
          </Button>
          <IconButton
            onClick={handleDrawerOpen}
            sx={{ display: { sm: "block", md: "none" }, ml: "auto" }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            sx={{
              width: "200px",
              height: "100%",
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: "200px",
                height: "100%",
                boxSizing: "border-box",
                backgroundColor: "#fff",
                color: "black",
                fontSize: "1em",
                fontFamily: "Pacifico",
              },
            }}
            anchor="right"
            open={opened}
          >
            <IconButton
              color="inherit"
              aria-label="close"
              component="span"
              onClick={handleDrawerClose}
              sx={{ ml: "auto" }}
            >
              <CloseIcon />
            </IconButton>
            <Button color="inherit" onClick={() => history.push("/")}>
              HOME
            </Button>
            <Button color="inherit" onClick={() => history.push("/classdata")}>
              Class Database
            </Button>
            <Button
              color="inherit"
              onClick={() => history.push("/create-student")}
            >
              Create Student
            </Button>
            <Button
              color="inherit"
              onClick={() => history.push("/create-mentor")}
            >
              Create Mentor
            </Button>
            <Button
              color="inherit"
              onClick={() => history.push("/assign-mentor")}
            >
              Assign Mentor
            </Button>
            <Button
              color="inherit"
              onClick={() => history.push("/assign-student")}
            >
              Assign Student
            </Button>
            <Button
              color="inherit"
              onClick={() => history.push("/get-students")}
            >
              Get Students
            </Button>
          </Drawer>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/classdata">
          <ClassData />
        </Route>
        <Route exact path="/create-mentor">
          <Addmentor />
        </Route>
        <Route exact path="/create-student">
          <Addstudent />
        </Route>
        <Route exact path="/assign-mentor">
          <UpdateStudent />
        </Route>
        <Route exact path="/assign-student">
          <UpdateMentor />
        </Route>
        <Route exact path="/get-students">
          <GetStudents />
        </Route>
        <Route exact path="**">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

function NotFound() {
  const history = useHistory();
  return (
    <div className="notfound">
      <img
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="notfound"
        className="notfounded"
      />
      <Button variant="contained" onClick={() => history.goBack()}>
        Back
      </Button>
    </div>
  );
}
