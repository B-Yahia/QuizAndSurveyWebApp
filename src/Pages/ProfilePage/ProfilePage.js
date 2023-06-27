import { Button, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LogoutButton from "../../Comonents/Buttons/LogoutButton";
import UserDetails from "../../Comonents/ProfileComponenets/UserDetails";
import UserQuizzes from "../../Comonents/ProfileComponenets/UserQuizzes";

function ProfilePage() {
  const url = localStorage.getItem("url");
  const baseURL = "http://" + url + "/author/";
  const [eventDetails, setEventDetails] = useState();
  const navigate = useNavigate();

  const params = useParams();

  async function getEvents() {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    if (userId) {
      axios
        .get(baseURL + userId)
        .then(function (response) {
          console.log(response.data);
          setEventDetails(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

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
          <>
            <LogoutButton />
            <Link
              to={"/"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button variant="outlined">home page</Button>
            </Link>
          </>
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
            to={"/create-quiz"}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button variant="contained" size="small">
              Create new quiz
            </Button>
          </Link>
        </Stack>

        {!!eventDetails &&
          eventDetails.quizzes.map((item) => (
            <UserQuizzes
              key={item.id}
              id={item.id}
              title={item.title}
              nmQuestions={item.questions ? item.questions.length : 0}
              nmParticipants={
                item.participantList ? item.participantList.length : 0
              }
              participants={item.participantList}
              desc={item.description}
              questions={item.questions}
              publicAccess={item.publicAccess}
            />
          ))}
      </Stack>
    </div>
  );
}

export default ProfilePage;
