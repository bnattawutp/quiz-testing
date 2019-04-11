/* @flow */
import { QuizWarpper } from '../component/QuizWarpper.js';
import { connect } from 'react-redux';
import {
  doLoadQuiz,
  closePopup,
  loadInitialState,
  doDownloadFirebase
} from '../actions/QuizAction.js';

export const mapStateToProps = (state: Object) => {
  const { quiz, question } = state;

  return {
    content: quiz,
    isPopupVisible: quiz.isPopupVisible,
    question
  };
};

export default connect(
  mapStateToProps,
  {
    doLoadQuiz,
    closePopup,
    loadInitialState,
    doDownloadFirebase
  }
)(QuizWarpper);
