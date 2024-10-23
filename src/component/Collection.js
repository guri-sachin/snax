import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div
      className={`relative overflow-hidden p-2 rounded-lg transition-all duration-300 mx-4 ${
        isHovered ? 'bg-gray-100' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded z-10">
        <p>{save}</p>
      </div>

      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-[270px] object-contain transition-transform duration-300 ${
            isHovered ? 'scale-110' : ''
          }`}
        />
      </div>

      <div className="text-center mt-4 p-6 ">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-xl font-bold text-red-600">
          <span className="text-md text-gray-500 line-through ">
          MRP ₹{mrp}
          </span>
          <span className="text-gray-500 mx-2">&rarr;</span>
          ₹{price}
          <p className="text-sm text-gray-500 mt-1 ">
  (inclusive of all taxes)
</p>
        </p>
      </div>
    </div>
  );
};

const Collection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get(`${apiUrl}/products/latest/new`);
        setProducts(response.data);
      } catch (err) {
        setError(
          err.response
            ? `Error: ${err.response.data.error || 'Something went wrong'}`
            : 'Error: No response from the server'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    localStorage.setItem('id', product.product_id);
    navigate(`/product/${product.product_slug.replace(/\s+/g, '-')}`, {
      state: { product, id: product.product_id },
    });
  };
  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / visibleCardsCount(); // Calculate the width of one card
      scrollRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth',
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / visibleCardsCount(); // Calculate the width of one card
      scrollRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    }
  };
  
  // Function to determine how many cards are visible based on screen size
  const visibleCardsCount = () => {
    const screenWidth = window.innerWidth;
    
    if (screenWidth <= 640) {
      // For small screens (mobile), show 1 card
      return 1;
    } else if (screenWidth <= 1024) {
      // For medium screens (tablet), show 2 cards
      return 2;
    } else {
      // For large screens (laptop/desktop), show 4 cards
      return 4;
    }
  };
  


  return (
    <div className="py-12 px-4">
      <h2 className="text-center text-2xl font-semibold text-[#8A0404] mb-8">
        OUR COLLECTION
      </h2>

      <div className="relative">
        {/* Left Button - Show only if there are products to scroll left */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-orange-500 rounded-full z-10"
          aria-label="Scroll Left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Product Carousel */}
        <div className="overflow-hidden w-full  overflow-x-scroll scroll-smooth scrollbar-hide" ref={scrollRef}>
          <div className="flex">
            {products &&
              products.map((product) => (
                <div
                  key={product.id}
                  className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0"
                  onClick={() => handleProductClick(product)}
                >
                  <ProductCard
                    image={product.product_feature_img}
                    title={product.product_short}
                    mrp={
                      product.product_price
                        ? product.product_price.split(',')[0]
                        : 'N/A'
                    }
                    price={
                      product.actualp_price
                        ? product.actualp_price.split(',')[0]
                        : 'N/A'
                    }
                    save={product.product_size}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Right Button - Show only if there are products to scroll right */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 hover:bg-orange-500 hover:color-white rounded-full z-10"
          aria-label="Scroll Right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <br />
      <div className="text-center mt-12">
        <button
          className="hover:bg-orange-600 hover:text-white bg-white text-black py-2 px-8 rounded-full text-lg border border-orange-600 transition duration-300"
          onClick={() => navigate('/ProductList/All-Products')}
          aria-label="View All Products"
        >
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

export default Collection;
