import {
  Button,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CommunCss.css";
import "./QuizCreationPage.css";

function QuizCreationPage() {
  const baseURL = "http://localhost:8080/quiz/create/1";

  const [title, setTitle] = useState("");
  const [desq, setDesq] = useState("");
  const [quizStatus, setQuizStatus] = useState(true);
  const [questionsList, setQuestionsList] = useState([]);
  const [questionStatement, setQuestionStatement] = useState("");
  const [answer, setAnswer] = useState("");
  const [answersList, setAnswersList] = useState([]);
  const [question, setQuestion] = useState({
    questionStatement: "",
    answers: [],
  });
  const [errorMsg, setErrorMsg] = useState("");

  const addAnswerToList = (e) => {
    e.preventDefault();
    const newAnswer = {
      answerStatement: answer,
    };
    answersList.push(newAnswer);
    setAnswer("");
  };

  const addQuestionToList = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (answersList.length >= 2) {
      const newQuestion = {
        questionStatement: questionStatement,
        answers: answersList,
      };
      questionsList.push(newQuestion);
      console.log(questionsList);
      setQuestionStatement("");
      setAnswer("");
      setAnswersList([]);
    } else {
      setErrorMsg("The question can not have less than two answers");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setQuizStatus(!quizStatus);
  };

  const saveQuiz = async (e) => {
    e.preventDefault();
    if (questionsList.length >= 2) {
      const quiz = {
        quizTitle: title,
        quizDescription: desq,
        questions: questionsList,
        privateStatus: quizStatus,
      };
      console.log(quiz);
      await axios
        .post(baseURL, quiz)
        .then(function (response) {
          setErrorMsg("it worked");
          console.log(response);
          setAnswer("");
          setAnswersList([]);
          setDesq("");
          setQuestion({
            questionStatement: "",
            answers: [],
          });
          setQuestionStatement("");
          setTitle("");
          setQuestionsList([]);
        })
        .catch(function (error) {
          console.log(error);
          setErrorMsg("something  went wrong");
        });
    } else {
      setErrorMsg("The quiz can not have les than two questions");
    }
  };

  const newAnswersList = answersList.map((an, index) => (
    <div key={index}>
      {index + 1}-{an.answerStatement}
    </div>
  ));

  const createdQuestions = questionsList.map((q, index) => (
    <div>
      <div key={index}>
        {index + 1} - {q.questionStatement}
      </div>
      <div>
        {q.answers.map((a, answerIndex) => (
          <div key={answerIndex}>
            <Chip label={a.answerStatement} />
          </div>
        ))}
      </div>
    </div>
  ));
  return (
    <div>
      <Grid className="section-container" direction="column" container>
        <Grid item>
          <Stack justifyContent="space-evenly" direction="row">
            <div className="page-title">Create your quiz</div>{" "}
            <Link to={"/"}>
              <Button>Go to home page</Button>
            </Link>
          </Stack>
        </Grid>
        <Grid item>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="column" spacing={2} className="small-section">
              <TextField
                id="outlined-basic"
                label="Quiz title"
                variant="outlined"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
              />
              <TextField
                id="outlined-basic"
                label="Please write your description here"
                variant="outlined"
                onChange={(event) => {
                  setDesq(event.target.value);
                }}
                value={desq}
                multiline
                minRows={2}
              />
              <FormGroup>
                <FormControlLabel
                  control={<Switch defaultChecked onChange={handleChange} />}
                  label="Make the quiz public"
                  labelPlacement="start"
                />
              </FormGroup>
            </Stack>
            <Stack direction="column" spacing={4} className="small-section">
              <div>{errorMsg}</div>
              <TextField
                id="outlined-basic"
                label="Please write the question here"
                variant="outlined"
                onChange={(event) => {
                  setQuestionStatement(event.target.value);
                }}
                value={questionStatement}
              />

              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
              >
                {answersList.length === 0 ? (
                  <div>
                    Add the correct answer first (Please note that the answers
                    will be shuffled )
                  </div>
                ) : (
                  newAnswersList
                )}
              </Stack>
              <Grid container>
                <Grid item xs={8}>
                  <TextField
                    className="inpuField"
                    id="outlined-basic"
                    label="Answer "
                    variant="outlined"
                    onChange={(event) => {
                      setAnswer(event.target.value);
                    }}
                    value={answer}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button onClick={addAnswerToList}>Add the answer</Button>
                </Grid>
              </Grid>
              <Button onClick={addQuestionToList}>
                add question to the list
              </Button>
            </Stack>
            <Stack direction="column" spacing={2} className="small-section">
              {questionsList.length == 0 ? (
                <div>No question created yet</div>
              ) : (
                createdQuestions
              )}
            </Stack>
            <Stack direction="column" spacing={2} className="small-section">
              <Button onClick={saveQuiz} variant="contained">
                {" "}
                Save Quiz
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

export default QuizCreationPage;
