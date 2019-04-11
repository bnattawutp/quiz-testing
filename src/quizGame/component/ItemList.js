import React from 'react';
import '../css/QuizStyle.css';
import '../css/InputButton.css';
type Props = {
  choiceTxt: string,
  mode: string,
  isAnswer: boolean
};
const ItemList = (props: Props) => {
  const { onClick, mode, isAnswer } = props;
  const getAnswerClass = (mode: string) => {
    if (mode === 'UNSELECTED') {
      return 'answer-unselect';
    } else if (mode === 'WRONG') {
      return 'answer-wrong';
    } else if (mode === 'CORRECT') {
      return 'answer-correct';
    }
  };

  return (
    <label className={`answer-btn ${getAnswerClass(mode)}`}>
      <input
        type="radio"
        value
        className="answer-btn-radio"
        data-disable-with="Sign in"
        onClick={onClick}
        disabled={isAnswer}
      />
      {props.choiceTxt}
    </label>
  );
};
export { ItemList };
