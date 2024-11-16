import React, { useState, useEffect } from 'react';
import { useCart } from '../../CartContext';
import Navbar from '../../component/Navbar';
import Slider from '../../component/Slider';
import Customise from '../../component/Customise';
import Newsletter from '../../component/Newsletter';
import Footer from '../../component/Footer';
import CodesForGift from '../../component/CodesForGift';
import CryptoJS from 'crypto-js';

import axios from 'axios';
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { useParams } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import SecureStorage from 'react-secure-storage';






const ProductDetail = () => {
  const navigate = useNavigate();
  const { slug, encryptedId } = useParams(); // Extract the slug and encryptedId from the URL

  const apiUrl = process.env.REACT_APP_API_URL;
  const [seoData, setSeoData] = useState([]); // State to hold the fetched SEO data
  const [page, setPage] = useState('gift'); // State to hold the page input
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedButton, setSelectedButton] = useState(0);
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState();
  const [sku, setSKU] = useState();
  const [id, setId] = useState(null);
  const [error, setError] = useState('');
  const [product_hsn, setHSN] = useState();
  const [points, setPoints] = useState([]);


  const [editor, setEditorText] = useState([]);
  const { addToCart } = useCart();
  const [sizes, setSizes] = useState([]);
  const [wib, setWib] = useState([]);

  
  const [size, setSize] = useState(sizes[0]);
  const [price, setPrice] = useState([0]);
  const [featureimg, setFeatureimg] = useState('');
  const [discount, setDiscount] = useState('');

  const [product_price, setMRP] = useState();

  const [prices, setPrices] = useState([]);

  const [productmrp, setMRPofproduct] = useState([]); // Assuming product.sizes is an array of sizes

  // Assuming product.sizes is an array of sizes





  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const bytes = CryptoJS.AES.decrypt(decodeURIComponent(encryptedId), 'gurdeep');
        const decryptedId = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedId) {
          setId(decryptedId);  // Store decrypted ID in state
        }



        const response = await axios.get(`${apiUrl}gifts/${decryptedId}`);
        const fetchedProperty = response.data;
        setProduct(fetchedProperty);
        setTitle(fetchedProperty.title)
        setMRP(fetchedProperty.mrp)
        setEditorText(fetchedProperty.detaildes)
        setSKU(fetchedProperty.sku)
        setHSN(fetchedProperty.hsn)
        setPrice(fetchedProperty.price);
        setDiscount(fetchedProperty.discount);
        const realpoint = fetchedProperty.points.split(',');
        setPoints(realpoint);
      
        const wibArray = JSON.parse(fetchedProperty.wib); 
        setWib(wibArray)
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };
    fetchProperty();

  }, []);

