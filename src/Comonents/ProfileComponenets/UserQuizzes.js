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

function UserQuizzes(props) {
  const {
    id,
    title,
    desc,
    nmQuestions,
    nmParticipants,
    questions,
    participants,
    publicAccess,
  } = props;
  const [tab, setTab] = useState(1);
  const url = localStorage.getItem("url");
  async function removeQuiz(event, quizID) {
    event.preventDefault();
    const baseURL = "http://" + url + "/quiz/remove/";
    await axios
      .put(baseURL + quizID)
      .then(function (response) {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function publishQuiz(event, quizID) {
    event.preventDefault();
    const baseURL = "http://" + url + "/quiz/public/";
    await axios
      .put(baseURL + quizID)
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
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={3}
            >
              <Stack direction="column">
                <div>Title :</div>

                <div className="small-text">{title}</div>
              </Stack>
              <Stack direction="column">
                <div className="small-text">Num of questions :</div>
                <div>{nmQuestions}</div>
              </Stack>
              <Stack direction="column">
                <div className="small-text">num of particpant :</div>
                <div>{nmParticipants}</div>
              </Stack>
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack direction="column" spacing={1}>
              <Button
                onClick={(event) => removeQuiz(event, id)}
                variant="contained"
                size="small"
                color="error"
              >
                Remove
              </Button>
              {publicAccess ? (
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
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          {questions ? (
            <Button onClick={(e) => setTab(1)}>questions</Button>
          ) : (
            <></>
          )}
          {nmParticipants !== 0 ? (
            <Button onClick={(e) => setTab(2)}>Participant</Button>
          ) : (
            <></>
          )}
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
