import React from 'react';
import classes from './Modal.module.css';

export default function Modal(props) {
  const form = (
    <form onSubmit={props.submit}>
      <div>
        
        <label htmlFor="category">Category: </label>
        <select
          style={{ display: 'block' }}
          name="category"
          id="category"
          value={props.category}
          onChange={props.change}
        >
          <option value="18">Computers</option>
          <option value="19">Maths</option>
          <option value="17">Science</option>
          <option value="11">Entertainment</option>
        </select>
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty: </label>
        <select
          style={{ display: 'block' }}
          name="difficulty"
          id="difficulty"
          value={props.difficultyValue}
          onChange={props.change}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <label htmlFor="NumberOfQuestions">Number of Questions: </label>
        <input
          style={{ display: 'block' }}
          min="5"
          max="25"
          step="5"
          type="number"
          name="questionsNumber"
          value={props.questionsValue}
          onChange={props.change}
          onKeyDown={(e) => e.preventDefault()}
        />
      </div>
      <button className={classes.Start}>Play Quiz!</button>
    </form>
  );
  return (
    <div className={classes.Modal}>
      <button onClick={props.click} className={classes.Close}>
        X
      </button>
      <div>
      {props.result ? <h1>Your result: {props.result}</h1> : form}
      </div>
    </div>
  );
}
