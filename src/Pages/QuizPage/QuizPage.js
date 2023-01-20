import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import "./QuizPage.css";

function QuizPage() {
  const callURL = "http://localhost:8080/quiz/getbyid/";
  const [value, setValue] = useState("");
  const [eventDetails, setEventDetails] = useState();
  const params = useParams();
  const paramsString = params.id;
  const baseURL = callURL + paramsString;

  async function getEvents() {
    try {
      const response = await axios.get(baseURL);
      setEventDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getEvents();
    console.log(eventDetails);
  }, []);

  function handleChange(event) {
    setValue(event.target.value);
    console.log(value);
  }

  return (
    <div>
      <Stack className="section-container" direction="column" spacing={2}>
        <div className="page-title">QuizPage </div>

        {!!eventDetails && (
          <Stack direction="column" spacing={4}>
            <div>Quiz title : {eventDetails.quizTitle}</div>
            <div>Quiz description : {eventDetails.quizDescription}</div>
            <FormControl>
              {eventDetails.questions.map((item) => (
                <Stack
                  key={item.questionId}
                  direction="column"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Paper className="question" elevation={3}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      - {item.questionStatement}
                    </FormLabel>
                    <RadioGroup
                      className="radio-group"
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      {item.answers.map((itema) => (
                        <FormControlLabel
                          value={itema.answerStatement}
                          key={itema.answerId}
                          control={<Radio />}
                          label={itema.answerStatement}
                        />
                      ))}
                    </RadioGroup>
                  </Paper>
                </Stack>
              ))}
            </FormControl>
          </Stack>
        )}
      </Stack>
    </div>
  );
}

export default QuizPage;
