import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Button,
  Chip,
  FormGroup,
  Checkbox,
} from "@mui/material";
import "./QuizPage.css";

function QuizPage() {
  const url = localStorage.getItem("url");
  const callURL = "http://" + url + "/quiz/";
  const postURL = "http://" + url + "/participant";
  const [msg, setMgg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Index, setIndex] = useState(0);
  const [eventDetails, setEventDetails] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [questionResponseList, setQuestionResponseList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  async function getEvents() {
    try {
      const response = await axios.get(callURL + params.id);
      setEventDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const sendAnswer = async () => {
    const user = {
      firstName: firstName,
      lastName: lastName,
      questionResponseList: questionResponseList,
      quizId: eventDetails.id,
    };
    await axios
      .post(postURL, user)
      .then(function (response) {
        console.log(response);
        setFirstName("");
        setLastName("");
        setMgg("");
        setIndex(0);
        setQuestionResponseList([]);
        navigate("/all-quizzes");
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(user);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const MoveToTheNext = () => {
    if (selectedAnswers.length === 0) {
      setMgg("Please select at least one answer");
    } else {
      if (Index < eventDetails.questions.length - 1) {
        const questionResponse = {
          questionDTO: eventDetails.questions[Index],
          selectedAnswerIds: selectedAnswers,
        };
        setQuestionResponseList([...questionResponseList, questionResponse]);
        setIndex(Index + 1);
      } else {
        const questionResponse = {
          questionDTO: eventDetails.questions[Index],
          selectedAnswerIds: selectedAnswers,
        };
        setQuestionResponseList([...questionResponseList, questionResponse]);
        setMgg("test finish");
      }
    }
    console.log(questionResponseList);
    setSelectedAnswers([]);
  };
  const addResponseOfCheckBox = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (selectedAnswers.length === 0) {
      selectedAnswers.push(value);
    } else {
      if (selectedAnswers.includes(value)) {
        setSelectedAnswers(selectedAnswers.filter((item) => item !== value));
      } else {
        setSelectedAnswers([...selectedAnswers, value]);
      }
    }
  };

  const addResponseOfRadioButton = (e) => {
    e.preventDefault();
    const answer = [e.target.value];
    setSelectedAnswers(answer);
  };

  return (
    <div>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        className="section-container"
      >
        <div className="page-title">quiz page</div>

        {msg === "test finish" ? (
          <Paper className="question">
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                id="outlined-basic"
                label="First name"
                variant="outlined"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                value={firstName}
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Last name"
                variant="outlined"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                value={lastName}
                size="small"
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={sendAnswer}
              >
                Send
              </Button>
            </Stack>
          </Paper>
        ) : (
          <div>
            {!!eventDetails && (
              <div>
                <div>{eventDetails.title}</div>
                <div>{eventDetails.description}</div>
                <Paper className="question" elevation={3}>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      {eventDetails.questions[Index].statement}
                    </FormLabel>
                    {parseInt(
                      eventDetails?.questions?.[Index]?.numberOfCorrectAnswers
                    ) > 1 ? (
                      <FormGroup
                        onChange={(e) => {
                          addResponseOfCheckBox(e);
                        }}
                      >
                        {eventDetails?.questions?.[Index]?.answers?.map(
                          (answer) => (
                            <FormControlLabel
                              key={answer.id}
                              control={<Checkbox />}
                              label={answer.statement}
                              value={answer.id}
                            />
                          )
                        )}
                      </FormGroup>
                    ) : (
                      <RadioGroup
                        className="radio-group"
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        onChange={(e) => {
                          addResponseOfRadioButton(e);
                        }}
                      >
                        {eventDetails?.questions?.[Index]?.answers?.map(
                          (answer) => (
                            <FormControlLabel
                              key={answer.id}
                              value={answer.id}
                              control={<Radio />}
                              label={answer.statement}
                            />
                          )
                        )}
                      </RadioGroup>
                    )}
                  </FormControl>
                </Paper>
              </div>
            )}
          </div>
        )}
        {Index !== 0 ? (
          <Stack direction="row" spacing={4}>
            <div>
              {Index + 1 === eventDetails.questions.length ? (
                <></>
              ) : (
                <>
                  {Index}/{eventDetails.questions.length}
                </>
              )}
            </div>
            <div>
              <Button onClick={() => MoveToTheNext()}>Next</Button>
            </div>
          </Stack>
        ) : (
          <Stack direction="row" spacing={4}>
            {msg.length === 0 ? <></> : <Chip label={msg} />}

            <Button onClick={() => MoveToTheNext()}>Next</Button>
          </Stack>
        )}
      </Stack>
    </div>
  );
}

export default QuizPage;
