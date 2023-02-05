import { Stack } from "@mui/material";
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
  const params = useParams();

  // const saveQuiz = async () => {
  //   await axios
  //     .post(baseURL + params.id, newQuiz)
  //     .then(function (response) {})
  //     .catch(function (error) {
  //       console.log(error);
  //       setErrorMsg("something  went wrong");
  //     });
  // };
  const state = useSelector((state) => state.quiz.step);
  return (
    <div>
      <Stack className="section-container">
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
      </Stack>
    </div>
  );
}

export default CreateNewQuiz;
