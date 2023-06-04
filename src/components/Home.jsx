import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { MdOutlineQuiz } from 'react-icons/md';
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Quiz App</title>
      </Helmet>
      <div id="home">
        <section>
            <MdOutlineQuiz className="icon text-default"/>
            <h1 className="text-default">Quiz App</h1>
            <div className="start-btn-container">
                <Link to="/quiz" className="play-btn ">Start</Link>
            </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
