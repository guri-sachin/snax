import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../component/Navbar';
import Customise from '../../component/Customise';
import Newsletter from '../../component/Newsletter';
import Footer from '../../component/Footer';
import { FiFilter } from 'react-icons/fi';
import SecureStorage from 'react-secure-storage';
import { IoIosSearch } from "react-icons/io";
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';



const ProductCard = ({ image, title, price,offer }) => {
  const [isHovered, setIsHovered] = useState(false);


  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  
  return (

    <div
      className={`relative overflow-hidden  transition-all duration-300  mx-10${
        isHovered ? 'bg-gray-100' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseEnter}
    >
           {/* Labels for Best Seller and New */}
           <div className="absolute top-2 right-2">
          <span className="bg-[#d4af37]  text-white text-xs font-semibold px-2 py-1 rounded-full">{offer}</span>
   
      </div>
      {/* Image */}
      <div className={`overflow-hidden ${isHovered ? 'transform scale-110' : ''}`}>
        <img
          src={image}
          alt={title}
          className={`w-full h-[200px] object-contain transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
        />
      </div>
      {/* Plus Icon */}
     
      {/* Title and Price */}
      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-md  font-bold text-red-600">₹{price}</p>
      </div>
    </div>
  );
};


const ProductList = () => {

  const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pricez, setPricesz] = useState('');
    const [error, setError] = useState(''); 
    const [page, setPage] = useState('shop'); // State to hold the page input
    const [seoData, setSeoData] = useState([]); // State to hold the fetched SEO data
  
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
  
  const { category, slug } = useParams();

console.log("get",category)
   
  useEffect(() => {
    // Function to fetch products, optionally filtering by category
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      setError(''); // Reset error message

      try {
        // If categore is present in the URL, add it as a query parameter
        const categoryParam = category ? `?categore=${category}` : '';
        
        // Make the API call with or without the category filter
        const response = await axios.get(`${apiUrl}products${categoryParam}`);
        setProducts(response.data); // Set the products data from API response
      } catch (err) {
        // Handle errors
        if (err.response) {
          // Server responded with a status other than 200 range
          setError(`Error: ${err.response.data.error || 'Something went wrong'}`);
        } else if (err.request) {
          // Request was made but no response was received
          setError('Error: No response from the server');
        } else {
          // Something else went wrong
          setError('Error: Failed to make the request');
        }
      } finally {
        setLoading(false); // Stop loading after the request is complete
      }
    };

    // Fetch products when the component mounts or when categore changes
    fetchProducts();
  }, [category]); // Re-run when categore from the URL changes


    console.log("products",products)
  
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        price: '',
        category: 'all', // default to 'all'
        stock: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('all');
    const [isShowingAll, setIsShowingAll] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value,
      }));
      setIsShowingAll(false); // Disable "Show All" when filters change
    };
    
    // Function to handle sorting change
    const handleSortChange = (e) => {
      setSortBy(e.target.value);
    };
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    // Filter products based on search query and the selected filters
    const filteredProducts = isShowingAll
    ? products.filter(product => {
        if (searchQuery) {
          // Apply search filter even if "isShowingAll" is true
          return product.product_short?.toLowerCase().includes(searchQuery);
        }
        return true;  // If no search query, show all products
      })
    : products.filter(product => {
        const { price, category, stock } = filters;
        let match = true;
  
        // Category filter
        if (category && category !== 'all') {
          match = match && product.product_categores === category;
        }
  
        // Stock filter
        if (stock) {
          match = match && product.stock === stock;
        }
  
        // Search filter
        if (searchQuery) {
          
      match = product.short_title?.toLowerCase().includes(searchQuery) ||
              product.categores?.toLowerCase().includes(searchQuery);
    }

        
  
        return match;
    });
  
    const sortedProducts = filteredProducts.sort((a, b) => {
      const nameA = a.product_short || '';  // Fallback to empty string if name is undefined
      const nameB = b.product_short || '';  // Fallback to empty string if name is undefined
      
      // Helper function to extract the lowest or highest price from a comma-separated string
      const getLowestPrice = (product) => Math.min(...product.actualp_price.split(',').map(Number));
      const getHighestPrice = (product) => Math.max(...product.actualp_price.split(',').map(Number));
      
      // Sorting by price
      if (filters.price === 'low-high') return getLowestPrice(a) - getLowestPrice(b);
      if (filters.price === 'high-low') return getHighestPrice(b) - getHighestPrice(a);
      
      // Sorting by name
      if (sortBy === 'A to Z') return nameA.localeCompare(nameB);
      if (sortBy === 'Z to A') return nameB.localeCompare(nameA);
      
      // Sorting by creation date (NEW)
      if (sortBy === 'NEW') return new Date(b.createdDate) - new Date(a.createdDate);
      
      return 0;  // Default, no sorting
  });
  


    const [currentPage, setCurrentPage] = useState(1); // Track current page
const itemsPerPage = 16; // Number of items per page

// Calculate the indexes for the current products to display
const indexOfLastProduct = currentPage * itemsPerPage;
const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct); // Adjust according to your product array

// Handle page change
const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Ensure it doesn't go below page 1
};

