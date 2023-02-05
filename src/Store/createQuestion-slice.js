import { createSlice } from "@reduxjs/toolkit";

const newQuestion = createSlice({
  name: "question",
  initialState: {
    question: "",
    answers: [],
  },
  reducers: {
    addAnswer(state, action) {},
    removeRemove(state, action) {},
  },
});
export const questionAction = newQuestion.actions;
export default newQuestion;
