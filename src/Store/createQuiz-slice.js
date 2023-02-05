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
        statement: action.payload.newQuestion.statement,
        answers: action.payload.newQuestion.answers,
      };

      state.questions.push(newQuestion);
    },
    removeQuestion(state, action) {},
    removeAnswerfromQuestion(state, action) {
      const questionId = action.payload.QId;
      const answerId = action.payload.AId;
      state.questions.splice(questionId, 1);
    },
  },
});

export const quizAction = newQuiz.actions;
export default newQuiz;