// Calculate total number of pages
const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);



    const handleProductClick = (product) => {
      // Save the product details in localStorage
      SecureStorage.setItem('id',  product.product_id);
      navigate(`/product/${product.product_slug.replace(/\s+/g, '-')}`, { state: { product, id: product.product_id } });

  
   
    };
    console.log("filters", sortedProducts)

    return (
      <>
              <Helmet>
              {seoData?.seoTitle && <title>{seoData.seoTitle}</title>}
{seoData?.seoTitle && <meta name="title" content={seoData.seoTitle} />}
{seoData?.seoDes && <meta name="description" content={seoData.seoDes} />}
{seoData?.seoKeyword && <meta name="keywords" content={seoData.seoKeyword} />}
            <meta name="robots" content="index, follow" />
          </Helmet>
        <div>
            <Navbar />
            <div className="py-10">
                <h2 className="text-center text-2xl font-semibold text-red-700 mb-8">PRODUCT LIST</h2>
                
             

                {/* Sidebar for mobile (visible when isOpen is true) */}
        <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:hidden`}>
          <div className="w-64 bg-white h-full p-4">
            <button onClick={toggleSidebar} className="text-gray-700 text-2xl mb-4 float-right">X</button>

            <div className="space-y-4">
              <select name="price" onChange={handleFilterChange} className="block appearance-none w-full px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white">
                <option value="">Price</option>
                <option value="low-high">Low to High</option>
                <option value="high-low">High to Low</option>
              </select>
              <select name="category" onChange={handleFilterChange} className="block appearance-none w-full px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white">
                <option value="all">All</option>
                <option value="Cookies">Cookies</option>
                          <option value="DryFruits">Dry Fruits </option>
                          <option value="SuperSnacks">Super Snacks</option>  
                          <option value="Instant Premix">Instant Premix</option> 
                          <option value="GREENTEA">Natural Green Tea</option> 
                          <option value="CHAI">CHAI</option>  
                          <option value="chocolate">Chocolate</option> 
              </select>
              <select
                onChange={handleSortChange}  // Handle sorting change
                className="px-6 py-2 bg-white text-gray-700"
              >
                <option value="all">Sort By</option>
                <option value="A to Z">A to Z</option>
                <option value="Z to A">Z to A</option>
                <option value="NEW">NEW</option>  {/* Assuming 'NEW' is based on product creation date */}
              </select>
           
            </div>
          </div>
        </div>

                {/* Regular layout for larger screens */}
            {/* Regular layout for larger screens */}
        <div className="py-8">
          <div className="flex justify-between items-center bg-[#8A0404] p-4 md:pl-16 md:pr-16">
          <div className="hidden md:flex items-center space-x-2">
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="px-4 py-2 border border-white text-gray-700 bg-white w-64"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-8 h-8 text-white"
      onChange={handleFilterChange}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-4.35-4.35M10 17a7 7 0 100-14 7 7 0 000 14z"
      />
    </svg>
  </div>
            <div className="flex md:hidden items-center justify-between space-x-4 w-full">
              {/* Filter Icon on the Left */}
              <button
                onClick={toggleSidebar}
                className=" flex md:hidden text-white text-2xl border-t-2 border-r-2 border-b-2 border-gray-300 p-2 rounded-lg">
                <FiFilter />
              </button>

              {/* Centered Input Box */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="px-2 py-2 border border-gray-300 text-gray-700 bg-white w-64 flex-grow"
              />

              {/* Right SVG Search Icon */}
              <IoIosSearch className='text-[30px] text-white' />

            </div>


            {/* Filters section hidden on small screens */}
            <div className="hidden md:flex space-x-4">
              <select
                name="price"
                onChange={handleFilterChange}
                className="px-6 py-2 bg-white text-gray-700"
              >
                <option value="">Price</option>
                <option value="low-high">Low to High</option>
                <option value="high-low">High to Low</option>
              </select>

              <select
                name="category"
                onChange={handleFilterChange}
                className="px-6 py-2 bg-white text-gray-700"
              >
                <option value="all">All</option>
                <option value="Cookies">Cookies</option>
                          <option value="Beverages">Beverages </option>
                          <option value="Instant Premix<">Instant Premix</option>  
                          <option value="Masala & Seasoning">Masala & Seasoning</option> 
                          <option value="Natural Green Tea">Natural Green Tea</option> 
                          <option value="Ready Snacks">Ready Snacks</option>  
                          <option value="chocolate">chocolate</option> 
              </select>

          

              <select
                onChange={handleSortChange}  // Handle sorting change
                className="px-6 py-2 bg-white text-gray-700"
              >
                <option value="all">Sort By</option>
                <option value="A to Z">A to Z</option>
                <option value="Z to A">Z to A</option>
                <option value="NEW">NEW</option>  {/* Assuming 'NEW' is based on product creation date */}
              </select>
            </div>
          </div>

          {/* Filter and Sort options */}
          <div className="flex justify-between items-center p-4 pl-16 pr-16">

         
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-8">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <div onClick={() => handleProductClick(product)}>
                  <ProductCard
                    key={product.id}
                    image={product.product_feature_img}
                    title={product.product_short}
                    price={product.actualp_price ? product.actualp_price.split(',')[0] : 'N/A'} // Show only the first part of the price
                    offer={product.product_size}
                  />
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}

       
          </div>
        </div>

<div className="flex justify-center mt-8 space-x-4">
  <button
    className="px-4 py-2 bg-gray-200 text-gray-700"
    onClick={handlePrevPage}
    disabled={currentPage === 1} // Disable when on first page
  >
    Previous
  </button>
  
  <button
    className="px-4 py-2 bg-gray-200 text-gray-700"
    onClick={handleNextPage}
    disabled={currentPage === totalPages} // Disable when on last page
  >
    Next
  </button>
</div>
            </div>
            {/* <Customise /> */}
            <Newsletter />
            <Footer />
        </div>
        </>
    );
};

export default ProductList;
