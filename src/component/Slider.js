import React, {useRef, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TrendingProductsSlider = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const sliderRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pricez, setPricesz] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();


  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      setError(''); // Reset error message

      try {
        // Make the API call
        const response = await axios.get(`${apiUrl}products`); // Adjust the URL if necessary
        setProducts(response.data); // Set the products data from API response
      } catch (err) {
        // If there is an error, set the error message
        if (err.response) {
          // Server responded with a status other than 200 range
          setError(`Error: ${err.response.data.error || 'Something went wrong'}`);
        } else if (err.request) {
          // Request was made, but no response was received
          setError('Error: No response from the server');
        } else {
          // Something happened while setting up the request
          setError('Error: Failed to make the request');
        }
      } finally {
        setLoading(false); // Stop loading after request is done
      }
    };

    // Call the function to fetch products
    fetchProducts();
  }, []);




 
  const handleProductClick = (product) => {
    // Save the product details in localStorage
    localStorage.setItem('id',  product.product_id);
    navigate(`/product/${product.product_slug.replace(/\s+/g, '-')}`, { state: { product, id: product.product_id } });

  };


  // Function to scroll left
  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -300, // Adjust the scroll speed
      behavior: "smooth", // Enable smooth scrolling
    });
  };

  // Function to scroll right
  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 300, // Adjust the scroll speed
      behavior: "smooth", // Enable smooth scrolling
    });
  };

  return (
    <div className="container mx-auto py-8 px-8 relative">
      <h2 className="text-center text-2xl font-bold text-[#8A0404] mb-6">TRENDING PRODUCTS</h2>


      {/* Slider */}
      <div ref={sliderRef} className="flex space-x-4 overflow-x-scroll scroll-smooth scrollbar-hide">
  {products.map((product) => (
    <div
      key={product.id}
      onClick={() => handleProductClick(product)}
      className="flex-none w-64 bg-white rounded-lg p-4 text-center  relative group"
    >
      {/* Save Button */}
      <button className="absolute top-2 right-2 bg-orange-600 text-white text-sm font-bold px-2 py-1 rounded z-10">
     {product.product_size}
      </button>

      {/* Product Image */}
      <img
        src={product.product_feature_img}
        alt={product.product_short}
        className="mx-auto w-full h-48 object-contain mb-4"
      />

      {/* Product Title */}
      <h3 className="font-semibold">{product.product_short}</h3>

      {/* Price Display */}
      <p className="text-xl font-bold text-red-600">
        <span className="text-md text-gray-500 line-through">
        MRP ₹{product.product_price ? product.product_price.split(',')[0] : 'N/A'}
        </span>
        <span className="text-gray-500 mx-2">&rarr;</span>
        ₹{product.actualp_price ? product.actualp_price.split(',')[0] : 'N/A'}
      </p>

      {/* Rating Section (only show if product.rating exists) */}
      {product.rating && (
        <div className="flex items-center justify-center mt-2">
          {/* Display stars dynamically based on rating */}
          {Array(Math.floor(product.rating))
            .fill(0)
            .map((_, index) => (
              <svg
                key={index}
                className="w-5 h-5 text-yellow-500"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"></polygon>
              </svg>
            ))}
          {product.rating % 1 !== 0 && (
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <polygon fill="#E5E7EB" points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"></polygon>
              <polygon fill="currentColor" points="12 2 15 9 17.5 9 16 13.5 18 20 12 16 5 20 7 14 2 9 9 9"></polygon>
            </svg>
          )}
          <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
        </div>
      )}

      {/* Overlay with Button on Hover */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
        <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-all duration-200">
          Get it
        </button>
      </div>
    </div>
  ))}
</div>



 
    </div>
  );
};

export default TrendingProductsSlider;
