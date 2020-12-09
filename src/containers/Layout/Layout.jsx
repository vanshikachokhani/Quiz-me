import React, { Component } from 'react';
import classes from './Layout.module.css';
import Home from '../../components/Home/Home';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import Quiz from '../Quiz/Quiz';

export default class Layout extends Component {
  state = {
    questions: null,
    closeModal: true,
    queryValues: {
      category:'17',
      difficulty: 'medium',
      numberOfQuestions: 10,
    },
    playing: false,
    reload: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.queryValues.difficulty !== prevState.queryValues.difficulty ||
      this.state.queryValues.numberOfQuestions !==
        prevState.queryValues.numberOfQuestions ||
      this.state.reload === true
    ) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const { category, difficulty, numberOfQuestions } = this.state.queryValues;
    const res = await fetch(
      `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    const data = await res.json();
    const questionArr = [];
    data.results.forEach((ques) => {
      const { incorrect_answers, correct_answer, question } = ques;
      const options = [...incorrect_answers, correct_answer];
      const obj = {
        question: question,
        options: options.sort(() => Math.random() - 0.5),
        correct: correct_answer,
      };
      questionArr.push(obj);
    });
    this.setState({ questions: questionArr, reload: false });
  };

  onCloseModalHandler = () => {
    this.setState({ closeModal: true });
  };

  onInputChangeHandler = (event) => {
    let newValues = {};
    if (event.target.name === 'difficulty') {
      newValues = {
        ...this.state.queryValues,
        difficulty: event.target.value,
      };
      this.setState({ queryValues: newValues });
    } else {
      newValues = {
        ...this.state.queryValues,
        numberOfQuestions: event.target.value,
      };

      this.setState({ queryValues: newValues });
    }
  };

  onCustomHandler = () => {
    this.setState({ closeModal: false });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ playing: true, closeModal: true });
  };

  onPlayAgainHandler = () => {
    const qValues = { category: '17', difficulty: 'medium', numberOfQuestions: 10 };
    this.setState({
      questions: null,
      closeModal: true,
      queryValues: qValues,
      playing: false,
      reload: true,
    });
  };

  render() {
    let modal = null;
    if (!this.state.closeModal) {
      modal = (
        <Backdrop
          click={this.onCloseModalHandler}
          close={this.state.closeModal}
        >
          <Modal
            submit={this.onSubmitHandler}
            click={this.onCloseModalHandler}
            change={this.onInputChangeHandler}
            difficultyValue={this.state.queryValues.difficulty}
            questionsValue={this.state.queryValues.numberOfQuestions}
          />
        </Backdrop>
      );
    }
   // console.log(this.state.questions);
    return (
      <div className={classes.Layout}>
        {modal}
        {this.state.playing && this.state.questions ? (
          <Quiz
            questions={this.state.questions}
            playAgain={this.onPlayAgainHandler}
          />
        ) : (
          <Home
            clickOnCustom={this.onCustomHandler}
            play={this.onSubmitHandler}
          />
        )}
      </div>
    );
  }
}
