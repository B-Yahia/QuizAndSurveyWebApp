import { createSlice } from "@reduxjs/toolkit";

const newQuiz = createSlice({
  name: "quiz",
  initialState: {
    quizTitle: "",
    quizDescription: "",
    questions: [],
    public: true,
    step: 1,
  },
  reducers: {
    addTitleAndDesc(state, action) {
      const newtitle = action.payload.title;
      const newDesq = action.payload.desq;
      state.quizTitle = newtitle;
      state.quizDescription = newDesq;
    },
    nextStep(state, action) {
      state.step++;
    },
    previousStep(state, action) {
      state.step--;
    },
    addQuestion(state, action) {
      const newQuestion = {
        questionStatement: action.payload.newQuestion.questionStatement,
        answers: action.payload.newQuestion.answers,
      };

      state.questions.push(newQuestion);
    },
    removeQuestion(state, action) {
      state.questions.splice(state.payload, 1);
    },
    EditAnswerfromQuestion(state, action) {
      const index = action.payload.QId;

      const updatedQuestion = {
        questionStatement: action.payload.newQuestion.questionStatement,
        answers: action.payload.newQuestion.answers,
      };
      state.questions.splice(index, 1, updatedQuestion);
    },
  },
});

export const quizAction = newQuiz.actions;
export default newQuiz;
