import React from 'react';
import classes from './Home.module.css';
import svgImage from '../../assets/questions.svg';

const Home = (props) => {
  return (
    <div className={classes.Home}>
      <h1>QuizMe</h1>
      <p>Do you want to pursue Engineering?Join the quiz game and see how you perform!</p>
      <img height="300" width="500" src={svgImage} alt="" />
      <button className={classes.Quick} onClick={props.play}>
        Quick Game
      </button>
      <button className={classes.Custom} onClick={props.clickOnCustom}>
        PLAY
      </button>
    </div>
  );
};

export default Home;
