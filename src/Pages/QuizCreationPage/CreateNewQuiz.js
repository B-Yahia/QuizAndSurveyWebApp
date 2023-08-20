import { Stack, Button } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { quizAction } from "../../Store/createQuiz-slice";

import "../CommunCss.css";
import CreateQuizStep1Component from "../../Comonents/QuizCreationSteps/CreateQuizStep1Component";
import CreateQuizStep2Component from "../../Comonents/QuizCreationSteps/CreateQuizStep2Component";
import CreateQuizStep3Component from "../../Comonents/QuizCreationSteps/CreateQuizStep3Component";
import "./QuizCreationPage.css";

function CreateNewQuiz() {
  const url = localStorage.getItem("url");
  const baseURL = "http://" + url + "/quiz/";

  const newQuiz = useSelector((state) => state.quiz);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveQuiz = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    console.log(newQuiz);
    await axios
      .post(baseURL + userId, newQuiz)
      .then(function (response) {
        console.log(response);
        dispatch(quizAction.cleanQuizEntity());
        navigate("/profile");
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
            to={"/profile"}
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
        {newQuiz.step === 3 && <Button onClick={saveQuiz}>save</Button>}
      </Stack>
    </div>
  );
}

export default CreateNewQuiz;
