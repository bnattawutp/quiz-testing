import React from 'react';
import '../css/QuizStyle.css';
import { ItemList } from './ItemList.js';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

type Props = {
  allQuestion: any,
  currentIndex: number,
  currentQuestion: Object,
  allQuestionLength: number,
  isAnswer: boolean,
  clickBack: Function,
  clickNext: Function,
  score: number
};

const QuestionCard = (props: Props) => {
  const {
    clickAnswer,
    currentQuestion,
    clickNext,
    clickBack,
    currentIndex,
    allQuestionLength,
    isLastQuestion,
    score
  } = props;

  return (
    <div className={'subContent'}>
      <div className={'contentWarpper'}>
        <div className={'rowScoreNumpage'}>
          <p>Score: {score}</p>
          <p>{`${currentIndex + 1}/${allQuestionLength}`}</p>
        </div>
        <p className={'questionSection'}>{currentQuestion.question}</p>
        <div className={'answerRow'}>
          {currentQuestion.answer.map((item, index) => {
            return (
              <ItemList
                isAnswer={currentQuestion.isAnswer}
                key={index}
                mode={item.mode}
                onClick={() => clickAnswer(item.answerOption)}
                choiceTxt={item.answerOption}
              />
            );
          })}
        </div>
      </div>
      <div className={'nevWarpper'}>
        <Button size="lg" color="secondary" onClick={() => clickBack()}>
          BACK
        </Button>
        <Link to={isLastQuestion ? '/result/' : '/quiz/'}>
          <Button
            size="lg"
            disabled={!currentQuestion.isAnswer}
            onClick={() => clickNext()}
            color="primary"
          >
            NEXT
          </Button>
        </Link>
      </div>
    </div>
  );
};
export { QuestionCard };
