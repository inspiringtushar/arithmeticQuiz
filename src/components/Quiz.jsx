import React, { useEffect, useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import "./Quiz.css";

function Quiz() {
  const [firstValue, setFirstValue] = useState();
  const [secondValue, setSecondValue] = useState();
  const [operator, setOperator] = useState();
  const [result, setResult] = useState(undefined);
  const [counter, setCounter] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(5);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [question, setQuestion] = useState({
    question: [],
  });
  const inputRef = useRef(null);

  const operatorArray = ["*", "/", "+", "-"];
  const operatorObject = {
    "*": (n1, n2) => n1 * n2,
    "/": (n1, n2) => n1 / n2,
    "+": (n1, n2) => n1 + n2,
    "-": (n1, n2) => n1 - n2,
  };

  const generateRandomNumber = () => {
    setFirstValue(Math.floor(Math.random() * 10) + 1);
    setSecondValue(Math.floor(Math.random() * 10) + 1);
    setOperator(
      operatorArray[Math.floor(Math.random() * operatorArray.length)]
    );
    setCounter(counter + 1);
  };

  const handleArithmetic = () => {
    let correct = false;
    const cal = operatorObject[operator](firstValue, secondValue);
    if (Math.floor(cal) === parseInt(result)) {
      setScore(score + 1);
      correct = true;
    }
    const newQuestion = {
      val1: firstValue,
      val2: secondValue,
      res: result,
      correct: correct,
      operator: operator,
    };
    const updatedQuestion = [newQuestion, ...question.question];
    setQuestion({
      question: updatedQuestion,
    });
    inputRef.current.focus();
    setResult("");
    generateRandomNumber();
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

  if (!start) {
    return (
      <>
        <button id="startButton" onClick={() => setStart(true)}>
          Start QUIZ
        </button>
      </>
    );
  } else if (counter > totalQuestion) {
    return (
      <div>
        <h3>Final Score: {score}</h3>
        {question.question.map((e, i) => {
          return (
            <li style={{ "margin-bottom": "05px" }}>
              <span className={!e.correct && "resultScreen"}>
                {`Answer of ${e.val1} ${e.operator} ${e.val2} is ${e.res}`}
              </span>
            </li>
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="mainDiv">
        <h3>Arithmetic Quiz</h3>
        <div className="centerDiv">
          <label>
            Pick no. of questions to attempt
            <select
              value={totalQuestion}
              onChange={(e) => setTotalQuestion(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </label>
          <div className="Quiz">
            <input
              id="value1"
              type="number"
              placeholder="value 1"
              value={firstValue}
            ></input>
            <p>{operator}</p>
            <input
              id="value2"
              type="number"
              placeholder="value 2"
              value={secondValue}
            ></input>
          </div>
          <input
            id="result"
            data-tip
            data-for="registerTip"
            type="number"
            placeholder="Answer"
            value={result}
            ref={inputRef}
            onChange={(e) => setResult(e.target.value)}
          ></input>
          <ReactTooltip id="registerTip" place="right" effect="solid">
            Give answer in the min. round off value
          </ReactTooltip>
          <button id="nextButton" onClick={handleArithmetic}>
            Next Question
          </button>
          <label className="scoreLabel">SCORE: {score}</label>
        </div>
      </div>
    );
  }
}
export default Quiz;
