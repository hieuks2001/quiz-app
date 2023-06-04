import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuizPlay from "./components/quiz/QuizPlay";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizPlay />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
