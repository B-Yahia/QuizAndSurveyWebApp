import { Button, Chip, Divider, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import QuizModal from "../Modal/QuizModal";
import { quizAction } from "../../Store/createQuiz-slice";

function CreateQuizStep3Component() {
  const quiz = useSelector((state) => state.quiz);
  console.log(quiz);
  const dispatch = useDispatch();
  const removeAnswer = (QId, AId) => {
    const question = quiz.questions[QId];
    const newAnswers = [...question.answers];
    newAnswers.splice(AId, 1);
    const newQuestion = { ...question, answers: newAnswers };

    dispatch(quizAction.EditAnswerfromQuestion({ newQuestion, QId }));
  };
  const removeQuestionFromQuiz = (questionIndex) => {
    dispatch(quizAction.removeQuestion(questionIndex));
  };
  const backToStep2 = (e) => {
    e.preventDefault();
    dispatch(quizAction.previousStep());
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
          alignItems="center"
          minHeight="50px"
        >
          <Paper elevation={2}>
            <div>{quiz.title}</div>
          </Paper>
          <Paper elevation={1}>
            <div>{quiz.description}</div>
          </Paper>
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
              className="question-container"
            >
              <Stack
                className="question-statement"
                direction="row"
                justifyContent="space-between"
                alignItems="stretch"
              >
                <div>-{item.statement}</div>
                <Button
                  color="error"
                  size="small"
                  variant="contained"
                  onClick={() => removeQuestionFromQuiz(index)}
                >
                  remove
                </Button>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
              >
                {item.answers.map((answer, AnswerIndex) => (
                  <Chip
                    key={AnswerIndex}
                    label={answer.statement}
                    onDelete={() => removeAnswer(index, AnswerIndex)}
                  />
                ))}

                <QuizModal QuestionId={index} />
              </Stack>
            </Stack>
          ))}
          <Button onClick={backToStep2}>Add question</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default CreateQuizStep3Component;
