import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";



const OfferCarousel = () => {
  const [offers] = useState([
    {
      discount: "10% off on",
      description: "Get Flat 10% off on Rs. 200 and Above Orders",
      code: "SNAXUPNEW",
    },
    {
      discount: "20% off on",
      description: "Gifting Get Flat 20% off on Diwali Collection",
      code: "DIWALI20",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to copy the code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: `Code ${code} copied to clipboard!`,
    });
  };

  // Auto-run the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 3000); // Slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [offers.length]);

  return (
    <div className="flex flex-col items-center">


      {/* Offer Cards */}
      <div className="flex justify-center w-full overflow-hidden mt-2">
        <div className="w-64 min-w-[16rem] p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
          <h3 className="text-md font-bold mb-2">
            {offers[currentIndex].discount}
          </h3>
          <p className="text-gray-600 mb-4">{offers[currentIndex].description}</p>
          <button
            onClick={() => copyToClipboard(offers[currentIndex].code)}
            className="py-2 px-4 border border-dashed border-gray-400 rounded text-red-500 font-bold"
          >
            Copy Code: {offers[currentIndex].code}
          </button>
        </div>
      </div>

      {/* Dots for current offer */}
      <div className="flex mt-4 space-x-2">
        {offers.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-red-500" : "bg-red-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default OfferCarousel;
