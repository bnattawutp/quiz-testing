/* @flow */
import _ from 'lodash';
import { base } from '../../firebase/base';

export const doDownloadFirebase = () => {
  return (dispatch: Function, getState: Function) => {
    base.fetch('data', {
      context: this,
      asArray: true,
      then(data) {
        dispatch({ type: 'DOWNLOAD_DATA_FIREBASE', question: data[0] });
        console.log(data);
      }
    });
  };
};

export const doLoadQuiz = () => {
  return (dispatch: Function, getState: Function) => {
    dispatch({ type: 'RESET_INITAILSTATE' });
    dispatch(loadQuiz());
  };
};
export const closePopup = () => {
  return { type: 'TOGGLE_POPUP' };
};

export const loadInitialState = () => {
  return { type: 'RESET_INITAILSTATE' };
};

export const loadQuiz = () => {
  return (dispatch: Function, getState: Function) => {
    const { question } = getState();
    const dataQuestion = _.get(question, 'byIds');
    // Generate new question with answer
    const newObj = _.map(dataQuestion, item => {
      let newAnswer = [];
      newAnswer.push(item.correct_answer);
      newAnswer.push(...item.incorrect_answers);
      const newAnswerMode = _.map(newAnswer, answerItem => {
        return {
          answerOption: answerItem,
          mode: 'UNSELECTED'
        };
      });

      return {
        question: item.question,
        answer: _.shuffle(newAnswerMode),
        level: item.difficulty,
        correctAnswer: item.correct_answer,
        isAnswer: false
      };
    });

    dispatch({
      type: 'LOAD_QUIZ_CONTENT',
      newObj: _.shuffle(newObj)
    });
  };
};
const getNumPageNotEqual = (state: Object) => {
  const { quiz } = state;
  const currentIndex = _.get(quiz, 'currentIndexQuestion', 0);
  const length = quiz.allQuestion.length;
  const nextIndex = currentIndex + 1;
  return nextIndex !== length;
};

export const clickAnswer = (wordSelected: string) => {
  return (dispatch: Function, getState: Function) => {
    const state = getState();
    const currentIndex = _.get(state.quiz, 'currentIndexQuestion', 0);
    const isNumPageNotEqual = getNumPageNotEqual(state);
    if (!isNumPageNotEqual) {
      dispatch({
        type: 'UPDATE_LAST_QUESTION_STATUS'
      });
    }

    const newAnswerMode = getNewAnswerMode(
      dispatch,
      state,
      currentIndex,
      wordSelected
    );
    dispatch({
      type: 'UPDATE_ALL_QUESTION',
      newAnswerMode
    });
  };
};

export const clickNext = () => {
  return (dispatch: Function, getState: Function) => {
    const state = getState();
    const currentIndex = _.get(state.quiz, 'currentIndexQuestion', 0);
    const isNumPageNotEqual = getNumPageNotEqual(state);
    if (isNumPageNotEqual) {
      dispatch({
        type: 'UPDATE_CURRENT_INDEX',
        index: currentIndex + 1
      });
    }
  };
};

export const clickBack = () => {
  return (dispatch: Function, getState: Function) => {
    const state = getState();
    const { quiz } = state;
    const currentIndex = _.get(quiz, 'currentIndexQuestion', 0);
    const lastIndex = currentIndex - 1;

    if (lastIndex !== -1) {
      dispatch({
        type: 'UPDATE_CURRENT_INDEX',
        index: lastIndex
      });
    } else {
      dispatch({ type: 'TOGGLE_POPUP' });
    }
  };
};

const getNewAnswerMode = (
  dispatch: Function,
  state: Object,
  currentIndex: number,
  wordSelected: string
) => {
  const allQuestion = _.get(state, ['quiz', 'allQuestion']);
  const cloneAllQuestion = _.cloneDeep(allQuestion);
  const currentQuestionObj = _.get(cloneAllQuestion, currentIndex);
  const correctAnser = currentQuestionObj.correctAnswer;
  const newAnswerObj = _.get(currentQuestionObj, 'answer');
  const isCorrect = wordSelected === correctAnser;

  if (!isCorrect) {
    // Answer WRONG
    const wrongObj = _.find(
      newAnswerObj,
      item => item.answerOption === wordSelected
    );
    wrongObj.mode = 'WRONG';

    // find CORRECT answer when user answer wrong
    const correctObj = _.find(
      newAnswerObj,
      item => item.answerOption === correctAnser
    );
    correctObj.mode = 'CORRECT';

    dispatch(
      saveResultAnswered(
        currentQuestionObj.question,
        'WRONG',
        wordSelected,
        correctAnser
      )
    );
  } else {
    // Answer CORRECT
    const correctObj = _.find(
      newAnswerObj,
      item => item.answerOption === wordSelected
    );
    console.log('newAnswerObj', newAnswerObj);

    correctObj.mode = 'CORRECT';

    // Get Answer score
    const level = currentQuestionObj.level;
    const scoreAnswer = getScore(level, 'CORRECT');

    // Update new score
    const userScore = _.get(state, ['quiz', 'score'], 0);

    const newScore = userScore + scoreAnswer;
    dispatch({ type: 'UPDATE_ANSWER_SCORE', newScore });
    dispatch(
      saveResultAnswered(
        currentQuestionObj.question,
        'CORRECT',
        wordSelected,
        correctAnser
      )
    );
  }
  currentQuestionObj.answer = newAnswerObj;
  // Change status of question
  currentQuestionObj.isAnswer = true;

  return cloneAllQuestion;
};

const getScore = (level: string, answerMode: string) => {
  if (level === 'medium' && answerMode === 'CORRECT') {
    return 14;
  } else if (level === 'easy' && answerMode === 'CORRECT') {
    return 6;
  } else {
    return 0;
  }
};

const saveResultAnswered = (
  question: string,
  answerMode: string,
  youAnswer: string,
  correctAnswer: string
) => {
  return (dispatch: Function, getState: Function) => {
    const { resultAnswered } = getState().quiz;
    const newResult = [...resultAnswered];
    const newResultAnswered = {
      question,
      answerMode,
      youAnswer,
      correctAnswer
    };
    newResult.push(newResultAnswered);

    dispatch({
      type: 'UPDATE_RESULT_ANSWERED',
      resultAnswered: newResult
    });
  };
};
