import React from 'react';

const DepressionTestLanding = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-900 to-blue-600 text-white">
      {/* Logo */}
      <div className="absolute top-5 left-5">
        <img
          src="logo.png" // Replace with the logo's actual path
          alt="Depression Detection Logo"
          className="w-20"
        />
      </div>

      {/* Navbar */}
      <nav className="absolute top-5 right-5 flex gap-8 text-lg">
        <a href="#home" className="hover:underline">
          HOME
        </a>
        <a href="#quiz-test" className="hover:underline">
          QUIZ BASED TEST
        </a>
        <a href="#sentiment-test" className="hover:underline">
          SENTIMENT BASED TEST
        </a>
        <a href="#about" className="hover:underline">
          ABOUT
        </a>
        <a href="#contact" className="hover:underline">
          CONTACT
        </a>
      </nav>

      {/* Content */}
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-4">3 MINUTE DEPRESSION TEST</h1>
        <p className="text-xl mb-8">
          This depression quiz is based on the Depression Screening Test based
          on PHQ9
        </p>
        <button className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded">
          Take a Test
        </button>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="brain-background.jpg" // Replace with the background image's actual path
          alt="Brain Background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
    </div>
  );
};

export default DepressionTestLanding;
