import React, { useState, useEffect } from 'react';
import Navbar from '../../component/Navbar';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Premium from '../../component/Premium';
import Collection from '../../component/Collection';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Sugarfree from '../../component/SugarFree';
import Newsletter from '../../component/Newsletter';
import Trending from '../../component/Trending';
import FooterSection from '../../component/FooterSection';
import Reviews from '../../component/Reviews';
import ReactGa from "react-ga";
import axios from 'axios';
import Footer from '../../component/Footer';

const Homepage = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [page, setPage] = useState('home');
  const [seoData, setSeoData] = useState([]);
  const [error, setError] = useState(null);
  const [banner, setBanners] = useState([]);

  useEffect(() => {
    ReactGa.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await fetch(`${apiUrl}seo/${page}`);
        if (!response.ok) throw new Error('No data found for the given page');
        const data = await response.json();
        setSeoData(data[0]);
        setError(null);
      } catch (err) {
        setSeoData(null);
        setError(err.message);
      }
    };

    if (page) fetchSeoData();
  }, [page]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${apiUrl}banners`);
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching banners data:', error);
      }
    };
    fetchProperties();
  }, []);

  const activeBanners = banner.filter((banner) => banner.status === '1');
  const mobileBanners = banner.filter((banner) => banner.status === '0');

  // Preload images and set <link rel="preload">
  const preloadImage = activeBanners.length > 0 ? activeBanners[0].firstBanner : null;

  useEffect(() => {
    const preloadImages = (banners) => {
      banners.forEach((banner) => {
        const img = new Image();
        img.src = banner.firstBanner;
      });
    };
    preloadImages(activeBanners);
    preloadImages(mobileBanners);
  }, [activeBanners, mobileBanners]);

  function homeHandle() {
    navigate("/productlist/All-Products");
  }

  return (
    <>
      <Helmet>
        {seoData?.seoTitle && <title>{seoData.seoTitle}</title>}
        {seoData?.seoTitle && <meta name="title" content={seoData.seoTitle} />}
        {seoData?.seoDes && <meta name="description" content={seoData.seoDes} />}
        {seoData?.seoKeyword && <meta name="keywords" content={seoData.seoKeyword} />}
        <meta name="robots" content="index, follow" />

        {preloadImage && (
          <link
            rel="preload"
            href={preloadImage}
            as="image"
            type="image/webp"
          />
        )}
      </Helmet>

      <div className=''>
        <Navbar />

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
                    width="1920"  // Set explicit width
                    height="960"  // Set explicit height
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
                    width="1920"
                    height="960"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* collection */}
        <Collection />
        <Premium />
        <Reviews />
        <Sugarfree />
        <Trending />
        <Newsletter />
        <FooterSection />
        <Footer />
      </div>
    </>
  );
};

export default Homepage;
