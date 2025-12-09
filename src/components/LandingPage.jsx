// Inside src/components/LandingPage.jsx
import React from 'react';

const ORANGE = '#FF5722'; 
const LIGHT_BG = '#F5F5F5';

const LandingPage = ({ setPage }) => {
  const handleGetStarted = () => {
    setPage('products');
  };

  return (
    <div className="landing-page-container flex flex-col items-center justify-center w-full h-full p-6 sm:p-10" style={{ backgroundColor: LIGHT_BG }}>
      
      {/* Animation Section */}
      <div className="relative w-full max-w-lg mb-10 sm:mb-16 flex justify-center items-center">
        {/* The motor.png image from the public folder */}
        <img
          src="/motor.png" // <-- Uses your existing image!
          alt="Delivery Motor"
          className="w-48 sm:w-64 motor-moving-animation" // Class for animation
        />
        {/* Text/Bubble to add a creative touch */}
        <div className="absolute top-0 right-0 sm:right-10 p-2 sm:p-3 bg-white rounded-full shadow-lg transform rotate-6">
            <span className="text-xl sm:text-2xl" role="img" aria-label="Fast Delivery">💨</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="text-center max-w-xl">
        <h1 
          className="text-4xl sm:text-5xl font-extrabold mb-4 animate-fade-in" 
          style={{ color: ORANGE }}
        >
          Your Food, Fast!
        </h1>
        <p className="text-md sm:text-lg text-gray-700 mb-8 sm:mb-10 animate-slide-up">
          The fastest and easiest way to discover the best local flavors in Iligan City and get them delivered to your door.
        </p>
        
        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="px-8 py-3 sm:px-10 sm:py-4 text-white font-bold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4"
          style={{ backgroundColor: ORANGE, borderColor: ORANGE }}
        >
          <span className="text-lg sm:text-xl">Get Started Now!</span>
        </button>
      </div>
      
    </div>
  );
};

export default LandingPage;