import React from 'react';
import { Link } from 'react-router-dom';
import DepressionTest from './DepressionTest';
import DepressionTestLanding from './DepressionTestLanding';
const HomePage = () => {
  return (
    <div className="home-container">
        <DepressionTestLanding/>
        <DepressionTest/>
      <h1>Welcome to the Depression Prediction App</h1>
      <Link to="/service">
        <button>Go to Service Form</button>
      </Link>
    </div>
  );
};

export default HomePage;
