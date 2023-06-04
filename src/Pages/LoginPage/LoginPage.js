import React, { useState } from "react";
import axios from "axios";
import "../CommunCss.css";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  // const baseURL = "http://quizsurveyapp-production.up.railway.app/auth/login";
  const baseURL = "http://localhost:8080/auth/login";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logUser = async () => {
    setError("");
    const log = {
      username: username,
      password: password,
    };

    await axios
      .post(baseURL, log)
      .then(function (response) {
        console.log(response);
        const userId = response.data.id;
        localStorage.setItem("userId", userId);
        navigate("/profile");
      })
      .catch((error) => {
        setError("Incorrect username and/or password.")
      });
  };

  return (
    <div>
      <Stack
        className="section-container"
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
      >
        <div className="page-title">Login page</div>
        <Stack
          direction="column"
          justifyContent="space-evenly"
          alignItems="stretch"
          spacing={2}
        >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type={"password"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />

          <Stack>
            {error !== "" ? (
              <Alert severity="warning">{error}</Alert>
            ) : (
            <></>
            )}
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={0.5}
          >
            <Link to={"/"}>
              <Button>home page</Button>
            </Link>
            <Link to={"/login"}>
              <Button onClick={logUser}>Login</Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default LoginPage;
