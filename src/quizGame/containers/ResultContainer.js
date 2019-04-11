/* @flow */
import { Result } from '../component/Result.js';
import { connect } from 'react-redux';
import { doLoadQuiz } from '../actions/QuizAction.js';

export const mapStateToProps = (state: Object) => {
  const { resultAnswered, score } = state.quiz;
  return {
    resultAnswered,
    score
  };
};

export default connect(
  mapStateToProps,
  { doLoadQuiz }
)(Result);
