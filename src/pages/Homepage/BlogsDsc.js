import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';

const Fav = () => {
  const location = useLocation();
  const [id, setId] = useState(location.state?.id || localStorage.getItem('id') || null);
  const [blogs, setBlogs] = useState(null); 
  const [blogsall, setBlogsall] = useState([]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/blog/${id}`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/blogs-all');
        setBlogsall(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchAllBlogs();
  }, []);

  useEffect(() => {
    if (id) {
      localStorage.setItem('id', id);
      if (!blogs) {
        fetchProperty();
      }
    }
  }, [id, blogs]);

  if (!blogs) {
    return <div className="text-center py-8 text-gray-500">No blog data available.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{blogs.PageName}</title>
        <meta name="title" content={blogs.seoTitle} />
        <meta name="description" content={blogs.seoDesc} />
        <meta name="keywords" content={blogs.seoKeyword} />
        <meta name="robots" content="index, follow" />
      </Helmet>
<Navbar/>
      {/* Blog Title */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center mt-4 mb-2">{blogs.title}</h1>
      <p className="text-center text-gray-500 mb-8">{blogs.date}</p>

      {/* Featured Image */}
      <div className="flex justify-center mb-8">
        <img 
          src={blogs.featureImage} 
          alt="Blog Feature" 
          className="w-full object-cover rounded-md shadow-lg"
        />
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-full mx-auto">
        <div className="responsive-content" dangerouslySetInnerHTML={{ __html: blogs.content }} />
      </div>
      <Footer/>
    </div>
  );
};

export default Fav;
/* Add these Tailwind utility classes for better responsiveness */
<style jsx>{`
  .responsive-content img,
  .responsive-content iframe,
  .responsive-content video {
    @apply w-full h-auto;
  }

  .responsive-content table {
    @apply w-full overflow-x-auto block;
  }

  .responsive-content p {
    @apply mb-4;
  }
`}</style>
