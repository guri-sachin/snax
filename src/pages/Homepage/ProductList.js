

import React, { useState,useEffect } from 'react';
import { LuFilter } from "react-icons/lu";
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import Navbar from '../../component/Navbar';
import Footer from '../../component/Footer';
import SecureStorage from 'react-secure-storage';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';




const SindhiSpecial = () => {
  const [sortBy, setSortBy] = useState("alphabetically");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const searchTerm = query.get('search');


const [page, setPage] = useState('shop'); // State to hold the page input
const [seoData, setSeoData] = useState([]); // State to hold the fetched SEO data
const apiUrl = process.env.REACT_APP_API_URL;
const [filteredProd, setFilteredProducts] = useState([]);

const navigate = useNavigate();

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
const [pricez, setPricesz] = useState('');
const [error, setError] = useState(''); 


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
  
  


   
  useEffect(() => {
    let filtered = products;

    // Step 1: Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.product_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Step 2: Filter by in-stock products
    // if (inStockOnly) {
    //   filtered = filtered.filter(product => product.inStock);
    // }

    // Step 3: Filter by price range
    filtered = filtered.filter((product) => {
      // Convert the comma-separated string to an array of numbers
      const pricesArray = product.actualp_price.split(',').map(Number);
      // Check if any of the prices are within the selected price range
      return pricesArray.some(
        (price) => price >= priceRange[0] && price <= priceRange[1]
      );
    });

    // Step 4: Filter by size
    if (selectedSize) {
      filtered = filtered.filter((product) => {
        const sizeArray = product.actualp_piece.split(',');
        return sizeArray.includes(selectedSize);
      });
    }

    // Step 5: Sort the products
    filtered = filtered.sort((a, b) => {
      const nameA = a.product_title || ""; 
      const nameB = b.product_title || ""; 
    
      if (sortBy === "alphabetically") {
        return nameA.localeCompare(nameB);
      }

      // Convert pricesArray string to an array of numbers
      const pricesArrayA = a.actualp_price ? a.actualp_price.split(',').map(Number) : [];
      const pricesArrayB = b.actualp_price ? b.actualp_price.split(',').map(Number) : [];

      const priceA = pricesArrayA[0] !== undefined ? pricesArrayA[0] : Infinity;
      const priceB = pricesArrayB[0] !== undefined ? pricesArrayB[0] : Infinity;

      if (sortBy === "priceLowToHigh") {
        return priceA - priceB;
      }

      if (sortBy === "priceHighToLow") {
        return priceB - priceA;
      }

      return 0;
    });

    // Step 6: Set the filtered products
    setFilteredProducts(filtered);
  }, [searchTerm, inStockOnly, priceRange, selectedSize, sortBy, products]);


  // Handle price change from the slider
  const handlePriceChange = (e,index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = +e.target.value;
    setPriceRange(newPriceRange);
  };
  const [showFilters, setShowFilters] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);


 

  const handleProductClick = (product) => {
    // Encrypt the product ID
    const encryptedId = CryptoJS.AES.encrypt(product.product_id.toString(), 'gurdeep').toString();
  
    // Navigate to the product page with both slug and encrypted ID
    navigate(`/product/${product.product_slug.replace(/\s+/g, '-')}/${encodeURIComponent(encryptedId)}`, {
      state: { product },
    });
  };
  return (
    <>
    <Navbar/>
      <div className="flex flex-col lg:flex-row p-4">
        {/* Filter Button for Mobile */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-red-500 text-white "
          >
            <LuFilter className="mr-2" />
            Filters
          </button>
        </div>

        {/* Sidebar Filters */}
        <div
          className={`w-full lg:w-1/4 p-4 bg-white lg:block ${showFilters ? 'block' : 'hidden'
            }`}
        >
          {/* Filters Header with Icon */}
          <h2 className="font-bold text-lg text-red-500 flex items-center">
            <span className="mr-2">
              <LuFilter />
            </span>
            Filters
          </h2>

          {/* In Stock Toggle */}
          <div className="my-4 border-t-[1px] border-red-200">
            <label className="flex justify-between items-center my-3">
              <span className="text-red-500 ml-2">In stock only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="ml-2"
              />
            </label>
          </div>

          {/* Price Filter with Slider */}
          <div className="my-4 border-t-[1px] border-red-200">
      <h3
        className="ml-2 text-black my-3 flex justify-between items-center cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown on click
      >
        Price
        <span className="ml-2">{showDropdown ? <MdExpandLess /> : <MdExpandMore />}</span> {/* Icons for dropdown */}
      </h3>
      {showDropdown && ( // Conditionally render the dropdown section
       <div className="mt-2">
       {/* First Range Slider */}
       <input
         type="range"
         min="0"
         max="1000"
         value={priceRange[0]}
         onChange={(e) => handlePriceChange(e, 0)}
         className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-orange-600"
       />
       
       {/* Second Range Slider */}
       <input
         type="range"
         min="0"
         max="1000"
         value={priceRange[1]}
         onChange={(e) => handlePriceChange(e, 1)}
         className="w-full h-2 mt-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-orange-600"
       />
     
       {/* Min and Max Price Inputs */}
       <div className="flex items-center space-x-4 mt-4">
         <input
           type="number"
           min="0"
           max="1000"
           value={priceRange[0]}
           onChange={(e) => handlePriceChange(e, 0)}
           className="border rounded-lg p-2 w-24 text-gray-800 focus:ring-2 focus:ring-orange-500"
         />
         <span className="text-gray-600 font-semibold">to</span>
         <input
           type="number"
           min="0"
           max="1000"
           value={priceRange[1]}
           onChange={(e) => handlePriceChange(e, 1)}
           className="border rounded-lg p-2 w-24 text-gray-800 focus:ring-2 focus:ring-orange-500"
         />
       </div>
     </div>
     
      )}
    </div>


          {/* Brand Filter */}
          <div className="my-4 border-t-[1px] border-red-200">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full rounded p-1 my-3"
            >
              <option value="">Brands</option>
              <option value="SnaxUp">SnaxUp</option>
            </select>
          </div>

          {/* Size Filter */}
          <div className="my-4 border-t-[1px] border-red-200 hover:border-red-500">
  <select
    value={selectedSize}
    onChange={(e) => setSelectedSize(e.target.value)}
    className="w-full rounded p-1 my-2 hover:border-red-500"
  >
    <option value="" className="font-semibold text-red-500 hover:border-red-500">
      Sizes
    </option>
    <option  value="150g">150g</option>
    <option value="200g">200g</option>
    <option value="250g">250g</option>
    <option value="300g">300g</option>
    <option value="500g">500g</option>
  </select>
</div>
        </div>

        {/* Product Cards and Sort */}
        <div className="w-full lg:w-3/4 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text">Products</h2>
            <div>
              <label className="mr-2 text-red-500">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded p-1"
              >
                <option value="alphabetically">Alphabetically, A-Z</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
          {filteredProd.map((product) => (
  <div key={product.id} className="relative p-4 bg-white rounded-md" onClick={() => handleProductClick(product)}>
    {/* On Sale Badge */}
    {product.product_size && (
      <div className="absolute left-2 top-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full z-10">
        {product.product_size}
      </div>
    )}

    {/* Image */}
    <div className="overflow-hidden relative">
      <img
        src={product.product_feature_img}
        alt={product.name}
        loading="lazy"

        className="w-full h-[200px] object-contain transition-transform duration-300"
      />
    </div>

    {/* Product Info */}
    <h3 className="mt-2 font-bold text-center text-sm">{product.product_title}</h3>
    <div className="flex justify-center items-center gap-2">
      <p className="text-sm md:text-lg font-semibold text-red-600">
        From ₹{product.actualp_price ? product.actualp_price.split(',')[0] : 'N/A'}
      </p>
      <p className="text-sm text-gray-900 line-through">
        MRP: ₹{product.product_price ? product.product_price.split(',')[0] : 'N/A'}
      </p>
      
    </div>
    <p className="text-sm text-gray-500 mt-1 text-center">
  (inclusive of all taxes)
</p>
    <p className="text-yellow-500 text-center">{product.rating} ★</p>
  </div>
))}

</div>

        </div>
      </div>
<Footer/>
    </>
  );
};

export default SindhiSpecial;



