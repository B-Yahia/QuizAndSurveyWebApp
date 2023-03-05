import React from "react";
import { Button, Chip, Divider, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function QuizCard({ item }) {
  const navigate = useNavigate();
  const startSelectedQuiz = (id) => {
    const qlink = "/quiz/" + id;
    navigate(qlink);
  };
  return (
    <Paper elevation={3}>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        className="questionCard"
      >
        <Stack direction="column" spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            spacing={1}
          >
            <Stack direction="column">
              <div>Title</div>
              <Chip label={item.title} />
            </Stack>
            <Stack direction="column">
              <div>Category : </div>
              <Chip label={item.category} />
            </Stack>
            <Stack direction="column">
              <div>Num of questions : </div>
              <Chip label={item.questions.length} />
            </Stack>
            <Stack direction="column">
              <div>Num of participant : </div>
              <Chip label={item.participantList.length} />
            </Stack>
          </Stack>

          {item.tags && item.tags.length > 0 && <Divider>TAGS</Divider>}
          <Stack direction="row">
            {item.tags &&
              item.tags.length > 0 &&
              item.tags.map((tagOption, index) => (
                <Chip label={tagOption} key={index} />
              ))}
          </Stack>
        </Stack>
        <Button variant="contained" onClick={() => startSelectedQuiz(item.id)}>
          Start
        </Button>
      </Stack>
    </Paper>
  );
}

export default QuizCard;
