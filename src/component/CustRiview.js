import React, { useState, useEffect } from 'react';
import SecureStorage from 'react-secure-storage';
import { useLocation } from "react-router-dom";
import CryptoJS from 'crypto-js';
import { useParams } from 'react-router-dom';



const ReviewComponent = ({ onButtonClick }) => {
  const location = useLocation();
  const [id, setId] = useState(null);
  const [currentReview, setCurrentReview] = useState(0);
  const [rating, setRating] = useState([]); // Holds fetched reviews
  const [errorMessage, setErrorMessage] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const { slug, encryptedId } = useParams(); // Extract the slug and encryptedId from the URL


  useEffect(() => {
    // Decrypt the product ID
    if (encryptedId) {
      const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedId), 'gurdeep');
      const decryptedId = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedId) {
        setId(decryptedId);  // Store decrypted ID in state
      }
    }
  }, [encryptedId]);

  useEffect(() => {
    // Fetch reviews based on product ID
    const fetchReviews = async () => {
      const p_id = id;
      try {
        const response = await fetch(`${apiUrl}all_reviews/${p_id}`);
        if (!response.ok) {
          throw new Error('No data found for the given product');
        }
        const data = await response.json();
        setRating(data); // Store fetched reviews in state
      } catch (err) {
        setErrorMessage('No reviews found.');
        setRating([]); // Clear if there's an error
      }
    };

    if (id) fetchReviews();
  }, [id]);
  // Auto-run carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prevReview) => (prevReview + 1) % rating.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [rating]);

  return (
    <div className="flex flex-col lg:flex-row justify-around w-full p-4 md:p-6 lg:p-8">
      {/* Section 1: Customer Review Prompt */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/3 mb-6 lg:mb-0">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-red-600 mb-4">
          CUSTOMER REVIEWS
        </h2>
        <div className="flex items-center mb-2">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <svg
                key={index}
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
        <p className="text-gray-600 mb-4">BE THE FIRST TO WRITE A REVIEW</p>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-200"
          onClick={onButtonClick}
        >
          WRITE A REVIEW
        </button>
      </div>

      {/* Section 2: Auto-running Carousel */}
      <div className="flex flex-col items-center w-full lg:w-1/2">
        {rating.length > 0 ? (
          <div className="bg-white shadow-md p-4 rounded-lg text-center mb-4">
            <p className="text-sm font-medium text-gray-800 mb-2">
              {rating[currentReview].msg}
            </p>
            <div className="flex justify-center mb-2">
              {Array(Number(rating[currentReview].rating))
                .fill(0)
                .map((_, index) => (
                  <svg
                    key={index}
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
            <p className="text-gray-600">- {rating[currentReview].name}</p>
            <p className="text-sm text-gray-500">{rating[currentReview].email}</p>
          </div>
        ) : (
          <p className="text-gray-600">{errorMessage || "Loading reviews..."}</p>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
