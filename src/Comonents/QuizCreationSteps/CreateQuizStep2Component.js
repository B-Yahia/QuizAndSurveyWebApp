import {
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quizAction } from "../../Store/createQuiz-slice";
import WarningMessage from "../WarningMessageComponent/WarningMessage";

function CreateQuizStep2Component() {
  const [questionStatement, setQuestionStatement] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [answersList, setAnswersList] = useState([]);
  const [warningMsg, setWarningMsg] = useState("");
  const dispatch = useDispatch();
  const newQuiz = useSelector((state) => state.quiz);

  const addToAnswersList = (e) => {
    const newAnswer = {
      statement: answer,
    };
    answersList.push(newAnswer);
    setAnswer("");
  };
  const addQuestionToList = (e) => {
    setWarningMsg("");
    e.preventDefault();
    if (correctAnswer != "") {
      const newQuestion = {
        questionStatement: questionStatement,
        answers: answersList,
        correctAnswer: { statement: correctAnswer },
      };
      dispatch(quizAction.addQuestion({ newQuestion }));
      setQuestionStatement("");
      setAnswersList([]);
      setCorrectAnswer("");
    } else {
      setWarningMsg("Please select correct answer");
    }
  };
  const nextStep = (e) => {
    e.preventDefault();
    dispatch(quizAction.nextStep());
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && answer != "") {
      addToAnswersList(event);
    }
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
              onKeyDown={handleKeyDown}
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
              value={answer}
            />
          </Grid>
          <Grid item xs={3}>
            {questionStatement.length >= 10 ? (
              <Button
                onClick={addToAnswersList}
                size="small"
                variant="outlined"
              >
                add answer
              </Button>
            ) : (
              <Button
                onClick={addToAnswersList}
                size="small"
                variant="outlined"
                disabled
              >
                add answer
              </Button>
            )}
          </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Answers (Please select which once is the correct answer)
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(event) => {
                setCorrectAnswer(event.target.value);
              }}
            >
              {answersList.map((answer, index) => (
                <FormControlLabel
                  key={index}
                  label={answer.statement}
                  control={<Radio />}
                  value={answer.statement}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Stack>
        <Divider />
        <div>
          Number of questions added to the quiz is : {newQuiz.questions.length}
        </div>
        {warningMsg.length >= 1 ? <WarningMessage msg={warningMsg} /> : <></>}
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {answersList.length >= 2 ? (
            <Button variant="contained" onClick={addQuestionToList}>
              Add question
            </Button>
          ) : (
            <Button variant="contained" onClick={addQuestionToList} disabled>
              Add question
            </Button>
          )}

          <Button variant="contained" onClick={nextStep}>
            View quiz
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export default CreateQuizStep2Component;
