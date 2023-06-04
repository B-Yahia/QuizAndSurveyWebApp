import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PublicQuizzesPage from "./Pages/PublicQuizzesPage/PublicQuizzesPage";
import CreateNewQuiz from "./Pages/QuizCreationPage/CreateNewQuiz";
import QuizCreationPage from "./Pages/QuizCreationPage/QuizCreationPage";
import QuizPage1 from "./Pages/QuizPage/QuizPage1";
import SignupPage from "./Pages/SignupPage/SignupPage";

function App() {
  return (
    <div className="App">
      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        className="container"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<QuizCreationPage />} />
          <Route path="/all-quizzes" element={<PublicQuizzesPage />} />
          <Route path="/quiz/:id" element={<QuizPage1 />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-quiz" element={<CreateNewQuiz />} />
        </Routes>
      </Stack>
    </div>
  );
}

export default App;
