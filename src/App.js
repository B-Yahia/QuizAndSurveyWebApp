import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PublicQuizzesPage from "./Pages/PublicQuizzesPage/PublicQuizzesPage";
import QuizCreationPage from "./Pages/QuizCreationPage/QuizCreationPage";
import QuizPage from "./Pages/QuizPage/QuizPage";
import QuizPage1 from "./Pages/QuizPage/QuizPage1";
import SignupPage from "./Pages/SignupPage/SignupPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-quiz" element={<QuizCreationPage />} />
        <Route path="/pqp" element={<PublicQuizzesPage />} />
        <Route path="/quiz/:id" element={<QuizPage1 />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
