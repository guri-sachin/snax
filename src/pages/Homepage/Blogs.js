import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';


const Blogs = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const handleCardClick = (blog) => {
    navigate(`/BlogsDsc/${blog.slug}`, { state: { blog, id: blog.id } });
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${apiUrl}blogs-all`);
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs data:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
    <div >
      <Helmet>
        <title>Blogs</title>
        <meta name="title" content="Blogs" />
        <meta name="description" content="Explore our blogs for insights and updates." />
        <meta name="keywords" content="Blogs, Updates, News" />
        <meta name="robots" content="index, follow" />
      </Helmet>
<Navbar/>
      <h2 className="text-3xl font-semibold text-center my-4">Our Blogs</h2>

      {/* Horizontal Scroll Wrapper */}
      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="min-w-[300px] max-w-[300px] bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition transform hover:scale-105 duration-300 "
              onClick={() => handleCardClick(blog)}
            >
              <img
                src={blog.featureImage}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{blog.type}</p>
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-600">{blog.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Navigation Buttons */}
        {/* <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg"
          onClick={() => document.querySelector('.overflow-x-auto').scrollBy({ left: -300, behavior: 'smooth' })}
        >
          
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg"
          onClick={() => document.querySelector('.overflow-x-auto').scrollBy({ left: 300, behavior: 'smooth' })}
        >
          
        </button> */}
   
      </div>
   
    </div>
       <Footer/>
       </>
  );
};

export default Blogs;
