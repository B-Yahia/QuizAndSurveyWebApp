import {
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quizAction } from "../../Store/createQuiz-slice";

function CreateQuizStep2Component() {
  const [questionStatement, setQuestionStatement] = useState("");
  const [answer, setAnswer] = useState("");
  const [answersList, setAnswersList] = useState([]);
  const dispatch = useDispatch();
  const newQuiz = useSelector((state) => state.quiz);

  const addToAnswersList = (e) => {
    e.preventDefault();
    const newAnswer = {
      answerStatement: answer,
    };
    answersList.push(newAnswer);
    setAnswer("");
  };
  const addQuestionToList = (e) => {
    e.preventDefault();
    const newQuestion = {
      questionStatement: questionStatement,
      answers: answersList,
    };
    dispatch(quizAction.addQuestion({ newQuestion }));
    setQuestionStatement("");
    setAnswersList([]);
  };
  const nextStep = (e) => {
    e.preventDefault();
    dispatch(quizAction.nextStep());
  };

  return (
    <Paper>
      <Stack direction="column" spacing={2} className="small-section">
        <TextField
          id="outlined-basic"
          label="Please write the question here"
          variant="outlined"
          onChange={(event) => {
            setQuestionStatement(event.target.value);
          }}
          value={questionStatement}
        />
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Please write the answer here"
              variant="outlined"
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
              value={answer}
            />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={addToAnswersList} size="small" variant="outlined">
              add answer
            </Button>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {answersList.map((answer, index) => (
            <Chip key={index} label={answer.answerStatement} />
          ))}
        </Stack>
        <Divider />
        <div>
          {" "}
          Number of questions added to the quiz is : {newQuiz.questions.length}
        </div>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button variant="contained" onClick={addQuestionToList}>
            Add question
          </Button>
          <Button variant="contained" onClick={nextStep}>
            View quiz
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default CreateQuizStep2Component;
