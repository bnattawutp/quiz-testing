/* @flow */
import { combineReducers } from 'redux';
import QuizReducer from './QuizReducer.js';
import QuestionReducer from './QuestionReducer.js';

export default combineReducers({
  question: QuestionReducer,
  quiz: QuizReducer
});
