import React, { useState,useEffect } from 'react';
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer'
import Newsletter from '../../component/Newsletter'
import { Helmet } from "react-helmet";


const MyDesign = () => {

  const [page, setPage] = useState('about'); // State to hold the page input
  const [seoData, setSeoData] = useState([]); // State to hold the fetched SEO data
  const [error, setError] = useState(null); // State to handle error messages
  const apiUrl = process.env.REACT_APP_API_URL;

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

console.log("ddd",seoData)

  return (
          <> 
             <Helmet>
         <title>{seoData.seoTitle}</title> 
         <meta name="title" content={seoData.seoTitle} />
         <meta name="description" content={seoData.seoDes} />
            <meta name="keywords" content={seoData.seoKeyword} />
       
  
            <meta name="robots" content="index, follow" />
          </Helmet>
                <Navbar />
              <div class="image-container">
  <img 
    src="../img/home/combine1.webp" 
    alt="Image 1" 
    class="w-[100vw] md:h-[700px] object-cover"
  />
</div>
    <div className="flex flex-col lg:flex-row justify-center items-center p-6 px-8  lg:p-12 gap-10">
      {/* Left Section - Illustration */}
      <div className="lg:w-1/3 w-full flex justify-center lg:justify-start mb-6 lg:mb-0">
        <img
          src="../img/home/combine.jpg"
          alt="Illustration"
          className="w-full max-w-sm lg:max-w-full"
        />
      </div>

      {/* Right Section - Text Content */}
      <div className="lg:w-1/2 w-full">
        <p className="text-gray-600 leading-relaxed mb-4">
          As life shifted during the lockdown, my home became a place of reflection and rediscovery. 
          With my father and two young daughters under one roof, I found myself searching for snacks 
          that could cater to all generations. But more than food, I sought something meaningful—the 
          connection and joy that come from shared moments around the table.
        </p>

        <p className="text-gray-600 leading-relaxed mb-4">
          My thoughts turned to my sister. Though life had taken us down different paths, our bond had 
          always been rooted in a shared love for food. Some of my most cherished memories were of us 
          cooking together—her artistic approach to flavours blending effortlessly with my practicality. 
          One afternoon, while reminiscing about those days, I called her. That conversation sparked a new 
          journey for us both: <strong className='text-[#8A0404]'>SnaXup</strong>.
        </p>

        <p className="text-gray-600 leading-relaxed">
          SnaXup was born not just from a desire to create healthy snacks, but from the longing to 
          rekindle our connection. Her expertise in fusing traditional Indian flavours with modern twists 
          perfectly complemented my focus on nourishment and balance. Together, we envisioned a brand that 
          went beyond food, one that would embody the essence of family and celebrate the unique bond between sisters.
        </p>
      </div>
      
    </div>


    <div className="flex flex-col lg:flex-row justify-center items-center p-6 px-8  lg:p-12 gap-10">

          
      {/* Right Section - Text Content */}
      <div className="lg:w-1/2 w-full">
        <p className="text-gray-600 leading-relaxed mb-4">
        What makes SnaXup truly special is our commitment to **freshly preparing every snack after an order is placed**.
         This isn't just about providing healthier options—it's about infusing each snack with care and attention, making 
         sure every bite is as fresh as if it came straight from our kitchen to yours
        </p>

        <p className="text-gray-600 leading-relaxed mb-4">
        As the festive season approached, we realised that this journey was more than just a business—it was a celebration of relationships,
         family, and love. Our tagline, <strong className='text-[#8A0404]'>SnaXup LevelUp</strong>
        is an invitation for families everywhere to elevate not only their snacking choices but their connections with one another. 
        </p>

        <p className="text-gray-600 leading-relaxed">
        SnaXup isn't just about food—it's a tribute to sisterhood, to the bonds that endure, and to the joy of creating something 
        meaningful together. Every bite carries the love, creativity, and passion that only sisters united by purpose can bring to life.
        </p>
      </div>
      {/* Left Section - Illustration */}
      <div className="lg:w-1/3 w-full flex justify-center lg:justify-start mb-6 lg:mb-0">
        <img
          src="../img/home/combine2.webp"
          alt="Illustration"
          className="w-full max-w-sm lg:max-w-full"
        />
      </div>

      
    </div>
    <div className="flex flex-col lg:flex-row justify-center items-center p-6 px-8  lg:p-12 gap-10">
      {/* Left Section - Illustration */}
      <div className="lg:w-1/3 w-full flex justify-center lg:justify-start mb-6 lg:mb-0">
        <img
          src="../img/home/combine3.webp"
          alt="Illustration"
          className="w-full max-w-sm lg:max-w-full"
        />
      </div>

      {/* Right Section - Text Content */}
      <div className="lg:w-1/2 w-full">
        <p className="text-gray-600 leading-relaxed mb-4">
          As life shifted during the lockdown, my home became a place of reflection and rediscovery. 
          With my father and two young daughters under one roof, I found myself searching for snacks 
          that could cater to all generations. But more than food, I sought something meaningful—the 
          connection and joy that come from shared moments around the table.
        </p>

        <p className="text-gray-600 leading-relaxed mb-4">
          My thoughts turned to my sister. Though life had taken us down different paths, our bond had 
          always been rooted in a shared love for food. Some of my most cherished memories were of us 
          cooking together—her artistic approach to flavours blending effortlessly with my practicality. 
          One afternoon, while reminiscing about those days, I called her. That conversation sparked a new 
          journey for us both: <strong className='text-[#8A0404]'>SnaXup</strong>.
        </p>

        <p className="text-gray-600 leading-relaxed">
          SnaXup was born not just from a desire to create healthy snacks, but from the longing to 
          rekindle our connection. Her expertise in fusing traditional Indian flavours with modern twists 
          perfectly complemented my focus on nourishment and balance. Together, we envisioned a brand that 
          went beyond food, one that would embody the essence of family and celebrate the unique bond between sisters.
        </p>
      </div>
      
    </div>
    <Newsletter/>
    <Footer/>
    </>
  );
};

export default MyDesign;
