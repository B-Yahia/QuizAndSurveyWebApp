import {
  Button,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { quizAction } from "../../Store/createQuiz-slice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CreateQuizStep1Component() {
  const [title, setTitle] = useState("");
  const [desq, setDesq] = useState("");
  const [quizStatus, setQuizStatus] = useState(true);
  const newQuiz = useSelector((state) => state.quiz);
  //   setTitle(newQuiz.quizTitle);
  //   setDesq(newQuiz.quizDescription);

  const dispatch = useDispatch();
  const saveStep1 = () => {
    dispatch(quizAction.addTitleAndDesc({ title, desq }));
    setDesq("");
    setTitle("");
    dispatch(quizAction.nextStep());
  };

  const handleStatusChange = (e) => {
    e.preventDefault();
    setQuizStatus(!quizStatus);
  };
  return (
    <Paper>
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
        <Stack
          direction="row-reverse"
          justifyContent="space-around"
          alignItems="flex-end"
        >
          <Button onClick={saveStep1}>Next</Button>
          {quizStatus ? (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch defaultChecked onChange={handleStatusChange} />
                }
                label="Public Quiz"
                labelPlacement="start"
              />
            </FormGroup>
          ) : (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch defaultChecked onChange={handleStatusChange} />
                }
                label="Privat Quiz"
                labelPlacement="start"
              />
            </FormGroup>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}

export default CreateQuizStep1Component;
