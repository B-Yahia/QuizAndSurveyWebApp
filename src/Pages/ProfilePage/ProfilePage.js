import { Box, Button, Modal, Paper, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProfilePage() {
  const baseURL = "http://localhost:8080/user/1";
  const baseURL2 = "http://localhost:8080/quiz/userQuizzes/1";
  const [eventDetails, setEventDetails] = useState();
  const [eventDetails2, setEventDetails2] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function getEvents() {
    try {
      axios.all([axios.get(baseURL), axios.get(baseURL2)]).then(
        axios.spread((response1, response2) => {
          console.log(response1.data);
          setEventDetails(response1.data);
          console.log("//");
          console.log(response2.data);
          setEventDetails2(response2.data);
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

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

  return (
    <div>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        className="section-container"
      >
        <div className="page-title">Profile Page</div>
        {!!eventDetails && (
          <Paper className="question">
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              spacing={1}
            >
              <div>
                Name :{eventDetails.firstName} {eventDetails.lastName}
              </div>
              <div>Username : {eventDetails.username}</div>
              <div>{eventDetails.email}</div>
              <div>{eventDetails.dateOfBirth}</div>
            </Stack>
          </Paper>
        )}
        <div className="page-title">List of quizzes created by me</div>
        {!!eventDetails2 &&
          eventDetails2.map((item) => (
            <Paper className="question">
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={1}
                key={item.quizId}
              >
                <div>Title :{item.quizTitle}</div>
                <div>Num of questions :{item.questions.length}</div>
                <div>num of particpant :{item.participantList.length}</div>

                <Button onClick={handleOpen}>view</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={3}
                    >
                      <div>Title :{item.quizTitle}</div>
                      <div>Description :{item.quizDescription}</div>
                      {item.questions.map((question) => {
                        if (question.available) {
                          return (
                            <Stack
                              direction="column"
                              justifyContent="flex-start"
                              alignItems="center"
                              key={question.questionId}
                              spacing={1}
                            >
                              <div>-{question.questionStatement}</div>
                              <Stack
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                                spacing={1}
                              >
                                {question.answers.map((answer) => (
                                  <div key={answer.answerId}>
                                    *{answer.answerStatement}
                                  </div>
                                ))}
                              </Stack>
                            </Stack>
                          );
                        }
                        return null;
                      })}
                    </Stack>
                  </Box>
                </Modal>
              </Stack>
            </Paper>
          ))}
      </Stack>
    </div>
  );
}

export default ProfilePage;
