import {
  Alert,
  Button,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../CommunCss.css";
import "./QuizCreationPage.css";

function QuizCreationPage() {
  const baseURL = "http://localhost:8080/quiz/create/";

  const [title, setTitle] = useState("");
  const [desq, setDesq] = useState("");
  const [quizStatus, setQuizStatus] = useState(true);
  const [questionsList, setQuestionsList] = useState([]);
  const [questionStatement, setQuestionStatement] = useState("");
  const [answer, setAnswer] = useState("");
  const [answersList, setAnswersList] = useState([]);
  const params = useParams();
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
        public: quizStatus,
      };
      console.log(quiz);
      await axios
        .post(baseURL + params.id, quiz)
        .then(function (response) {
          setErrorMsg("Quiz saved");
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
          setErrorMsg("something  went wrong");
        });
    } else {
      setErrorMsg("The quiz can not have less than two questions");
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
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <div className="page-title">Create your quiz</div>
            <Link
              to={"/profile/" + params.id}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button variant="outlined">Back to profile</Button>
            </Link>
          </Stack>
        </Grid>
        <Grid item>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Paper className="sm-sections">
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
            </Paper>
            <Paper className="sm-sections">
              <Stack direction="column" spacing={4} className="small-section">
                <div>
                  {errorMsg === "Quiz saved" ? (
                    <Alert variant="filled" severity="success">
                      {errorMsg}
                    </Alert>
                  ) : (
                    <></>
                  )}
                </div>
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
                      <Alert severity="info">
                        Add the correct answer first (Please note that the
                        answers will be shuffled )
                      </Alert>
                    </div>
                  ) : (
                    newAnswersList
                  )}
                </Stack>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item xs={7}>
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
                  {questionStatement.length <= 3 ? (
                    <Grid item xs={4}>
                      <Alert severity="info">Write the question first</Alert>
                    </Grid>
                  ) : (
                    <Grid item xs={2}>
                      <Button onClick={addAnswerToList}>Add the answer</Button>
                    </Grid>
                  )}
                </Grid>
                {newAnswersList.length >= 2 ? (
                  <Button onClick={addQuestionToList} variant="outlined">
                    add question to the list
                  </Button>
                ) : (
                  <Button
                    onClick={addQuestionToList}
                    disabled
                    variant="contained"
                  >
                    add question to the list
                  </Button>
                )}
              </Stack>
            </Paper>
            <Paper className="sm-sections">
              <Stack direction="column" spacing={2} className="small-section">
                {questionsList.length === 0 ? (
                  <div>No question created yet</div>
                ) : (
                  createdQuestions
                )}
              </Stack>
            </Paper>
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
