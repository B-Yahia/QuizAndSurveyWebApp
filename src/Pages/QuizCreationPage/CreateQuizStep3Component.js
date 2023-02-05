import { Chip, Divider, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { quizAction } from "../../Store/createQuiz-slice";

function CreateQuizStep3Component() {
  const quiz = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const removeAnswer = (QId, AId) => {
    dispatch(quizAction.removeAnswerfromQuestion(QId, AId));
  };

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      spacing={2}
    >
      <Paper className="small-section">
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
        >
          <div>{quiz.quizTitle}</div>
          <div>{quiz.quizDescription}</div>
        </Stack>
      </Paper>
      <Paper>
        <Stack>
          {quiz.questions.map((item, index) => (
            <Stack
              key={index}
              direction="column"
              justifyContent="space-around"
              alignItems="stretch"
              spacing={3}
            >
              <div className="question-statement">-{item.statement}</div>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              >
                {item.answers.map((answer, AnswerIndex) => (
                  <Chip
                    key={AnswerIndex}
                    label={answer}
                    onDelete={() => removeAnswer(index, AnswerIndex)}
                  />
                ))}
              </Stack>
              <Divider />
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}

export default CreateQuizStep3Component;
