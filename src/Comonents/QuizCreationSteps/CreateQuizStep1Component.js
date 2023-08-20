import {
  Autocomplete,
  Button,
  Chip,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { quizAction } from "../../Store/createQuiz-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import WarningMessage from "../WarningMessageComponent/WarningMessage";

function CreateQuizStep1Component() {
  const [title, setTitle] = useState("");
  const [desq, setDesq] = useState("");
  const [quizStatus, setQuizStatus] = useState(true);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [warningMsg, setWarningMsg] = useState("");

  const quizTopics = [
    "General Knowledge",
    "History",
    "Geography",
    "Science",
    "Mathematics",
    "Literature",
    "Music",
    "Sports",
    "Art",
    "Movies and TV",
    "Technology",
    "Politics",
    "Animals",
    "Food and Drink",
    "Fashion",
    "Business and Finance",
    "Environment",
    "Social Issues",
    "Travel",
    "Languages",
    "Humanities",
    "Mythology",
    "Philosophy",
    "Religion",
    "Pop Culture",
  ];

  const dispatch = useDispatch();
  const saveStep1 = () => {
    dispatch(quizAction.addTitleAndDesc({ title, desq, category, tags }));
    setDesq("");
    setTitle("");
    dispatch(quizAction.nextStep());
  };
  const addTagToList = (event) => {
    event.preventDefault();
    if (tag.length >= 1) {
      const newTag = tag;
      setTags([...tags, newTag]);
      console.log(tags);
      setTag("");
    } else {
      setWarningMsg("The tag can not be empty");
    }
  };
  const handleKeyDown = (event) => {
    setWarningMsg("");
    if (event.key === "Enter") {
      addTagToList(event);
    }
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

        <Autocomplete
          value={category}
          onChange={(event, newValue) => {
            setCategory(newValue);
          }}
          options={quizTopics}
          renderInput={(params) => (
            <TextField {...params} label="Quiz category" />
          )}
        />
        <TextField
          fullWidth
          label="Please write the Tags here"
          variant="outlined"
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            setTag(event.target.value);
          }}
          value={tag}
        />
        <Stack direction="row" justifyContent="start" alignItems="center">
          {tags.map((tagOption, index) => (
            <Chip key={index} label={tagOption} />
          ))}
        </Stack>
        {warningMsg.length >= 1 ? <WarningMessage msg={warningMsg} /> : <></>}
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
          {title.length !== 0 && category !== "" ? (
            <Button onClick={saveStep1}>Next</Button>
          ) : (
            <></>
          )}
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
