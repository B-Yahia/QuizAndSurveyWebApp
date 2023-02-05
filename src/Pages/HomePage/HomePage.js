import { Button, Grid, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import "../CommunCss.css";

function HomePage() {
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        className="section-container "
      >
        <Grid item xs={6} className="">
          <div className="homePageTextContainer">
            <p className="homePageText">Welcome to Quiz and Survey app</p>
          </div>
        </Grid>
        <Grid item xs={6} className="n">
          <Stack
            direction="column"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
            className="n fwith"
          >
            <Stack
              className="fwith n"
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Link
                to={"/signup"}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button variant="outlined">Sign up</Button>
              </Link>
              <Link
                to={"/login"}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button variant="outlined">Sign in</Button>
              </Link>
            </Stack>

            <Stack
              className="fwith n"
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              spacing={2}
            >
              <Link
                to={"/pqp"}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <Button variant="contained">Take a quiz</Button>
              </Link>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
