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
} from "@mui/material";
import "./QuizPage.css";

function QuizPage1() {
  const callURL = "http://quizsurveyapp-production.up.railway.app/quiz/";
  const postURL =
    "http://quizsurveyapp-production.up.railway.app/participant/add/";
  const [msg, setMgg] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [score, setScore] = useState(0);
  const [Index, setIndex] = useState(0);
  const [eventDetails, setEventDetails] = useState();
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
      firstName: fname,
      lastName: lname,
      score: score,
    };
    await axios
      .post(postURL + params.id, user)
      .then(function (response) {
        console.log(response);
        setFname("");
        setLname("");
        setMgg("");
        setScore(0);
        setIndex(0);
        navigate("/pqp");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const nextQuestion = (event) => {
    event.preventDefault();
    const theV = event.target.value;
    if (theV == eventDetails.questions[Index].correctAnswer.statement) {
      setScore((prevScore) => prevScore + 1);
      setMgg("correct");
      if (Index < eventDetails.questions.length - 1) {
        setIndex(Index + 1);
      } else {
        setMgg("test finish");
      }
    } else {
      setMgg("incorrect");
      if (Index < eventDetails.questions.length - 1) {
        setIndex(Index + 1);
      } else {
        setMgg("test finish");
      }
    }
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
                  setFname(event.target.value);
                }}
                value={fname}
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="Last name"
                variant="outlined"
                onChange={(event) => {
                  setLname(event.target.value);
                }}
                value={lname}
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
                    <RadioGroup
                      className="radio-group"
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      onChange={(e) => {
                        nextQuestion(e);
                      }}
                    >
                      {eventDetails.questions[Index].answers.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          value={item.statement}
                          control={<Radio />}
                          label={item.statement}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Paper>
              </div>
            )}
          </div>
        )}
        {Index != 0 ? (
          <Stack direction="row" spacing={4}>
            <div>
              Score : <Chip label={score} />
            </div>
            <div>
              {Index}/{eventDetails.questions.length}
            </div>
          </Stack>
        ) : (
          <Chip label="Please select a choice" />
        )}
      </Stack>
    </div>
  );
}

export default QuizPage1;
