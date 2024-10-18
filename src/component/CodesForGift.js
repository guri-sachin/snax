import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Index to track the current coupon
  const apiUrl = process.env.REACT_APP_API_URL;

  // Function to fetch coupons
  const getCoupons = async () => {
    try {
      const response = await axios.get(`${apiUrl}get-all-coupons`);
      setCoupons(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Copy the coupon code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    Swal.fire({
      icon: 'success',
      title: `Coupon code ${code} `,
      text: `Coupon code ${code} copied to clipboard!`,
    });
  };

  // Fetch coupons when the component mounts
  useEffect(() => {
    getCoupons();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextOffer();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [coupons.length]);

  // Handle offer card change (next/previous)
  const handleNextOffer = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % coupons.length);
  };

  const handlePreviousOffer = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 2 + coupons.length) % coupons.length
    );
  };

  if (error) return <p>Error: {error}</p>;
  if (coupons.length === 0) return <p>Loading coupons...</p>;

  // To display two coupons at a time, we'll calculate the next coupon to show
  const nextCouponIndex = (currentIndex + 1) % coupons.length;

  return (
    <div className="flex flex-col items-center">
      {/* Offer Cards */}
      <div className="flex  w-full overflow-hidden mt-2 space-x-4 flex-wrap">
        <div className="w-full sm:w-64 md:w-72 p-4 bg-white border border-gray-300 rounded-lg shadow-lg mb-4">
          <h3 className="text-md font-bold mb-2">
            Discount: {coupons[currentIndex].discount}
          </h3>
          <p className="text-gray-600 mb-4">
            Min. Purchase: ₹{coupons[currentIndex].amount}
          </p>
          <button
            onClick={() => copyToClipboard(coupons[currentIndex].code)}
            className="py-2 px-4 border border-dashed border-gray-400 rounded text-red-500 font-bold"
          >
            Copy Code: {coupons[currentIndex].code}
          </button>
        </div>

        {/* Display the second card only on medium and larger screens */}
        <div className="hidden sm:block w-full sm:w-64 md:w-72 p-4 bg-white border border-gray-300 rounded-lg shadow-lg mb-4">
          <h3 className="text-md font-bold mb-2">
            Discount: {coupons[nextCouponIndex].discount}
          </h3>
          <p className="text-gray-600 mb-4">
            Min. Purchase: ₹{coupons[nextCouponIndex].amount}
          </p>
          <button
            onClick={() => copyToClipboard(coupons[nextCouponIndex].code)}
            className="py-2 px-4 border border-dashed border-gray-400 rounded text-red-500 font-bold"
          >
            Copy Code: {coupons[nextCouponIndex].code}
          </button>
        </div>
      </div>

      {/* Dots for current offer */}
      <div className="flex mt-4 space-x-2">
        {coupons.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)} // Set the current index on dot click
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-red-500' : 'bg-red-300'
            }`}
          ></span>
        ))}
      </div>

      
    </div>
  );
};

export default Coupons;
