import { Button, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LogoutButton from "../../Comonents/Buttons/LogoutButton";
import UserDetails from "../../Comonents/ProfileComponenets/UserDetails";
import UserQuizzes from "../../Comonents/ProfileComponenets/UserQuizzes";

function ProfilePage() {
  const baseURL = "http://localhost:8080/user/";
  const baseURL2 = "http://localhost:8080/quiz/user/";
  const [eventDetails, setEventDetails] = useState();
  const [eventDetails2, setEventDetails2] = useState();
  const navigate = useNavigate();

  const params = useParams();

  async function getEvents() {
  
    const userId = localStorage.getItem('userId');
    console.log(userId)
    if (userId) {
      try {
        axios
          .all([axios.get(baseURL + userId), axios.get(baseURL2 + userId)])
          .then(
            axios.spread((response1, response2) => {
              setEventDetails(response1.data);
              console.log(response2.data);
              setEventDetails2(response2.data);
            })
          );
      } catch (error) {
        console.error(error);
      }
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
        {!!eventDetails2 &&
          eventDetails2.map((item) => (
            <UserQuizzes
              key={item.id}
              id={item.id}
              title={item.title}
              nmQuestions={item.questions.length}
              nmParticipants={item.participantList.length}
              participants={item.participantList}
              desc={item.description}
              questions={item.questions}
              isPublic={item.public}
            />
          ))}
      </Stack>
    </div>
  );
}

export default ProfilePage;
