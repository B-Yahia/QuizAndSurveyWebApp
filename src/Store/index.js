import { configureStore } from "@reduxjs/toolkit";
import newQuestion from "./createQuestion-slice";
import newQuiz from "./createQuiz-slice";

const store = configureStore({
  reducer: {
    question: newQuestion.reducer,
    quiz: newQuiz.reducer,
  },
});

export default store;
