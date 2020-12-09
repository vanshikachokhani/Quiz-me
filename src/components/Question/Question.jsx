import React from 'react';
import classes from './Question.module.css';

export default function Question(props) {
  const buttons = props.question.options.map((option) => {
    let buttonClass = [];
    let disabled = false;
    if (props.show) {
      if (option === props.question.correct) {
        buttonClass.push(classes.Correct);
        disabled = true;
      } else {
        disabled = true;
      }
    }
    return (
      <button
        data-correct={props.question.correct}
        className={buttonClass.join(' ')}
        disabled={disabled}
        onClick={props.onAnswer}
        key={option}
        dangerouslySetInnerHTML={{ __html: option }}
      ></button>
    );
  });

  return (
    <div className={classes.Question}>
      <p dangerouslySetInnerHTML={{ __html: props.question.question }} />
      <div>{buttons}</div>
    </div>
  );
}
