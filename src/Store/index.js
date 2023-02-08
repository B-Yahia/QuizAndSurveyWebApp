import { configureStore } from "@reduxjs/toolkit";
import newQuiz from "./createQuiz-slice";

const store = configureStore({
  reducer: {
    quiz: newQuiz.reducer,
  },
});

export default store;
