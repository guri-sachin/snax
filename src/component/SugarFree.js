import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const ProductCard = ({ image, title, price, mrp, save }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative max-w-sm mx-auto rounded-lg overflow-hidden bg-white transform transition-transform hover:scale-105 duration-300">
      {/* Save Badge */}
      {save && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold py-1 px-3 rounded-full z-10">
          {save}
        </div>
      )}

      {/* Product Image */}
      <div className="w-full h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 text-center">
        <h3 className="text-md font-semibold text-gray-800">{title}</h3>
        <div className="mt-2">
          <span className="text-xl font-bold text-red-600">From ₹{price}</span>
          <span className="text-sm text-gray-500 line-through ml-2">MRP: ₹{mrp}</span>
          <p className="text-sm text-gray-500 mt-1">(inclusive of all taxes)</p>
        </div>
      </div>
    </div>
  );
};

const Sugarfree = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position
  const carouselRef = useRef(null); // For referencing the carousel container
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${apiUrl}chocolate-products`);
        setProducts(response.data);
      } catch (err) {
        if (err.response) {
          setError(`Error: ${err.response.data.error || 'Something went wrong'}`);
        } else if (err.request) {
          setError('Error: No response from the server');
        } else {
          setError('Error: Failed to make the request');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    // Encrypt the product ID
    const encryptedId = CryptoJS.AES.encrypt(product.product_id.toString(), 'gurdeep').toString();

    // Navigate to the product page with both slug and encrypted ID
    navigate(`/product/${product.product_slug.replace(/\s+/g, '-')}/${encodeURIComponent(encryptedId)}`, {
      state: { product },
    });
  };

  // Dynamically calculate the card width based on screen size
  const getCardWidth = () => {
    // For small screens, we want the card to take 50% width, for large screens 33.33%
    return window.innerWidth < 768 ? 0.5 : 0.33; // Adjust as per your design
  };

  const scrollLeft = () => {
    const cardWidth = getCardWidth();
    const newPosition = scrollPosition - (carouselRef.current.offsetWidth * cardWidth);
    setScrollPosition(newPosition < 0 ? 0 : newPosition);
  };

  const scrollRight = () => {
    const cardWidth = getCardWidth();
    const newPosition = scrollPosition + (carouselRef.current.offsetWidth * cardWidth);
    const maxScroll = (products.length * carouselRef.current.offsetWidth) * getCardWidth();
    setScrollPosition(newPosition > maxScroll ? maxScroll : newPosition);
  };

  return (
    <div className="py-12 px-4">
      <h2 className="text-center text-2xl font-semibold text-[#8A0404] mb-8">SPECIAL CHOCOLATE</h2>

      <div className="relative">
        {/* Left Button */}
        {/* <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-orange-500 rounded-full z-10 sm:block lg:hidden"
          aria-label="Scroll Left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button> */}

        {/* Product Carousel */}
        <div className="overflow-hidden w-full">
          <div
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out overflow-x-scroll scroll-smooth scrollbar-hide"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {products &&
              products.map((product) => (
                <div
                  key={product.id}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0"
                  onClick={() => handleProductClick(product)}
                >
                  <ProductCard
                    image={product.product_feature_img}
                    title={product.product_short}
                    mrp={product.product_price ? product.product_price.split(',')[0] : 'N/A'}
                    price={product.actualp_price ? product.actualp_price.split(',')[0] : 'N/A'}
                    save={product.product_size}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right Button */}
        {/* <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-orange-500 rounded-full z-10 sm:block lg:hidden"
          aria-label="Scroll Right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button> */}
      </div>

      <br />
      <div className="text-center mt-12">
        <button
          className="hover:bg-orange-600 hover:text-white bg-white text-black py-2 px-8 rounded-full text-lg border border-orange-600 transition duration-300"
          onClick={() => navigate('/Chocolate')}
        >
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

export default Sugarfree;
