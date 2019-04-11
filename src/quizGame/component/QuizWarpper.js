import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';
import '../css/QuizStyle.css';
import QuestionCard from '../containers/QuestionCardContainer.js';
import Result from '../containers/ResultContainer.js';
import { ReadyToStart } from './ReadyToStart.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Popup } from './Popup';
import { Container, Row, Col } from 'reactstrap';

class QuizWarpper extends Component {
  componentDidMount() {
    const { question } = this.props;
    if (_.isEmpty(question.byIds)) {
      this.props.doDownloadFirebase();
    }
  }
  render() {
    const {
      content,
      doLoadQuiz,
      closePopup,
      isPopupVisible,
      loadInitialState
    } = this.props;

    return (
      <Router>
        <Container>
          <Row>
            <Col xs={'12'} sm="12">
              <Switch>
                <Route exact path="/result/" component={() => <Result />} />
                <Route
                  exact
                  path="/quiz/"
                  component={() => <QuestionCard content={content} />}
                />
                <Route
                  exact
                  path="/"
                  component={() => (
                    <ReadyToStart onClick={() => doLoadQuiz()} />
                  )}
                />
              </Switch>
            </Col>
          </Row>
        </Container>

        {isPopupVisible ? (
          <Popup
            text={'Are you sure?'}
            onClickYes={() => loadInitialState()}
            onClickNo={() => closePopup()}
          />
        ) : null}
      </Router>
    );
  }
}
export { QuizWarpper };
