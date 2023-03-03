import React from "react";
import { Stack } from "@mui/material";

function QuestionsList({ title, desc, questions }) {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={3}
    >
      <div>Title :{title}</div>
      <div>Description :{desc}</div>
      {questions.map((question) => (
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          key={question.id}
          spacing={1}
        >
          <div>* {question.statement}</div>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={1}
          >
            {question.answers.map((answer) => (
              <div key={answer.id}>- {answer.statement}</div>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}

export default QuestionsList;
