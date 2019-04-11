/* @flow */
const initialState = {
  allQuestion: [],
  resultAnswered: [],
  currentIndexQuestion: 0,
  isQuizFinished: false,
  isPopupVisible: false,
  isLastQuestion: false,
  score: 0
};

const saveQuestionAnswer = (state, action) => {
  return {
    ...state,
    allQuestion: action.newObj
  };
};

const updateAllQuestion = (state, action) => {
  return {
    ...state,
    allQuestion: action.newAnswerMode
  };
};

const updateCurrentUnit = (state, action) => {
  return {
    ...state,
    currentIndexQuestion: action.index
  };
};

const updateQuizStatus = (state, action) => {
  return {
    ...state,
    isQuizFinished: !state.isQuizFinished
  };
};

const updatePopupVisible = (state, action) => {
  return {
    ...state,
    isPopupVisible: !state.isPopupVisible
  };
};

const resetInitialState = (state, action) => {
  return {
    ...initialState
  };
};

const updateScore = (state, action) => {
  return {
    ...state,
    score: action.newScore
  };
};
const updateResultAnswer = (state, action) => {
  return {
    ...state,
    resultAnswered: action.resultAnswered
  };
};

const updateLastQuestion = (state, action) => {
  return {
    ...state,
    isLastQuestion: !state.isLastQuestion
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_QUIZ_CONTENT':
      return saveQuestionAnswer(state, action);
    case 'UPDATE_ALL_QUESTION':
      return updateAllQuestion(state, action);
    case 'UPDATE_CURRENT_INDEX':
      return updateCurrentUnit(state, action);
    case 'UPDATE_QUIZ_STATUS':
      return updateQuizStatus(state, action);
    case 'TOGGLE_POPUP':
      return updatePopupVisible(state, action);
    case 'RESET_INITAILSTATE':
      return resetInitialState(state, action);
    case 'UPDATE_ANSWER_SCORE':
      return updateScore(state, action);
    case 'UPDATE_RESULT_ANSWERED':
      return updateResultAnswer(state, action);
    case 'UPDATE_LAST_QUESTION_STATUS':
      return updateLastQuestion(state, action);
    default:
      return state;
  }
}
