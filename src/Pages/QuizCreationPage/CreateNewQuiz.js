import { Stack, Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import "../CommunCss.css";
import CreateQuizStep1Component from "./CreateQuizStep1Component";
import CreateQuizStep2Component from "./CreateQuizStep2Component";
import CreateQuizStep3Component from "./CreateQuizStep3Component";
import "./QuizCreationPage.css";

function CreateNewQuiz() {
  const baseURL = "http://localhost:8080/quiz/create/";
  const newQuiz = useSelector((state) => state.quiz);
  const params = useParams();

  const saveQuiz = async (e) => {
    e.preventDefault();
    console.log(newQuiz);
    await axios
      .post(baseURL + params.id, newQuiz)
      .then(function (response) {
        console.log(response);
        console.log("first");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const state = useSelector((state) => state.quiz.step);
  return (
    <div>
      <Stack
        className="section-container"
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        spacing={2}
      >
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <div className="page-title">Create your quiz</div>
          <Link
            to={"/profile/" + params.id}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button variant="outlined">Back to profile</Button>
          </Link>
        </Stack>
        {(() => {
          switch (state) {
            case 1:
              return <CreateQuizStep1Component />;
            case 2:
              return <CreateQuizStep2Component />;
            case 3:
              return <CreateQuizStep3Component />;
            default:
              return null;
          }
        })()}
        {newQuiz.step === 3 && <Button onClick={saveQuiz}>saved</Button>}
      </Stack>
    </div>
  );
}

export default CreateNewQuiz;
