import React, { useState,useEffect } from 'react';
import Navbar from '../../component/Navbar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Premium from '../../component/Premium';
import Collection from '../../component/Collection';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

import Sugarfree from '../../component/SugarFree';
import Customise from '../../component/Customise';
import Newsletter from '../../component/Newsletter';
import Trending from '../../component/Trending';
import FooterSection from '../../component/FooterSection';
import Reviews from '../../component/Reviews';
import SugarFreeAdvance from '../../component/SugarFreeAdvance';
import ReactGa from "react-ga";
import axios from 'axios';


import Footer from '../../component/Footer';
import { Navigate } from 'react-router-dom';
const Homepage = () => {
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
  const [page, setPage] = useState('home'); // State to hold the page input
  const [seoData, setSeoData] = useState([]); // State to hold the fetched SEO data
  const [error, setError] = useState(null); // State to handle error messages
  const [banner, setBanners] = useState([]); // State to hold the fetched SEO data

  
useEffect(() => {
  ReactGa.pageview(window.location.pathname);
})


   // useEffect to fetch SEO data when the 'page' state changes
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


useEffect(() => {
  // Fetch data from the API when the component mounts
  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/banners');
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching properties data:', error);
    }
  };

  fetchProperties();
}, []);

const activeBanners = banner.filter((banner) => banner.status === '1');
const mobileBanners = banner.filter((banner) => banner.status === '0');

  function homeHandle(){
    navigate("/productlist/All-Products")
  }
  return (
    <>
        <Helmet>
        {seoData?.seoTitle && <title>{seoData.seoTitle}</title>}
{seoData?.seoTitle && <meta name="title" content={seoData.seoTitle} />}
{seoData?.seoDes && <meta name="description" content={seoData.seoDes} />}
{seoData?.seoKeyword && <meta name="keywords" content={seoData.seoKeyword} />}

       
  
            <meta name="robots" content="index, follow" />
          </Helmet>
    <div className=''>
      <Navbar />
   {/* slider */}

      {/* slider */}
      <div className="hidden md:inline-block slider-container w-[100%]">
        <Slider {...settings}>
          
        {activeBanners.map((banner, index) => (
        <div key={banner.id}>
          <div className="image-container" onClick={homeHandle}>
            <img
              src={banner.firstBanner}
              alt={`Banner ${index + 1}`}
              className="w-[100vw] object-contain"
            />
          </div>
        </div>
      ))}

        </Slider>
      </div>
      <div className="inline-block md:hidden slider-container w-[100%]">
        <Slider {...settings}>
        {mobileBanners.map((banner, index) => (
        <div key={banner.id} onClick={homeHandle}>
          <div className="image-container">
            <img
              src={banner.firstBanner}
              alt={`Banner ${index + 1}`}
              className="w-[100vw] object-contain"
            />
          </div>
        </div>
      ))}

        </Slider>
      </div>
  
    {/* collection */}
    <Collection/>
    {/* premium */}
    <Premium/>
    <Reviews/>
    {/* sugar */}
    <Sugarfree/>

<Trending/>

    <Newsletter/>
    <FooterSection></FooterSection>

    <Footer/>
    </div>
    </>
  )
}

export default Homepage
