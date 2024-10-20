import React, { useState,useEffect } from "react";
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import Swal from "sweetalert2";
import SecureStorage from 'react-secure-storage';
import { Helmet } from "react-helmet";


function ContactForm() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [page, setPage] = useState('contact'); // State to hold the page input
  const [seoData, setSeoData] = useState([]); // State to hold the fetched SEO data
  const [error, setError] = useState(null); // State to handle error messages
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  
  });
  // New loading state
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Show loader when form is submitted
    window.gtag('event', 'button_click', {
      event_category: 'engagement',
      // event_label: label,
    });
    try {
      const response = await fetch(`${apiUrl}send-contactus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been sent successfully.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to send the message. Please try again later.',
        });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'An error occurred while sending the message.',
      });
    }
    finally {
      setLoading(false);  // Hide loader once form submission is complete
    }
  };

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



  return (
          <>
                  <Helmet>
         <title>{seoData.seoTitle}</title> 
         <meta name="title" content={seoData.seoTitle} />
         <meta name="description" content={seoData.seoDes} />
            <meta name="keywords" content={seoData.seoKeyword} />
       
  
            <meta name="robots" content="index, follow" />
          </Helmet>
          <Navbar/>
               {/* Full-screen loader overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <img src="../../img/home/loader.gif" alt="Loading..." className="w-32 h-32" />
        </div>
      )}
    <div className="flex justify-center items-center h-auto bg-white">
    <form className="w-full max-w-4xl p-8 mt-8 mb-8" onSubmit={handleSubmit}>
      <h2 className="text-3xl  tracking-wider mb-8 text-center text-[#8A0404]">
        CONTACT US 
      </h2>
    
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <input 
            className="appearance-none block w-full bg-transparent border border-gray-300 rounded-md py-3 px-4 text-gray-800 focus:outline-none focus:border-gray-500" 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <input 
            className="appearance-none block w-full bg-transparent border border-gray-300 rounded-md py-3 px-4 text-gray-800 focus:outline-none focus:border-gray-500" 
            type="email" 
            name="email" 
            placeholder="E-mail" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <input 
          className="appearance-none block w-full bg-transparent border border-gray-300 rounded-md py-3 px-4 text-gray-800 focus:outline-none focus:border-gray-500" 
          type="tel" 
          name="phone"
          placeholder="Phone Number" 
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-6 ">
        <textarea 
          className="appearance-none block w-full bg-transparent border border-gray-300 rounded-md py-3 px-4 text-gray-800 focus:outline-none focus:border-gray-500" 
          rows="4" 
          name="msg"
          placeholder="Message"
          value={formData.msg}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="px-3">
        <button 
          className="w-full bg-transparent border border-orange-600 text-orange-600 font-semibold py-3 rounded-full focus:outline-none hover:bg-orange-600 hover:text-white transition duration-300"
          type="submit"
          disabled={loading}  // Disable button while loading
>
          SEND MESSAGE
      
        </button>
      </div>
    </form>
      
    </div>

    
    <Footer/>
    </>
  );
}

export default ContactForm;
