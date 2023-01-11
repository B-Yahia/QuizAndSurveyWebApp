import { Button, Grid } from "@mui/material";
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
        className="section-container"
      >
        <Grid item>
          <div className="homePageTextContainer">
            <p className="homePageText">Welcome to Quiz and Survey app</p>
          </div>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Link to={"/signup"}>
                <Button>Sign up</Button>
              </Link>
              <Link to={"/login"}>
                <Button>Sign in</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to={"/pqp"}>
                <Button>Take a quiz</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
