import React, { Component } from 'react';
import Question from '../../components/Question/Question';
import classes from './Quiz.module.css';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';

class Quiz extends Component {
  state = {
    solved: 0,
    current: 0,
    selected: false,
    showModal: false,
  };

  onAnswerHandler = (e) => {
    this.setState({ selected: true });
    if (e.target.innerText === e.target.dataset.correct) {
      this.setState((prevState) => ({ solved: prevState.solved + 1 }));
    }
    if (this.state.current === this.props.questions.length - 1) {
      this.setState({ showModal: true });
    }
  };

  onNextBtnClick = () => {
    this.setState((prevState) => ({
      current: prevState.current + 1,
      selected: false,
    }));
  };

  onCloseModalHandler = () => {
    this.setState({ showModal: false });
  };

  render() {
    const totalQuestions = this.props.questions.length;
    const question = this.props.questions[this.state.current];
    const button =
      this.state.current !== this.props.questions.length - 1 ? (
        <button onClick={this.onNextBtnClick}>Next Question</button>
      ) : (
        <button onClick={this.props.playAgain}>Play Again</button>
      );
    let modal = null;
    if (this.state.showModal) {
      const result = `${this.state.solved}/${totalQuestions}`;
      modal = (
        <Backdrop close={this.state.closeModal}>
          <Modal result={result} click={this.onCloseModalHandler} />
        </Backdrop>
      );
    }
    return (
      <div className={classes.Quiz}>
        {modal}
        <h1>
          Correct: {this.state.solved}/{totalQuestions}
        </h1>
        <Question
          show={this.state.selected}
          question={question}
          onAnswer={this.onAnswerHandler}
        />
        {button}
      </div>
    );
  }
}

export default Quiz;
