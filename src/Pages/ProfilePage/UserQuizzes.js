import React from "react";
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

function UserQuizzes({
  id,
  title,
  desc,
  nmQuestions,
  nmParticipants,
  questions,
}) {
  const removeQuizURL = "http://localhost:8080/quiz/remove/";
  async function removeQuiz(event, quizID) {
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
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={3}
          >
            <div>Title :{title} </div>
            <div>Description :{desc}</div>
            {questions.map((question) => (
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                key={question.id}
                spacing={1}
              >
                <div>* {question.questionStatement}</div>
                <Stack
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                  spacing={1}
                >
                  {question.answers.map((answer) => (
                    <div key={answer.Id}>- {answer.answerStatement}</div>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default UserQuizzes;
