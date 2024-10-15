import React, { useState } from 'react';
import axios from 'axios';

const ProductReview = ({  productId  }) => {
          console.log("productId",productId)
  // State variables for form data
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  // Handle star selection
  const handleRating = (rate) => {
    setRating(rate);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!rating || !title || !msg || !name || !email) {
      setError('All fields are required.');
      return;
    }

    try {
      // Post the review data to the API
      const response = await axios.post(`${apiUrl}/just_review`, {
        p_id: productId, // assuming productId is passed as a prop
        msg,
        email,
        rating,
        name,
        title,
      });

      // Clear form and show success message
      setSuccess(response.data.message);
      setRating(0);
      setTitle('');
      setMsg('');
      setName('');
      setEmail('');
      setError('');
    } catch (err) {
      setError('Failed to submit the review.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg ">
      <h2 className="text-xl font-semibold mb-4 text-center text-red-800">Rate This Product</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Stars */}
        <div className="flex justify-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => handleRating(star)}
            >
              ★
            </button>
          ))}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Review Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter review title"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="msg" className="block text-sm font-medium text-gray-700">
            Review Description
          </label>
          <textarea
            id="msg"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your review"
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-white hover:text-orange-600 border border-orange-600 transition duration-300"
     
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductReview;
