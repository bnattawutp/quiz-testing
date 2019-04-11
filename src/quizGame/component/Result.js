import React from 'react';
import '../css/ResultStyle.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ResultList } from './ResultList.js';

type Props = {
  doLoadQuiz: Function,
  resultAnswered: Object,
  score: number
};
const Result = (props: Props) => {
  const { doLoadQuiz, resultAnswered, score } = props;
  const getResultLabel = (score: number) => {
    if (score <= 40) {
      return 'Try again?';
    } else if (score <= 60) {
      return 'Good';
    } else if (score <= 80) {
      return 'Great!';
    } else if (score <= 100) {
      return 'Congratulation!!';
    }
  };
  return (
    <div className={'mainResultSection'}>
      <div className={'rowTitleResult'}>
        <div className={'rowHead'}>
          <h1>{getResultLabel(score)}</h1>
          <h1>{`${'Your score is'} ${score}`}</h1>
        </div>
        <Link to="/quiz/">
          <Button color="primary" size="lg" onClick={() => doLoadQuiz()}>
            Play again
          </Button>{' '}
        </Link>
      </div>
      <div className={'rowDetailResult'}>
        {resultAnswered.map((item, index) => {
          return (
            <ResultList
              key={index}
              answerMode={item.answerMode}
              questionTxt={item.question}
              yourAnswerTxt={item.youAnswer}
            />
          );
        })}
      </div>
    </div>
  );
};
export { Result };
