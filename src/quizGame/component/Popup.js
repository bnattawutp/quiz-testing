import React from 'react';
import '../css/QuizStyle.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className={'rowTitile'}>
            <h1>{this.props.text}</h1>
          </div>
          <div className={'rowButton'}>
            <Link to="/">
              <Button
                color="secondary"
                size="lg"
                onClick={this.props.onClickYes}
              >
                Yes
              </Button>
            </Link>
            <Button color="primary" size="lg" onClick={this.props.onClickNo}>
              No
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export { Popup };
