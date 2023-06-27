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
  const [answersList, setAnswersList] = useState([]);
  const [warningMsg, setWarningMsg] = useState("");
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const dispatch = useDispatch();
  const newQuiz = useSelector((state) => state.quiz);

  const addToAnswersList = (e) => {
    const newAnswer = {
      statement: answer,
      correct: false,
    };
    answersList.push(newAnswer);
    setAnswer("");
  };
  const checkHowManyCorrectAnswer = () => {
    const count = answersList.filter((answer) => answer.correct).length;
    setNumberOfCorrectAnswers(count);
  };
  const addQuestionToList = (e) => {
    setWarningMsg("");
    e.preventDefault();
    checkHowManyCorrectAnswer();
    console.log(numberOfCorrectAnswers);
    console.log(answersList);
    if (numberOfCorrectAnswers >= 1) {
      const newQuestion = {
        statement: questionStatement,
        answers: answersList,
      };
      dispatch(quizAction.addQuestion({ newQuestion }));
      setQuestionStatement("");
      setAnswersList([]);
    } else {
      setWarningMsg("Please select correct answer");
    }
  };
  const changeAnswerStatus = (index, newValue) => {
    const updatedAnswersList = [...answersList];
    updatedAnswersList[index].correct = newValue === "true";
    setAnswersList(updatedAnswersList);
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
          </FormControl>
          {answersList.map((answer, index) => (
            <FormControl key={index}>
              <FormLabel id="demo-radio-buttons-group-label">
                {answer.statement}
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={answer.correct ? "true" : "false"}
                onChange={(event) =>
                  changeAnswerStatus(index, event.target.value)
                }
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="true"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="false"
                />
              </RadioGroup>
            </FormControl>
          ))}
        </Stack>
        <Divider />
        <div>
          Number of questions added to the quiz is: {newQuiz.questions.length}
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
