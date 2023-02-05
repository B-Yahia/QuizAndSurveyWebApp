import { Button, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import UserQuizzes from "./UserQuizzes";

function ProfilePage() {
  const baseURL = "http://localhost:8080/user/";
  const baseURL2 = "http://localhost:8080/quiz/userQuizzes/";
  const [eventDetails, setEventDetails] = useState();
  const [eventDetails2, setEventDetails2] = useState();

  const params = useParams();
  const navigate = useNavigate();

  async function getEvents() {
    try {
      axios
        .all([axios.get(baseURL + params.id), axios.get(baseURL2 + params.id)])
        .then(
          axios.spread((response1, response2) => {
            setEventDetails(response1.data);
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

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
    navigate("/");
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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div className="page-title">Profile Page</div>
          <Button onClick={removeTokenFromLocalStorage}>Logout</Button>
        </Stack>
        {!!eventDetails && (
          <UserDetails
            firstName={eventDetails.firstName}
            lastName={eventDetails.lastName}
            username={eventDetails.username}
            dob={eventDetails.dateOfBirth}
          />
        )}
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <div className="page-title">List of quizzes created by me</div>
          <Link
            to={"/create-quiz/" + params.id}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button variant="contained" size="small">
              Create new quiz
            </Button>
          </Link>
        </Stack>
        {!!eventDetails2 &&
          eventDetails2.map((item) => (
            <UserQuizzes
              id={item.id}
              title={item.quizTitle}
              nmQuestions={item.questions.length}
              nmParticipants={item.participantList.length}
              desc={item.quizDescription}
              questions={item.questions}
            />
          ))}
      </Stack>
    </div>
  );
}

export default ProfilePage;
