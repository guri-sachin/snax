import React, { useState } from 'react';

const reviews = [
  {
    text: 'Forget complicated healthy meals! Snaxup saves me time with delicious breakfasts like oats and muesli ready in under 10 minutes. Made with whole grains and no added sugar.',
    stars: 5,
    name: 'Mohit Mital',
    profession: 'Nutritionist',
    image: 'https://via.placeholder.com/50', // Replace with actual image URLs
  },
  {
    text: 'No time to cook? No sweat! Snaxup saves busy professionals like me with quick & healthy breakfasts. Oats, muesli, shakes – all ready in under 10 minutes.',
    stars: 5,
    name: 'Amit Chaudhari',
    profession: 'Working Professional',
    image: 'https://via.placeholder.com/50', // Replace with actual image URLs
  },
  {
    text: 'As a fitness trainer, I believe & suggest only Snaxup! Their whole range is a protein powerhouse, from chocolatey oats to protein mixes packed with good stuff.',
    stars: 5,
    name: 'Vishali sharma',
    profession: 'Fitness Trainer',
    image: 'https://via.placeholder.com/50', // Replace with actual image URLs
  },
];

const ReviewCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < reviews.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="relative py-8 mx-8">
      <h2 className="text-center text-2xl text-[#8A0404] font-semibold mb-8">UNFILTERED EXPERIENCES</h2>
      <div className="relative flex justify-center items-center w-full ">
        
        {/* Left Button (Hide on larger screens) */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 p-2 hover:bg-orange-500 rounded-full z-10 block lg:hidden"
              aria-label="Left button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Carousel Container */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 m-2 p-2 gap-4 md:gap-3 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-6 w-full md:w-96 lg:w-[32.5%] text-center flex-shrink-0 gap-8"
              >
                <div className="mb-4">
                  {/* Stars */}
                  <div className="flex justify-center mb-2">
                    {Array(review.stars)
                      .fill(0)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className="w-6 h-6 text-yellow-500 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"></polygon>
                        </svg>
                      ))}
                  </div>
                  {/* Review Text */}
                  <p className="text-gray-700 mb-4">{review.text}</p>
                  {/* Reviewer Info */}
                  <div className="flex justify-center items-center space-x-3">
                    <div className="text-center">
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-gray-500 text-sm">{review.profession}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button (Hide on larger screens) */}
        {currentIndex < reviews.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-0 p-2 hover:bg-orange-500 rounded-full z-10 block lg:hidden"
             aria-label="Right button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCarousel;
