import { Button, Chip, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PublicQuizzesPage.css";
import { Link } from "react-router-dom";

const baseURL = "http://localhost:8080/quiz/getAll";
function PublicQuizzesPage() {
  const [eventDetails, setEventDetails] = useState([]);

  function getEvents() {
    axios
      .get(baseURL)
      .then((response) => response.data)
      .then((data) => {
        setEventDetails(data);
        console.log(data);
      });
  }

  useEffect(() => {
    getEvents();
  }, [eventDetails]);

  return (
    <div>
      <Stack className="section-container" direction="column">
        <div className="page-title"> List of the availble quizes</div>
        <Stack
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          spacing={3}
        >
          {!!eventDetails &&
            eventDetails.map((item) => (
              <Paper key={item.quizId} elevation={3}>
                <Stack
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={2}
                  className="questionCard"
                >
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                  >
                    <div>Title</div>
                    <Chip label={item.quizTitle} />
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                  >
                    <div>Number of question</div>
                    <Chip label={item.questions.length} />
                  </Stack>
                  <Button variant="contained">Start </Button>
                </Stack>
              </Paper>
            ))}
        </Stack>
      </Stack>
    </div>
  );
}

export default PublicQuizzesPage;
