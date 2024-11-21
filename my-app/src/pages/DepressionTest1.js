import React, { useState } from "react";
import axios from "axios";

const DepressionTest = () => {
  const questions = [
    { id: 1, question: "Little interest or pleasure in doing things", options: ["Not at all", "Several days", "More than half the days", "Nearly every day"] },
    // Add the remaining questions here...

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
  const [result, setResult] = useState(null);

  const scoringMap = {
    "Not at all": 0,
    "Several days": 1,
    "More than half the days": 2,
    "Nearly every day": 3,
  };

  const handleChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: scoringMap[answer] }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        answers: Object.values(answers),
      });
      setResult(response.data.prediction); // Set the result from the API
      setShowResult(true);
    } catch (error) {
      console.error("Error connecting to the backend:", error);
    }
  };

  const restartTest = () => {
    setAnswers({});
    setResult(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {showResult ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your Result</h1>
            <p className="text-xl mb-6">
              {result === 0 && "No depression detected."}
              {result === 1 && "Mild depression detected."}
              {result === 2 && "Moderate depression detected."}
              {result === 3 && "Severe depression detected."}
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
              Answer the questions below based on your recent experiences.
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
