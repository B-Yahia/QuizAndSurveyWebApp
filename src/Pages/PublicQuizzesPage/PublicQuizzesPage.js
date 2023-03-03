import { Button, Chip, Paper, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PublicQuizzesPage.css";
import { Link, useNavigate } from "react-router-dom";

const baseURL = "http://localhost:8080/quiz/all";
function PublicQuizzesPage() {
  const [eventDetails, setEventDetails] = useState([]);
  const navigate = useNavigate();

  async function getEvents() {
    try {
      const response = await axios.get(baseURL);
      setEventDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getEvents();
    console.log(eventDetails);
  }, []);

  const startSelectedQuiz = (id) => {
    const qlink = "/quiz/" + id;
    navigate(qlink);
  };

  return (
    <div>
      <Stack className="section-container" direction="column">
        <div className="page-title"> List of the available quizzes</div>
        <Stack
          direction="column"
          justifyContent="space-around"
          alignItems="center"
          spacing={3}
        >
          {!!eventDetails &&
            eventDetails.map((item) => (
              <Paper key={item.id} elevation={3}>
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
                    <Chip label={item.title} />
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                  >
                    <div>Number of questions : </div>
                    <Chip label={item.questions.length} />
                  </Stack>
                  <Button
                    variant="contained"
                    onClick={() => startSelectedQuiz(item.id)}
                  >
                    Start{" "}
                  </Button>
                </Stack>
              </Paper>
            ))}
        </Stack>
      </Stack>
    </div>
  );
}

export default PublicQuizzesPage;
