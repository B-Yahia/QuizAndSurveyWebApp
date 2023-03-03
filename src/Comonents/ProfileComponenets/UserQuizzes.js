import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import axios from "axios";
import QuestionsList from "./QuestionsList";
import ParticipantsList from "./ParticipantsList";

function UserQuizzes({
  id,
  title,
  desc,
  nmQuestions,
  nmParticipants,
  questions,
  participants,
  isPublic,
}) {
  const [tab, setTab] = useState(1);
  const removeQuizURL = "http://localhost:8080/quiz/remove/";
  const pulblishQuizURL = "http://localhost:8080/quiz/public/";
  async function removeQuiz(event, quizID) {
    console.log(quizID);

    event.preventDefault();
    await axios
      .put(removeQuizURL + quizID)
      .then(function (response) {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function publishQuiz(event, quizID) {
    console.log(quizID);

    event.preventDefault();
    await axios
      .put(pulblishQuizURL + quizID)
      .then(function (response) {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Paper className="question">
      <Accordion key={id}>
        <AccordionSummary>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={2}
          >
            <Stack direction="column">
              <div>Title :</div>
              <div>{title}</div>
            </Stack>
            <Stack direction="column">
              <div>Num of questions :</div>
              <div>{nmQuestions}</div>
            </Stack>
            <Stack direction="column">
              <div>num of particpant :</div>
              <div>{nmParticipants}</div>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Button
              onClick={(event) => removeQuiz(event, id)}
              variant="contained"
              size="small"
              color="error"
            >
              Remove
            </Button>
            {isPublic ? (
              <Button
                onClick={(event) => publishQuiz(event, id)}
                variant="contained"
                size="small"
                color="warning"
              >
                Unpublish
              </Button>
            ) : (
              <Button
                onClick={(event) => publishQuiz(event, id)}
                variant="contained"
                size="small"
                color="warning"
              >
                publish
              </Button>
            )}
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <Button onClick={(e) => setTab(1)}>questions</Button>
          <Button onClick={(e) => setTab(2)}>Participant</Button>
          <Divider />
          {(() => {
            switch (tab) {
              case 1:
                return (
                  <QuestionsList
                    title={title}
                    desc={desc}
                    questions={questions}
                  />
                );
              case 2:
                return <ParticipantsList participants={participants} />;
              default:
                return null;
            }
          })()}
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default UserQuizzes;
