import React, { useState,useEffect } from 'react';
import Navbar from '../../component/Navbar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Collection from '../../component/Collection';
import SecureStorage from 'react-secure-storage';
import { Helmet } from "react-helmet";
import CryptoJS from 'crypto-js';

import Sugarfree from '../../component/SugarFree';
import Customise from '../../component/Customise';
import Newsletter from '../../component/Newsletter';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import Footer from '../../component/Footer';
const CustomiseGift = () => {
  const settings = {
    dots: false,            // No indicators
    infinite: true,         // Infinite looping
    speed: 500,             // Speed of the fade transition
    fade: true,             // Enable fade effect
    autoplay: true,         // Enable autoplay
    autoplaySpeed: 3000,    // Change image every 3 seconds
    arrows: false,  
          
  };
  const apiUrl = process.env.REACT_APP_API_URL;

  
  const navigate = useNavigate();
  const [hampers, setHamppers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pricez, setPricesz] = useState('');
  const [error, setError] = useState(''); 
  const [seoData, setSeoData] = useState([]); // State to hold the fetched SEO data
  const [page, setPage] = useState('gifthamper'); // State to hold the page input

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      setError(''); // Reset error message

      try {
        // Make the API call
        const response = await axios.get(`${apiUrl}chocolate-products`); // Adjust the URL if necessary
        setHamppers(response.data); // Set the products data from API response
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
    // Encrypt the product ID
    const encryptedId = CryptoJS.AES.encrypt(product.product_id.toString(), 'gurdeep').toString();
  
    // Navigate to the product page with both slug and encrypted ID
    navigate(`/product/${product.product_slug.replace(/\s+/g, '-')}/${encodeURIComponent(encryptedId)}`, {
      state: { product },
    });
  };

    const [selectedCategory, setSelectedCategory] = useState(null);
  
    // Function to handle title click
    const handleTitleClick = (category) => {
      setSelectedCategory(category);
    };
  
    // Filter hampers based on the selected category
    const filteredHampers = hampers.filter(hamper => hamper.categore === selectedCategory);

    const [sortBy, setSortBy] = useState('all');

     // Function to handle sorting change
     const handleSortChange = (e) => {
      setSortBy(e.target.value);
    };
    const sortedProducts = filteredHampers.sort((a, b) => {
      const nameA = a.short || '';  // Fallback to empty string if name is undefined
      const nameB = b.short || '';  // Fallback to empty string if name is undefined
   


      if (sortBy === 'A to Z') return nameA.localeCompare(nameB);
      if (sortBy === 'Z to A') return nameB.localeCompare(nameA);
      if (sortBy === 'NEW') return new Date(b.createdDate) - new Date(a.createdDate);
  
      return 0;  // Default, no sorting
    });

    useEffect(() => {
      const fetchSeoData = async () => {
        try {
          const response = await fetch(`${apiUrl}seo/${page}`);
          if (!response.ok) {
            throw new Error('No data found for the given page');
          }
          const data = await response.json();
          setSeoData(data[0]); // Assuming the first result contains the data
          setError(null); // Clear any previous errors
        } catch (err) {
          setSeoData(null);
          setError(err.message);
        }
      };
    
      if (page) {
        fetchSeoData(); // Call the fetch function when the page value changes
      }
    }, [page]); // Dependency array ensures useEffect runs when 'page' changes
    
  

    function homeHandle(){
      navigate("/chocolate")
    }

    
  return (
    <div className=''>
        <Helmet>
        {seoData?.seoTitle && <title>{seoData.seoTitle}</title>}
{seoData?.seoTitle && <meta name="title" content={seoData.seoTitle} />}
{seoData?.seoDes && <meta name="description" content={seoData.seoDes} />}
{seoData?.seoKeyword && <meta name="keywords" content={seoData.seoKeyword} />}

            <meta name="robots" content="index, follow" />
          </Helmet>
      <Navbar />
   {/* slider */}
       {/* slider */}
       <div className="hidden md:inline-block slider-container w-[100%]">
        <Slider {...settings}>
          <div>
            <div class="image-container" onClick={homeHandle}>
              <img
             
                src= {`${process.env.PUBLIC_URL}/img/home/CH1.webp`}
                alt="Image 1"
                class="w-[100vw]   object-contain"
              />


            </div>

          </div>
          {/* <div onClick={homeHandle}>
            <img
             
              src={`${process.env.PUBLIC_URL}/img/home/CH3.webp`}
              alt="Image 2"
              class="w-[100vw]  object-contain" />
          </div>
     */}

        </Slider>
      </div>
      <div className="inline-block md:hidden slider-container w-[100%]">
        <Slider {...settings}>
          <div>
            <div class="image-container" onClick={homeHandle}>
              <img
           
                src={`${process.env.PUBLIC_URL}/img/mob/sm1.webp`}
                alt="Image 1"
                class="w-[100vw]   object-contain"
              />


            </div>

          </div>
          <div onClick={homeHandle}>
            <img
          
              src={`${process.env.PUBLIC_URL}/img/mob/sm4.webp`}
              alt="Image 2"
              class="w-[100vw]  object-contain" />
          </div>
    
        </Slider>
      </div>
    <div className="container mx-auto px-8">
      {/* Steps to Customize Section */}
      <div className="text-center my-8">
        <h2 className="text-xl font-bold text-[#8A0404] "
        >
        PREMIUM SUGAR FREE CHOCOLATE  
        </h2>
       
      

      
      </div>
    
      {/* Sorting and View Options */}
      <div className="flex justify-between items-center my-4">
      <strong className="text-[#8A0404]">Treat Your Loved Ones to Healthier Chocolate Delights</strong>  
          <div>
        <select className="p-2 px-8 border rounded-md text-[#8A0404]"   onChange={handleSortChange} >
        <option value="all">Sort By</option>
  <option value="A to Z">A to Z</option> 
  <option value="Z to A">Z to A</option> 
          {/* Add more options here */}
        </select>
          
        </div>
      </div>
      <div className="flex justify-between items-center border-b pb-2 mb-4 mt-4 mx-auto ">
      </div>

      <div className="bg-white py-10">
     
      <div className="flex flex-wrap justify-center mx-4 md:mx-10">


      {/* Card 1 */}

  

    </div>
   
    </div>

        {/* Display filtered hampers */}
        <div className="flex flex-wrap justify-center gap-6 p-6">
  {hampers.map((hamper) => {
    // Parse the stringified array into an actual array
    const imageArray = JSON.parse(hamper.product_img);

    return (
      <div
        key={hamper.id}
        className="relative bg-white border rounded-lg shadow-lg overflow-hidden w-64 transition-transform transform hover:scale-105"
        onClick={() => handleProductClick(hamper)}
      >
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 z-10 rounded-md">
          {hamper.
actualp_discount
}% OFF
        </div>

        {/* Image with Hover Effect */}
        <div className="relative overflow-hidden">
          <img
            src={hamper.product_feature_img}
            alt={hamper.product_title}
            className="w-full h-48 object-cover transition-opacity duration-300 hover:opacity-0"
          />
          {imageArray && imageArray.length > 0 && (
            <img
              src={imageArray[0]}  // Accessing the first image from the array
              alt={hamper.title}
              className="absolute inset-0 w-full h-48 object-cover transition-opacity duration-300 opacity-0 hover:opacity-100"
            />
          )}
        </div>

        {/* Card Body */}
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-800 mb-2 text-center">{hamper.product_title
          }</h3>
          <div className="flex justify-center items-center gap-2">
            <p className="text-sm text-red-600 line-through">MRP: ₹{hamper.product_price
            }</p>
                        <p className="text-lg font-semibold text-gray-900">₹{hamper.gifts_price}</p>

          </div>
          <p className="text-sm text-gray-500 mt-1 text-center">
  (Incl. of all taxes)
</p>
        </div>
      </div>
    );
  })}
</div>
    
  
    </div>
    <Newsletter/>

    <Footer/>
    </div>
  )
}

export default CustomiseGift
