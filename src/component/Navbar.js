import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext'; // Adjust the path as necessary
import SecureStorage from 'react-secure-storage';
import axios from 'axios'; // Import Axios for making HTTP requests


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useCart();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search icon click
  const toggleSearchPopover = () => {
    setShowSearch(!showSearch); // Toggle search popover visibility
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value); // Update search term state
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to the ProductList page with the search query
      navigate(`/ProductList/All-Products?search=${searchTerm}`);
    }
  };

  const checkUserEmail = () => {
    const userIdentifier = SecureStorage.getItem('userIdentifier');

    // Check if the email exists in sessionStorage
    if (userIdentifier) {

      // Navigate to My Orders page and pass the email
      navigate('/Myorders', { state: { userIdentifier: userIdentifier } });
    } else {

      navigate('/Login'); // Navigate to Login page
    }
  };
  const handleCartClick = () => {
    navigate('/card');
  };
  const ShowHandle = () => {
    navigate('/ProductList');
  };

  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cate, setCate] = useState([]);


  useEffect(() => {
    // Fetch banner text data from the API
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${apiUrl}topBannertext`); // API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBanners(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching banner text:', err);
        setError('Failed to load banner text. Please try again later.');
        setLoading(false);
      }
    };

    fetchBanners();

    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 2000); // 2-second interval for rotating banners

    return () => clearInterval(interval); // Cleanup on unmount
  }, [banners.length]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${apiUrl}allcategory`);
        setCate(response.data);
      } catch (error) {
        console.error('Error fetching properties data:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <div className="bg-[#8A0404] md:h-[40px] flex items-center justify-center overflow-hidden">
        {banners.length > 0 && banners[currentBannerIndex]?.banner_text && (
          <h1
            className={`text-center text-white text-sm md:text-lg transform transition-all duration-1000 ease-in-out ${currentBannerIndex % 2 === 0
                ? 'translate-y-0 opacity-100'
                : '-translate-y-full opacity-0'
              }`}
          >
            {banners[currentBannerIndex].banner_text}
          </h1>
        )}

      </div>
      <nav className="bg-light-grey shadow-lg md:h-[100px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 md:mt-4">
          <div className="flex items-center justify-between h-16 md:h-[80px]">
            {/* Logo */}
            <div className="flex-shrink-0" aria-label="Home page">
  <Link to="/">
    <img
      src="/logo.webp"
      alt="Logo"
      width="80"          // Explicit width
      height="70"         // Explicit height
      className="h-[70px] w-[80px] lg:w-auto object-contain"
    />
  </Link>
</div>


            {/* Navbar links */}   
            
            <div style={{ minHeight: '20px' }} className="hidden md:flex items-end space-x-2 lg:space-x-2 xl:space-x-4">
  <Link to="/ProductList/SuperSnacks" className="text-gray-800 hover:text-[#8A0404] rounded-md text-sm md:text-[12px] xl:text-[14px] font-medium capitalize md:uppercase">Super Snacks</Link>
  <span className="text-gray-500">|</span>
  <Link to="/ProductList/DryFruits" className="text-gray-800 hover:text-[#8A0404] rounded-md text-sm md:text-[12px] xl:text-[14px] font-medium capitalize md:uppercase">Dry Fruits</Link>
  <span className="text-gray-500">|</span>
  <Link to="/chocolate" className="text-gray-800 hover:text-[#8A0404] rounded-md text-sm font-medium capitalize md:text-[12px] xl:text-[14px] md:uppercase">Chocolate</Link>
  <span className="text-gray-500">|</span>
  {/* Healthy Gifting with Dropdown */}
  <div className="relative group">
        <Link
          to="/gifthamper"
          className="text-gray-800 hover:text-[#8A0404] rounded-md text-sm font-medium md:text-[12px] xl:text-[14px] capitalize md:uppercase peer"
        >
          Healthy Gifting
        </Link>
        {/* Dropdown */}
              {/* Dynamically Map Categories */}
    
        <div className="absolute hidden group-hover:flex peer-hover:flex flex-col bg-white shadow-md rounded-md mt-1 z-10 w-48">
        {cate.map((categoryObj) => (
          <Link
          to={{
            pathname: "/gifthamper",
          }}
          state={{ category: categoryObj.categore }} // Pass category as state
            key={categoryObj.id} value={categoryObj.categore}
            className="px-4 py-2 hover:bg-gray-100 text-sm font-medium text-gray-700"
          >
             {categoryObj.categore}
          </Link>
             ))}
           <Link
                   to="/customizeGift"

            className="px-4 py-2 hover:bg-gray-100 text-sm font-medium text-gray-700"
          >
Customise Gifts
       </Link>
        </div>
      </div>

   <span className="text-gray-500">|</span>
  <Link to="/ProductList/Premix" className="text-gray-800 hover:text-[#8A0404] rounded-md text-sm md:text-[12px] xl:text-[14px] font-medium capitalize md:uppercase">Premix</Link>
  <span className="text-gray-500">|</span>
  <Link to="/contactus" className="text-[#8A0404] hover:text-[#8A0404] rounded-md text-sm font-medium capitalize md:uppercase md:text-[13px] xl:text-[14px]">Contact Us</Link>
</div>


          

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
              {/* Search Icon */}
              <div className="relative">
                <a
                  href="#"
                  className="text-gray-800 hover:text-[#8A0404]"
                  onClick={toggleSearchPopover}
                >
                  <IoSearch className="text-xl " aria-label="search box" />
                </a>
                {/* Search Popover */}
                {showSearch && (
  <div className="absolute top-8 left-0 bg-white shadow-lg p-4 rounded-md z-50 w-72 sm:w-80 md:w-60">
    <div className="flex items-center space-x-2">
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
      <button
        className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleSearch}
        disabled={!searchTerm.trim()} // disable if searchTerm is empty or only whitespace
      >
        <IoSearch onClick={ShowHandle} aria-label="search box" />
      </button>
    </div>
  </div>
)}

              </div>

              <a
                className="relative text-gray-800 hover:text-[#8A0404] flex items-center"
                onClick={handleCartClick} href="#"
              >
                {/* Cart Icon */}
                <BsCart className="text-xl" aria-label="cart" />

                {/* Cart Item Count Badge */}
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </a>
              <a onClick={checkUserEmail} href="#" className="text-[#8A0404] hover:text-gray-600">
                <FaUser className="text-xl" aria-label="my account"></FaUser>
              </a>
            </div>

            {/* Mobile menu button */}
            {/* Mobile menu button */}
            <div className="md:hidden">
              <div className="flex items-center space-x-4 mx-4 ">
                {/* Search Icon */}
                <div className="relative">
  {/* Search Icon */}
  <a
    href="#"
    className="text-gray-800 hover:text-[#8A0404]"
    onClick={toggleSearchPopover}
    aria-label="Toggle search"
  >
    <IoSearch className="text-xl sm:text-2xl" aria-label="search box" />
  </a>

  {/* Search Popover */}
  {showSearch && (
    <div className="absolute left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded-md z-50">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
     
                       
                
        <IoSearch
          className="  cursor-pointer"
          onClick={handleSearch}
          disabled={!searchTerm.trim()} // disable if searchTerm is empty or only whitespace

          aria-label="Execute search"
        />
      </div>
    </div>
  )}
</div>



                <a
                  className="relative text-gray-800 hover:text-[#8A0404] flex items-center"
                  onClick={handleCartClick}
                >
                  {/* Cart Icon for Mobile */}
                  <BsCart className="text-xl sm:text-2xl" aria-label="cart" href="#"/> {/* Smaller size for mobile */}

                  {/* Cart Item Count Badge */}
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-600 text-white rounded-full text-xs sm:text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </a>
                <a onClick={checkUserEmail} className="text-gray-800 hover:text-gray-600">
                  <FaUser className="text-xl sm:text-2xl" aria-label="my account" href="#"/>
                </a>
                <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="Open menu">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        {isOpen && (
          <div className="md:hidden absolute z-20 w-full bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/ProductList/SuperSnacks" className="text-gray-800 hover:text-[#8A0404] block px-3 py-2 rounded-md text-base font-medium">Super Snacks</Link>
              <Link to="/ProductList/DryFruits" className="text-gray-800 hover:text-[#8A0404] block px-3 py-2 rounded-md text-base font-medium">Dry Fruits</Link>
              <Link to="/chocolate" className="text-gray-800 hover:text-[#8A0404] block px-3 py-2 rounded-md text-base font-medium">Chocolate</Link>

              {/* <Link to="/gifthamper" className="text-gray-800 hover:text-[#8A0404] block px-3 py-2 rounded-md text-base font-medium"> Healthy Gifting</Link> */}
              <div className="relative group">
        <Link
       
          className="text-gray-800 hover:text-[#8A0404] rounded-md text-sm font-medium md:text-[12px] xl:text-[14px] capitalize md:uppercase peer px-3 py-2"
        >
          Healthy Gifting
        </Link>
        {/* Dropdown */}
              {/* Dynamically Map Categories */}
    
        <div className="absolute hidden group-hover:flex peer-hover:flex flex-col bg-white shadow-md rounded-md mt-1 z-10 w-48">
        <Link
       
          to="/gifthamper"
   
            className="px-4 py-2 hover:bg-gray-100 text-sm font-medium text-gray-700"
          >
          All Gifts
          </Link>
        {cate.map((categoryObj) => (
          <Link
          to={{
            pathname: "/gifthamper",
          }}
          state={{ category: categoryObj.categore }} // Pass category as state
            key={categoryObj.id} value={categoryObj.categore}
            className="px-4 py-2 hover:bg-gray-100 text-sm font-medium text-gray-700"
          >
             {categoryObj.categore}
          </Link>
             ))}
               <Link
                   to="/customizeGift"

            className="px-4 py-2 hover:bg-gray-100 text-sm font-medium text-gray-700"
          >
Customise Gifts
       </Link>
       
        </div>
      </div>
              <Link to="/ProductList/Premix" className="text-gray-800 hover:text-[#8A0404] block px-3 py-2 rounded-md text-base font-medium">Premix</Link>
              <Link to="/contactus" className="text-gray-800 hover:text-[#8A0404] block px-3 py-2 rounded-md text-base font-medium">Contact US</Link><br />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
