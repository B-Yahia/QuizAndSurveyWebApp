import { createSlice } from "@reduxjs/toolkit";

const newQuiz = createSlice({
  name: "quiz",
  initialState: {
    title: "",
    description: "",
    category: "",
    tags: [],
    questions: [],
    public: true,
    available: true,
    step: 1,
  },
  reducers: {
    addTitleAndDesc(state, action) {
      state.title = action.payload.title;
      state.description = action.payload.desq;
      state.category = action.payload.category;
      state.tags = action.payload.tags;
    },
    nextStep(state, action) {
      state.step++;
    },
    previousStep(state, action) {
      state.step--;
    },
    addQuestion(state, action) {
      const newQuestion = {
        statement: action.payload.newQuestion.questionStatement,
        answers: action.payload.newQuestion.answers,
        correctAnswer: action.payload.newQuestion.correctAnswer,
      };

      state.questions.push(newQuestion);
    },
    removeQuestion(state, action) {
      state.questions.splice(state.payload, 1);
    },
    EditAnswerfromQuestion(state, action) {
      const index = action.payload.QId;

      const updatedQuestion = {
        statement: action.payload.newQuestion.statement,
        answers: action.payload.newQuestion.answers,
        correctAnswer: action.payload.newQuestion.correctAnswer,
      };
      state.questions.splice(index, 1, updatedQuestion);
    },
    cleanQuizEntity(state, action) {
      state.tite = "";
      state.description = "";
      state.category = "";
      state.questions = [];
      state.step = 1;
    },
  },
});

export const quizAction = newQuiz.actions;
export default newQuiz;
