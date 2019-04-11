import React from 'react';
import '../css/ResultStyle.css';
type Props = {
  questionTxt: string,
  yourAnswerTxt: string,
  answerMode: string
};
const ResultList = (props: Props) => {
  const getColorText = (answerMode: string) => {
    if (answerMode === 'WRONG') {
      return 'worngAnswer';
    } else if (answerMode === 'CORRECT') {
      return 'correctAnswer';
    }
  };
  const { questionTxt, yourAnswerTxt, answerMode } = props;

  return (
    <div className={'itemListWarpper'}>
      <div>
        <h4>{questionTxt}</h4>
      </div>
      <div className={'rowResultAnswer'}>
        <span>
          <h5>Result:</h5>
        </span>
        <span className={'yourAnswer'}>
          <p className={getColorText(answerMode)}>{yourAnswerTxt}</p>
        </span>
      </div>
    </div>
  );
};
export { ResultList };
