import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineClockCircle, AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import luck from "../../assets/img/luck.png";
import congrat from "../../assets/img/congrat.png";

const QuizPlay = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [reviewAnswer, setReviewAnswer] = useState(false);

  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState([]);
  const fetchQuizData = () => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuiz(data.results);
      });
  };
  useEffect(() => {
    fetchQuizData();
  }, []);
  const [listAnswer, setListAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const handleAnswerOptionClick = (answer, index) => {
    setSelectedAnswerIndex(index);
    setSelectedAnswer(answer);
    if (answer === quiz[currentQuiz]?.correct_answer) {
      setScore((current) => current + 1);
    }
  };
  const handleNextQuizClick = () => {
    setListAnswer((current) => [...current, selectedAnswer]);
    setSelectedAnswer(null);
    setSelectedAnswerIndex(null);

    const nextQuestion = currentQuiz + 1;
    if (nextQuestion < quiz.length) {
      setCurrentQuiz(nextQuestion);
    } else {
      setShowScore(true);
      clearInterval(intervalId);
    }
  };

  const handleReviewQuizClick = () => {
    setShowScore(false);
    setCurrentQuiz(0);
    setReviewAnswer(true);
  };
  useEffect(() => {
    setAnswers(
      quiz[currentQuiz]?.incorrect_answers
        .concat(quiz[currentQuiz]?.correct_answer)
        .sort(function () {
          return Math.random() - 0.5;
        })
    );
  }, [currentQuiz, quiz]);
  const [intervalId, setIntervalId] = useState(0);

  const Time = () => {
    const [time, setTime] = useState(0);
    useEffect(() => {
      let newIntervalID = setInterval(() => {
        setTime((seconds) => seconds + 1);
      }, 1000);

      setIntervalId(newIntervalID);
      return () => clearInterval(newIntervalID);
    }, [time]);

    const makeTimeReadable = (t) => {
      const timeInSec = t;
      const hours = Math.floor(timeInSec / 3600);
      const mins = Math.floor((timeInSec - hours * 3600) / 60);

      const secs = timeInSec - hours * 3600 - mins * 60;
      return `${checkTwoDigits(mins)}:${checkTwoDigits(secs)} `;
    };
    const checkTwoDigits = (t) => {
      if (t < 10) {
        return "0" + t;
      }
      return t;
    };
    return <span>{makeTimeReadable(time)}</span>;
  };

  return (
    <Fragment>
      <div className="question">
        <h2 className="text-lg">Quizzes</h2>
        <br />
        {/* <section> */}
        {showScore ? (
          <>
            {score > 5 ? (
              <div className="text-center score-section">
                <img
                  src={congrat}
                  alt="congrat"
                  className="image-congrat-size"
                />{" "}
                <br />
                <h2> You are amazing!!! </h2>
                <br />
                <h4>
                  You scored {score} out of {quiz.length} in {Time()}
                </h4>
              </div>
            ) : (
              <div className="text-center score-section">
                <img src={luck} alt="Better luck" className="image-size" />
                <br />
                <h2> Better luck next time!!! </h2>
                <br />
                <h4>
                  You scored {score} out of {quiz.length} in {Time()}
                </h4>
              </div>
            )}
            <div className="text-center">
              <ul className="list-btn">
                <li>
                  <div>
                    <span
                      className="review-btn"
                      onClick={() => handleReviewQuizClick()}
                    >
                      Review
                    </span>
                  </div>
                </li>
                <li>
                  <div>
                    <Link className="play-btn" to="/">
                      Play again
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </>
        ) : reviewAnswer ? (
          <>
            <div className="lifeline-container">
              <p>
                <span>
                  {currentQuiz + 1} / {quiz?.length} quiz
                </span>
              </p>
              <p>
                <span>
                  {Time()}
                  <AiOutlineClockCircle className="lifeline" />
                </span>
              </p>
            </div>
            <br />

            <h2 className="text-md text-center">
              {quiz[currentQuiz]?.question}
            </h2>
            <br />
            {answers?.map((value, index) => (
              <div className="options-container" key={index}>
                <p
                  className={`option ${
                    value === listAnswer[currentQuiz]
                      ? listAnswer[currentQuiz] ===
                        quiz[currentQuiz]?.correct_answer
                        ? "success"
                        : "danger"
                      : value === quiz[currentQuiz]?.correct_answer
                      ? "success"
                      : ""
                  }`}
                >
                  {value}
                </p>
              </div>
            ))}
            <br />

            <div className="text-center">
              <ul className="list-btn">
                <li>
                  <div>
                    <span
                      className="next-btn"
                      onClick={() => handleNextQuizClick()}
                    >
                      Next
                    </span>
                  </div>
                </li>
                <li>
                  <div>
                    <Link className="play-btn" to="/">
                      Play again
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="lifeline-container">
              <p>
                <span>
                  {currentQuiz + 1} / {quiz?.length} quiz
                </span>
              </p>
              <p>
                <span>
                  {Time()}
                  <AiOutlineClockCircle className="lifeline" />
                </span>
              </p>
            </div>
            <br />

            <h2 className="text-md text-center">
              {quiz[currentQuiz]?.question}
            </h2>
            <br />
            <div className="text-center">
              {/* <div className="options-container"> */}
                {answers?.map((value, index) => (
                  <p
                    className={`option ${
                      selectedAnswerIndex === index ? "selected-answer" : null
                    }`}
                    id={value}
                    onClick={() => handleAnswerOptionClick(value, index)}
                  >
                    {value}
                  </p>
                ))}
              {/* </div> */}
            </div>
            <br />
            <div className="text-center">
              <div
                className="next-btn"
                style={{ width: "10%" }}
                onClick={() => handleNextQuizClick()}
              >
                Next
              </div>
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default QuizPlay;
