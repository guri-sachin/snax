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
import SliderForHome from '../../component/Slider';
import FooterSection from '../../component/FooterSection';
import Reviews from '../../component/Reviews';
import SugarFreeAdvance from '../../component/SugarFreeAdvance';
import ReactGa from "react-ga";

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
          <div>
            <div class="image-container" onClick={homeHandle}>
              
              <img
                              src={`${process.env.PUBLIC_URL}/img/home/L1.webp`}

            
                alt="Image 1"
                class="w-[100vw]   object-contain"
              />

            </div>

          </div>
          <div onClick={homeHandle}>
            <img
                                          src={`${process.env.PUBLIC_URL}/img/home/2.webp`}

    
              alt="Image 2"
              className="h-auto w-auto object-contain"  />
          </div>
          <div onClick={homeHandle}>
            <img
              src="../img/home/3.webp"
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
                                                        src={`${process.env.PUBLIC_URL}/img/mob/1.webp`}

                alt="Image 1"
                class="w-[100vw]   object-contain"
              />


            </div>

          </div>
          <div onClick={homeHandle}>
            <img
                                                                    src={`${process.env.PUBLIC_URL}/img/mob/2.webp`}

              alt="Image 2"
              class="w-[100vw]  object-contain" />
          </div>
          <div onClick={homeHandle}>
            <img
                                                                                src={`${process.env.PUBLIC_URL}/img/mob/3.webp`}

              alt="Image 3"
              class="w-[100vw]  object-contain" />
          </div>

        </Slider>
      </div>
  
    {/* collection */}
    <Collection/>
    {/* premium */}
    <Premium/>
    <Reviews/>
    {/* sugar */}
    <Sugarfree/>

<SliderForHome/>

    <Newsletter/>
    <FooterSection></FooterSection>

    <Footer/>
    </div>
    </>
  )
}

export default Homepage
