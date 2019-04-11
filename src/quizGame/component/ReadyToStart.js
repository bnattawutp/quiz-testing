import React from 'react';
import '../css/QuizStyle.css';
import '../css/InputButton.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
type Props = {
  choiceTxt: string
};
const ReadyToStart = (props: Props) => {
  const { onClick } = props;

  return (
    <div className={'subContent'}>
      <div className={'rowHead'}>
        <h1>QUIZ GAME</h1>
      </div>
      <Link to="/quiz/">
        <Button color="primary" size="lg" onClick={onClick}>
          Start
        </Button>
      </Link>
    </div>
  );
};
export { ReadyToStart };
