import React, { useState,useEffect } from 'react';
import Navbar from '../../component/Navbar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SecureStorage from 'react-secure-storage';
import { Helmet } from "react-helmet";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Premium from '../../component/Premium';
import Collection from '../../component/Collection';

import Sugarfree from '../../component/SugarFree';
import Customise from '../../component/Customise';
import Newsletter from '../../component/Newsletter';

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
  const [box, setBoxs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pricez, setPricesz] = useState('');
  const [error, setError] = useState(''); 
  const [page, setPage] = useState('CustomizeGift'); // State to hold the page input
  const [seoData, setSeoData] = useState([]); // State to hold the fetched SEO data

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      setError(''); // Reset error message

      try {
        // Make the API call
        const response = await axios.get(`${apiUrl}Allcustom_box`); // Adjust the URL if necessary
        setBoxs(response.data); // Set the products data from API response
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
SecureStorage.setItem('id',  hamper.id);

    navigate("/CustomItem", { state: { hamper, id: hamper.hamper } });

  
  };

  const [sortBy, setSortBy] = useState('all');

 // Function to handle sorting change
 const handleSortChange = (e) => {
  setSortBy(e.target.value);
};

  const sortedProducts = box.sort((a, b) => {
    const nameA = a.title || '';  // Fallback to empty string if name is undefined
    const nameB = b.title || '';  // Fallback to empty string if name is undefined
 


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
    navigate("/gifthamper")
  }
  return (
    <div className=''>
        <Helmet>
         <title>{seoData.seoTitle}</title> 
         <meta name="title" content={seoData.seoTitle} />
         <meta name="description" content={seoData.seoDes} />
            <meta name="keywords" content={seoData.seoKeyword} />
       
  
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
          <div onClick={homeHandle}>
            <img
              src="../img/home/custom3.webp"
              alt="Image 3"
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
        <h2 className="text-xl font-bold text-[#8A0404]">
          STEPS TO CUSTOMIZE YOUR GIFT HAMPER
        </h2>
        <div className="flex justify-between items-center border-b pb-2 mb-4 mt-4 mx-auto ">
        </div>
        <ul className="text-left my-4 space-y-2 list-disc pl-5">
  <li>SELECT PACKAGING OPTION BASIS CHOICE OF:</li>
  <li>A. A BOX OR BASKET AND RIBBON</li>
  {/* <li>B. COLOR OF BOX / BASKET</li> */}
  <li>B. ADD PRODUCTS / ITEMS IN BOX</li>
  <li>ADD TO CART, CHECKOUT AND MAKE PAYMENT</li>
  <li>YOUR ‘CUSTOMIZED HAMPER’ IS READY FOR DELIVERY</li>
</ul>

      
      </div>
      <div className="flex justify-between items-center border-b pb-2 mb-4 mt-4 mx-auto ">
      </div>
      {/* Sorting and View Options */}
      <div className="flex justify-between items-center my-4 text-[#8A0404]">
      A. First Select a Box

        <div>
        <select className="p-2 px-8 border rounded-md"   onChange={handleSortChange} >
        <option value="all">Sort By</option>
  <option value="A to Z">A to Z</option> 
  <option value="Z to A">Z to A</option> 
          {/* Add more options here */}
        </select>
          
        </div>
      </div>
      <div className="flex justify-between items-center border-b pb-2 mb-4 mt-4 mx-auto ">
      </div>
      {/* Hamper List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
     {sortedProducts.map((hamper, index) => (
          <div key={index} className="flex flex-col items-center p-4" onClick={() => handleProductClick(hamper)}>
            <img
              src={hamper.img}
              alt={hamper.title}
              className="w-full max-w-xs"
            />
               <span className="text-xl text-gray-500 line-through ">
        ₹{hamper.mrp}
      </span>

     

      {/* Discounted Price */}
      <span className="text-2xl text-red-600 font-bold">
   
      ₹{hamper.box_price}
   
        </span>
               {/* <p className="text-md  font-bold text-red-600 mt-2">{hamper.box_price}</p>  */}
               <button className="hover:bg-orange-600 hover:text-white bg-white text-black py-2 px-8 rounded-full text-lg border border-orange-600 transition duration-300">
               {hamper.title}        </button>
         
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
