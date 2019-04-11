/* @flow */
import { QuestionCard } from '../component/QuestionCard.js';
import { connect } from 'react-redux';
import { clickAnswer, clickNext, clickBack } from '../actions/QuizAction.js';

export const mapStateToProps = (state: Object) => {
  const {
    allQuestion,
    currentIndexQuestion,
    isLastQuestion,
    score
  } = state.quiz;
  const allQuestionLength = allQuestion.length;

  return {
    allQuestion: allQuestion,
    currentQuestion: allQuestion[currentIndexQuestion],
    currentIndex: currentIndexQuestion,
    allQuestionLength,
    isLastQuestion,
    score
  };
};

export default connect(
  mapStateToProps,
  { clickAnswer, clickNext, clickBack }
)(QuestionCard);
