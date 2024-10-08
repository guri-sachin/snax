import React, { useState,useEffect } from 'react';
import Navbar from '../../component/Navbar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Collection from '../../component/Collection';
import SecureStorage from 'react-secure-storage';
import { Helmet } from "react-helmet";

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
        const response = await axios.get(`${apiUrl}Allgifts`); // Adjust the URL if necessary
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


  const handleProductClick = (hamper) => {
    // Save the product details in localStorage
    SecureStorage.setItem('id',hamper.id);
    navigate("/Gifts", { state: { hamper, id: hamper.id } });

    // Navigate to the product details page (without showing the ID in the URL)
    // navigate('/product');
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
    
    console.log("hampers",hampers,sortedProducts)

    function homeHandle(){
      navigate("/customizeGift")
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
                src="../img/home/custom.webp"
                alt="Image 1"
                class="w-[100vw]   object-contain"
              />


            </div>

          </div>
          <div onClick={homeHandle}>
            <img
              src="../img/home/custom2.webp"
              alt="Image 2"
              class="w-[100vw]  object-contain" />
          </div>
    

        </Slider>
      </div>
      <div className="inline-block md:hidden slider-container w-[100%]">
        <Slider {...settings}>
          <div>
            <div class="image-container" onClick={homeHandle}>
              <img
                src="../img/mob/small1.webp"
                alt="Image 1"
                class="w-[100vw]   object-contain"
              />


            </div>

          </div>
          <div onClick={homeHandle}>
            <img
              src="../img/mob/small2.webp"
              alt="Image 2"
              class="w-[100vw]  object-contain" />
          </div>
          <div onClick={homeHandle}>
            <img
              src="../img/mob/small3.webp"
              alt="Image 3"
              class="w-[100vw]  object-contain" />
          </div>

        </Slider>
      </div>
    <div className="container mx-auto px-8">
      {/* Steps to Customize Section */}
      <div className="text-center my-8">
        <h2 className="text-xl font-bold text-[#8A0404] "
        >
        PREMIUM GIFT HAMPER  
        </h2>
       
      

      
      </div>
    
      {/* Sorting and View Options */}
      <div className="flex justify-between items-center my-4">
  <strong className="text-[#8A0404]">Buy a Gift For Your Loved Ones</strong>
  
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((hamper, index) => (
    <div key={index} className="flex flex-col items-center p-4" onClick={() => handleProductClick(hamper)}>
      <div className="w-full h-64 bg-gray-100 flex justify-center transform hover:scale-105 hover:bg-white duration-500 ease-in-out items-center overflow-hidden">
        <img
          src={hamper.feature_img}
          alt={hamper.title}
          className="w-full h-full object-contain"
        />
      </div>
      <p className="text-xl font-bold text-red-600">
      <span className="text-md text-gray-500 line-through ">
        ₹{hamper.mrp}
      </span>
      <span className="text-gray-500 mx-2">
        &rarr;
      </span>
      ₹{hamper.price}
    </p>
      <button className="hover:bg-orange-600 hover:text-white bg-white text-black py-2 px-8 rounded-full text-lg border border-orange-600 transition duration-300">
        {hamper.title}
      </button>
    </div>
  ))} 
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {hampers.map((hamper, index) => (
    <div key={index} className="relative flex flex-col items-center p-4 border rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-white"  onClick={() => handleProductClick(hamper)}>
      
      {/* Save Button */}
      <button className="absolute top-2 right-2 p-1 rounded  bg-red-500 text-white hover:bg-gray-300">
     save {hamper.discount}%
      </button>

      <div className="w-full h-64 bg-gray-100 flex justify-center items-center overflow-hidden rounded-t-lg">
        <img
          src={hamper.feature_img}
          alt={hamper.title}
          className="w-full h-full object-contain p-4 transition-transform duration-300 transform hover:scale-105"
        />
      </div>
      <p className="text-xl font-bold text-red-600 mt-4">
        <span className="text-md text-gray-500 line-through">
          ₹{hamper.mrp}
        </span>
        <span className="text-gray-500 mx-2">&rarr;</span>
        ₹{hamper.price}
      </p>
      <button className="mt-2 hover:bg-orange-600 hover:text-white bg-white text-black py-2 px-8 rounded-full text-lg border border-orange-600 transition duration-300">
        {hamper.title}
      </button>
    </div>
  ))}
</div>
  
    </div>
    <Newsletter/>

    <Footer/>
    </div>
  )
}

export default CustomiseGift
