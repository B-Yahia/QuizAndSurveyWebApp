import { Box, Button, Modal, Chip, Stack, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quizAction } from "../../Store/createQuiz-slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function QuizModal(props) {
  const quiz = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addAnswer = () => {
    const question = quiz.questions[props.QuestionId];
    const newAnswers = [...question.answers];
    newAnswers.push({ answerStatement: answer });
    const QId = props.QuestionId;
    const newQuestion = { ...question, answers: newAnswers };
    console.log(newQuestion);
    dispatch(quizAction.EditAnswerfromQuestion({ QId, newQuestion }));
    setAnswer("");
    setOpen(false);
  };

  return (
    <div>
      <Chip label="+" onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Please write the answer here"
              variant="outlined"
              onChange={(event) => {
                setAnswer(event.target.value);
              }}
              value={answer}
            />
            <Button onClick={addAnswer}>Add Answer</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default QuizModal;