console.log("wib",wib)

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
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

  //mouse zoom in
  const [zoom, setZoom] = useState(false); // Whether to zoom
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Mouse position

  // Handle mouse movement to track the position
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100; // Get X position as percentage
    const y = ((e.pageY - top) / height) * 100; // Get Y position as percentage
    setPosition({ x, y });
  };

  // Handle mouse enter event to enable zoom
  const handleMouseEnter = () => {
    setZoom(true);
  };

  // Handle mouse leave event to disable zoom
  const handleMouseLeave = () => {
    setZoom(false);
  };


  useEffect(() => {
    if (product.img) {
      // Parse the product_img JSON string into an array
      const parsedImages = JSON.parse(product.img);

      setImages(parsedImages);

      setSelectedImage(parsedImages[0]);
    }
  }, [product.img]);


  // const handleQuantityChange = (e) => {
  //   const newQuantity = Number(e.target.value);
  //   setQuantity(newQuantity);

  //   // Show SweetAlert when quantity is 2 or 6
  //   if (newQuantity === 2) {
  //     Swal.fire({
  //       title: 'Get a Discount!',
  //       text: 'Add 2 more to get a 10% discount!',
  //       iconHtml: '🎊',
  //       icon: 'success',
  //       timer: 7000, // Auto-close after 7 seconds
  //       timerProgressBar: true, // Show progress bar
  //       customClass: {
  //         popup: 'animate__animated animate__fadeInDown', // Slow fade-in animation
  //       },
  //       showConfirmButton: false,
  //     });
  //   } else if (newQuantity === 6) {
  //     Swal.fire({
  //       title: 'Get a Bigger Discount!',
  //       text: 'Add 1 more to get a 15% discount!',
  //       iconHtml: '🎊',
  //       icon: 'success',
  //       timer: 7000, // Auto-close after 7 seconds
  //       timerProgressBar: true, // Show progress bar
  //       showConfirmButton: false,
  //     });
  //   }
  // };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      // handleQuantityChange({ target: { value: newQuantity } });
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      // handleQuantityChange({ target: { value: newQuantity } });
      return newQuantity;
    });
  };



  const handleAddToCart = () => {
    addToCart({ ...product, size, quantity, price, title, sku, id, product_price, product_hsn });
  };

  const handleBuynow = () => {
    addToCart({ ...product, size, quantity, price, title, sku, id, product_price, product_hsn });
    navigate('/Checkouts'); // Navigate to Login page

  };

  const handleSold = () => {

    Swal.fire({
      title: 'Stay Tune!',
      text: 'Stock Added Soon',
      iconHtml: '🎊',
      icon: 'success',
      timer: 2000, // Auto-close after 7 seconds
      timerProgressBar: true, // Show progress bar
      customClass: {
        popup: 'animate__animated animate__fadeInDown', // Slow fade-in animation
      },
      showConfirmButton: false,
    }); // Here quantity is set to 1 for a new addition
  };
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expanded state
  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  const iconMapping = {
    'No Artificial Flavours': '🍃',
    'natural flavors': '🍃',
    'High Protein': '💪',
    'Gluten Free': '🚫',
    'High Fibre': '🌾',
    'Heart Healthy': '❤️',
    'Energy Boost': '⚡',
    'Currency Delight': '💸',
    'Eggless': '🥚',
    'Tasty and Fresh': '🍽️',
    'Guilt Free Snacking': '😇',
    '100% Vegetarian': '🌱',
    'Nutritious Snack Option': '🍫',
    'Zero Transfat': '🚫',
    'Anytime Snack': '🕒',
    'The Sweet Corn Delight': '🌽',
    'Tasty Low Calorie Snacks': '🍲',
    'Crispy Corn Roasted': '🍿',
    'Zero Sugar': '🔥',
    'Nutrient Rich': '🥗',
    'Made with Quality Milk': '🥛',
    'Ideal for Fitness Freaks': '🏋️'
  };

  return (
    <>
      <Helmet>
        {seoData?.seoTitle && <title>{seoData.seoTitle}</title>}
        {seoData?.seoTitle && <meta name="title" content={seoData.seoTitle} />}
        {seoData?.seoDes && <meta name="description" content={seoData.seoDes} />}
        {seoData?.seoKeyword && <meta name="keywords" content={seoData.seoKeyword} />}
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Navbar />


    

      <div className="container mx-auto lg:flex lg:space-x-6 mt-10 lg:pl-10">
        {/* Left Image Gallery */}
        <div className="lg:w-1/2 relative">
  {/* Flex container to align main image and thumbnail slider horizontally on larger screens */}
  <div className="flex flex-col-reverse md:flex-row">
    {/* Thumbnail Slider */}
    <div className="w-full md:w-1/4 md:ml-4">
      {/* Display thumbnails at the bottom for mobile, on the side for larger screens */}
      <div className="flex overflow-x-scroll md:overflow-y-scroll md:flex-col gap-2 scrollbar-hide md:h-[640px] mt-4 md:mt-0">
        {images.map((image) => (
          <img
            key={image}
            src={image}
            alt="Thumbnail"
            className="cursor-pointer rounded-lg shadow-sm hover:shadow-lg h-[100px] w-[100px] md:h-[120px] md:w-[120px] md:p-3"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>

    {/* Main Image Display */}
    <div
      className="w-full md:w-4/4 relative rounded-lg  shadow-lg mb-4 overflow-hidden md:aspect-ratio: 16 / 9"
      // style={{ aspectRatio: '16 / 9' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={selectedImage}
        alt="Selected"
        className={`w-full h-full p-0  md:p-1 lg:p-0 md:object-fill transform transition-transform duration-300 ${zoom ? 'scale-150' : 'scale-100'}`}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`, // Zoom at the cursor position
        }}
      />
      <div className="absolute top-2 right-2 bg-orange-600 text-white text-sm font-bold px-2 py-1 rounded z-10">
        Save {discount}%
      </div>
    </div>
  </div>
</div>




    





        {/* Right Product Info */}
        <div className="px-4 lg:px-8 lg:w-1/2">
        <h3 className='pb-2 pt-2 bold text-orange-400'>SnaXup</h3>
          <h2 className="text-3xl font-bold mb-4 mt-5 md:mt-0">
            {product.title}
          </h2>

          {product.product_des && (
            <p className="text-gray-700 mb-4">
              {product.des}
            </p>
          )}


          {/* <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-2xl mr-2">       {renderStars(randomRating)}</span>
            <span className="text-gray-500">({randomRating}/5)</span>
            <p className="text-gray-500 px-2 " >   {randomNumber !== null && (
              <span> Today bought by: <span className='text-[#8A0404]'>{randomNumber}</span></span>
            )}</p> 

          </div> */}
          <div className="flex items-center mb-4">

          <div className="w-8 h-8  border-2 border-green-500 flex items-center justify-center rounded-md">
    <span className="w-4 h-4 bg-green-500 rounded-full"></span>
  </div>
            <span className="text-gray-700"><strong className="mx-2">Vegetarian</strong> product.</span>
          </div>


          {/* Weight and Quantity Section */}
          <div className="mb-6">
            <div className="flex items-center space-x-6">
              {/* Weight Section */}
              {/* <div className="flex items-center space-x-2">
                <span className="text-lg text-[#8A0404]">WEIGHT:</span>
                <div className="flex space-x-2 pl-6">
                  {sizes.map((label, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-full border border-gray-300 ${selectedButton === index ? 'bg-orange-600 text-white' : ''
                        }`}
                      onClick={() => handleButtonClick(index, label)}
                      value={label}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div> */}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-6">
              {/* Quantity Section */}
              <div className="flex items-center space-x-2">
                <span className="text-lg text-[#8A0404]">QUANTITY:</span>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="px-4 h-10 py-2 border border-gray-300 rounded-l-lg bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="w-12 h-10 text-center border-t border-b border-gray-300"
                    value={quantity}
                    // onChange={handleQuantityChange}
                    min="1"
                  />
                  <button
                    onClick={increaseQuantity}
                    className="px-4 h-10 py-2 border border-gray-300 rounded-r-lg bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="mb-6">
            <div className="relative flex items-center">
              <span className="text-lg text-[#8A0404]">PRICE:</span>

              {/* Original Price with Strikethrough */}
              <span className="text-sm sm:text-sm text-lg text-gray-500 line-through pl-10">
  MRP ₹{product_price}
</span>
              {/* Arrow Symbol */}
              <span className="text-gray-500 mx-2">
                &rarr;
              </span>

              {/* Discounted Price */}
              <span className="text-xl text-red-600 font-bold">
                ₹{price}
              </span>&nbsp;
              <p className="text-sm text-gray-500 mt-1">
                (Incl. of all taxes)
              </p>
            </div>

            {/* Inclusive of all taxes text */}


          </div>

         
          {/* Action Buttons */}
          {product.stocks == 0 ? 
          <div className="flex space-x-4">
      
            <button className="hover:bg-orange-600 hover:text-white bg-white text-black py-2 px-8 rounded-full text-lg border border-orange-600 transition duration-300" onClick={handleAddToCart}>
              ADD TO CART
            </button>
            <button className="hover:bg-white hover:text-black bg-orange-600 text-white py-2 px-8 rounded-full text-lg border border-orange-600 transition duration-300" onClick={handleBuynow}>
              BUY NOW
            </button>
         
          </div>
             :   <div className="flex space-x-4">
      
             <button className="hover:bg-orange-600 hover:text-white bg-black text-white py-2 px-20 rounded-full text-lg border border-orange-600 transition duration-300" onClick={handleSold}>
             Sold Out
             </button>
             
          
           </div>}

          
           {points && points.length > 0 && (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6 mt-4">
    {points.map((label, index) => (
      <div key={index} className="flex flex-col items-center">
        <span className="text-3xl">{iconMapping[label] || '?'}</span> 
        <span className="mt-2 text-gray-700 text-center text-[12px] md:text-[18px]">{label}</span>
      </div>
    ))}
  </div>
)}

          <div className=''>
            <CodesForGift />
          </div>
        </div>


      </div>

      <div className="container mx-auto lg:flex lg:space-x-6 mt-10  border-gray-200 rounded-lg  lg:px-12">
        {/* Left Section: Product Specifications */}


        {/* Right Section: About the Item */}
        <div className="container mx-auto lg:flex lg:space-x-6 mt-5  border-gray-200 rounded-lg p-4 ">
          {/* Left Section: Product Specifications */}
          <div className="">
            <h2 className="text-xl font-bold  ">Description</h2>
            <div className='text-justify'>
              <div className="border-b-2 border-black-500 pb-2 mb-2 w-1/2 "> </div>
              {product.detaildes}
            </div>
            <p className='text-red-900'>
              ALERT : Images are for illustration purpose only
            </p>
            <div className="container mx-auto lg:flex lg:space-x-6 mt-5 border-gray-200 rounded-lg ">
          {/* Left Section: Product Specifications */}
          <div className="">
            <h2
              className="text-sm font-semibold cursor-pointer flex items-center justify-between"
              onClick={toggleCollapse}
            >
              What inside the box ?
              {/* Toggle icon based on expanded state */}
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </h2>
            <div className="border-b-2 border-black-500 pb-2 mb-2 w-1/2"> </div>

            {/* Collapsible Content */}
            {isExpanded && (
              <div>
                {points && points.length > 0 && (
                <ul>
      {wib.map((item, index) => (
        <li key={index}> 🔸 {item}</li> // Render each item in a <li>
      ))}
    </ul>
)}
              </div>
            )}
          </div>
        </div>
          </div>


        </div>
        

      </div>

      <Slider />

      <Newsletter></Newsletter>
      <Footer />
    </>
  );
};

export default ProductDetail;

