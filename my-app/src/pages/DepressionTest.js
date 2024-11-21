import React, { useState } from "react";

const DepressionTest = () => {
  const questions = [
    {
      id: 1,
      question: "Little interest or pleasure in doing things",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      id: 2,
      question: "Feeling down, depressed, or hopeless",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      id: 3,
      question: "Trouble falling or staying asleep, or sleeping too much",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      id: 4,
      question: "Feeling tired or having little energy",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      id: 5,
      question: "Poor appetite or overeating",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      id: 6,
      question: "Feeling bad about yourself - or that you are a failure or have let yourself or your family down",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      id: 7,
      question: "Trouble concentrating on things, such as reading the newspaper or watching television",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      id: 8,
      question: "Moving or speaking so slowly that other people could have noticed",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      id: 9,
      question: "Thoughts that you would be better off dead, or hurting yourself",
      options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    },
    {
      id: 10,
      question:
        "If you've had any days with issues above, how difficult have these problems made it for you at work, home, school, or with other people?",
      options: ["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"],
    },
  ];

  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const scoringMap = {
    "Not at all": 0,
    "Several days": 1,
    "More than half the days": 2,
    "Nearly every day": 3,
    "Not difficult at all": 0,
    "Somewhat difficult": 1,
    "Very difficult": 2,
    "Extremely difficult": 3,
  };

  const handleChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    // Calculate the total score based on answers
    let totalScore = 0;
    Object.values(answers).forEach((answer) => {
      totalScore += scoringMap[answer] || 0;
    });
    setScore(totalScore);
    setShowResult(true);
  };

  const restartTest = () => {
    setAnswers({});
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {showResult ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your Result</h1>
            <p className="text-xl mb-6">
              Your total score is: <span className="font-bold text-teal-500">{score}</span>
            </p>
            <p className="text-lg mb-8">
              {score <= 5 && "Minimal or no depression"}
              {score > 5 && score <= 10 && "Mild depression"}
              {score > 10 && score <= 15 && "Moderate depression"}
              {score > 15 && score <= 20 && "Moderately severe depression"}
              {score > 20 && "Severe depression"}
            </p>
            <button
              onClick={restartTest}
              className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded"
            >
              Retake the Test
            </button>
          </div>
        ) : (
          <form>
            <h1 className="text-3xl font-bold mb-4 text-center">Take a Test</h1>
            <p className="text-gray-600 mb-6 text-center">
              Instructions: Beside is a list of questions that relate to life experiences common among people diagnosed
              with depression. Please read each question carefully and indicate how often you have experienced the same
              or similar challenges in the past few months.
            </p>
            {questions.map((q) => (
              <div key={q.id} className="mb-6">
                <h2 className="text-lg font-semibold mb-2">{q.question}</h2>
                {q.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-1">
                    <input
                      type="radio"
                      id={`q${q.id}-option${index}`}
                      name={`question-${q.id}`}
                      value={option}
                      onChange={() => handleChange(q.id, option)}
                      className="mr-2"
                    />
                    <label htmlFor={`q${q.id}-option${index}`} className="text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600"
            >
              See Result
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DepressionTest;
