import React, { useState,useEffect } from 'react';
import { useCart } from '../../CartContext'; 
import Navbar from '../../component/Navbar';
import Slider from '../../component/Slider';
import Customise from '../../component/Customise';
import Newsletter from '../../component/Newsletter';
import CustRiview from '../../component/CustRiview';
import CodesForGift from '../../component/CodesForGift';

import AddRiview from '../../component/AddRiview'; 

import Footer from '../../component/Footer';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';


import SecureStorage from 'react-secure-storage';



const ProductDetail = () => {
  const navigate = useNavigate();
  const { slug } = useParams(); // Extract the slug from the URL

  const apiUrl = process.env.REACT_APP_API_URL;

  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedButton, setSelectedButton] = useState(0);
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState();

  const [sku, setSKU] = useState([0]);
  const [skus, setSKUs] = useState([]);
  const [rating, setRating] = useState([]); // State to hold the fetched SEO data

  const [showComponent2, setShowComponent2] = useState(false);

  const [editor, setEditorText] = useState([]); 
  const { addToCart } = useCart();
  const [sizes, setSizes] = useState([]);
  const [discount, setDiscount] = useState([0]); 
  const [discounts, setDiscounts] = useState([]); 


  const [size, setSize] = useState(sizes[0]); 
  const [price, setPrice] = useState([0]); 
  const [featureimg, setFeatureimg] = useState(''); 

  const [mrp, setMRP] = useState(product.product_p_pice); 

  const [prices, setPrices] = useState([]);
  const [points, setPoints] = useState([]);
  
  const [productmrp, setMRPofproduct] = useState([]); // Assuming product.sizes is an array of sizes
  
  // Assuming product.sizes is an array of sizes



  const [id, setId] = useState(location.state?.id || SecureStorage.getItem('id') || null);


  // Automatically select the first size and price on initial render

// Render loading state, error state, or product data
const iconMapping = {
  'No Artificial Flavours': '🍃',
  'natural flavors':'🍃',
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
  'Made with Quality Milk':'🥛',
  'Ideal for Fitness Freaks':'🏋️' 
};

const [currentIndex, setCurrentIndex] = useState(0);

// Number of images to show at once (4 in this case)
const visibleImagesCount = 4;

// Handle sliding to the next set of images
const handleNext = () => {
  if (currentIndex + visibleImagesCount < images.length) {
    setCurrentIndex(currentIndex + visibleImagesCount);
  }
};

// Handle sliding to the previous set of images
const handlePrevious = () => {
  if (currentIndex - visibleImagesCount >= 0) {
    setCurrentIndex(currentIndex - visibleImagesCount);
  }
};

useEffect(() => {
  const fetchProperty = async () => {
    try {
      const response = await axios.get(`${apiUrl}products/${id}`);
      const fetchedProperty = response.data[0];
      setProduct(fetchedProperty);
      setTitle(fetchedProperty.product_short)
  // Extract the first price from the product_p_price string
  const firstPrice = fetchedProperty.product_p_price.split(',')[0]; // Get the first price before the comma

  const firstSku = fetchedProperty.product_sku.split(',')[0]; // Get the first sku before the comma
const disc = fetchedProperty.product_p_discount.split(',')[0];

  // Convert it to a number (remove commas and ensure it's a valid number)
  const numericPrice = parseFloat(firstPrice.replace(/,/g, '')) || 0;

  // Set the extracted price
  setPrice(numericPrice);
setSKU(firstSku)
setDiscount(disc)
  const firstPice = fetchedProperty.product_p_pice.split(',')[0]; // Get the first price before the comma

  // Convert it to a number (remove commas and ensure it's a valid number)
  const numericPice = parseFloat(firstPice.replace(/,/g, '')) || 0;

  // Set the extracted price
  setSize(numericPice);

    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };
  const fetchSeoData = async () => {
    const p_id = id
    try {
    

      const response = await fetch(`${apiUrl}all_reviews/${p_id}`);
      if (!response.ok) {
        throw new Error('No data found for the given page');
      }
      const data = await response.json();
      setRating(data); // Assuming the first result contains the data
    } catch (err) {
      setRating(null);
    }
  };

  if (id) {
    fetchProperty();
    fetchSeoData();
  }

}, [id, apiUrl]);

// Empty dependency array ensures this runs only once



  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  


  const handleButtonClick = (buttonIndex,label) => {
    setSelectedButton(buttonIndex);
    setSize(label)
    setPrice(prices[buttonIndex]);
   setSKU(skus[buttonIndex]);
   setDiscount(discounts[buttonIndex])
   
  };

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
  const handleButtonClickAgain = () => {
    setShowComponent2(true); // Show Component 2 on button click
  };


  useEffect(() => {
    if (product.product_img || product.actualp_editor || product.product_p_pice || product.product_p_price || product.product_price || product.product_points || product.product_sku || product.product_p_discount) {
      // Parse the product_img JSON string into an array
      const parsedImages = JSON.parse(product.product_img);

      const descriptionArray = product.actualp_editor;
const sizon = product.product_p_pice.split(',');
const priceson = product.product_p_price.split(',');
const MRPprice = product.product_price.split(',');
const realpoint = product.product_points.split(',');
const skusall = product.product_sku.split(',');
const disssc = product.product_p_discount.split(',');

setSKUs(skusall);
setDiscounts(disssc)
        setPrices(priceson);
         setSizes(sizon);
      setImages(parsedImages);
      setEditorText(descriptionArray);
      setMRPofproduct(MRPprice);
      setPoints(realpoint);
      // Set the first image as the selected one initially
      setSelectedImage(parsedImages[0]);
    }
  }, [product.product_img,product.actualp_editor,product.product_p_pice,product.product_p_price,product.product_price, product.product_points || product.product_sku || product.product_p_discount]);



 

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      return newQuantity;
    });
  };

 // State to store the generated random number
 const [randomNumber, setRandomNumber] = useState(null);
 useEffect(() => {
 // Function to generate a random number between 5 and 20
 const generateRandomNumber = () => {
  const min = 5;
  const max = 20;
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  setRandomNumber(randomNum);
};

generateRandomNumber();
 }, []); 



  const handleAddToCart = () => {
    // Ensure to set the quantity you want to add
    addToCart({ ...product, size, quantity, price, title, sku, id });
    Swal.fire({
      title: 'Checkout Now!',
      text: 'Item added successfully',
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
  
  const handleBuynow = () => {
    addToCart({ ...product, size, quantity: 1, price, title, sku, id });
    navigate('/Checkouts'); // Navigate to Checkout page
  };
  
  const ratings = [3, 3.5, 4, 4.5];
  const [randomRating, setRandomRating] = useState(0);

  useEffect(() => {
    // Generate a random rating when the component mounts
    const getRandomRating = () => {
      const randomIndex = Math.floor(Math.random() * ratings.length);
      return ratings[randomIndex];
    };

    setRandomRating(getRandomRating());
  }, []); // Empty dependency array ensures this runs once

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    let stars = '★'.repeat(fullStars); // Full stars
    if (halfStar) stars += '☆'; // Add half star

    return stars;
  };
console.log("sizes",sizes)


  return (
    <>

      <Helmet>
  
{product?.seoTitle && <title>{product.seoTitle}</title>}
{product?.seoTitle && <meta name="title" content={product.seoTitle} />}
{product?.seoDes && <meta name="description" content={product.seoDes} />}
{product?.seoKeyword && <meta name="keywords" content={product.seoKeyword} />}
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Navbar />
     
      
    
      <div className="container mx-auto lg:flex lg:space-x-6 mt-10">
      {/* Left Image Gallery */}
      <div className="lg:w-1/2 relative">
      <div className="grid grid-cols-4 gap-2 mx-16">
      {/* Main Image Display */}
      <div
        className="col-span-4 w-full md:h-full rounded-lg shadow-lg mb-4 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={selectedImage}
          alt="Selected"
          className={`w-full h-full object-contain transform transition-transform duration-300 ${
            zoom ? 'scale-150' : 'scale-100'
          }`}
          style={{
            transformOrigin: `${position.x}% ${position.y}%`, // Zoom at the cursor position
          }}
        />
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded z-10">
          Save {discount}%
        </div>
      </div>

      {/* Thumbnail Slider with Next/Previous Buttons */}
      <div className="flex justify-between items-center">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className={`px-3 py-1 rounded-full ${currentIndex === 0 ? 'opacity-50' : ''}`}
        >
          &#8249;
        </button>

 
        {/* <div className="grid grid-cols-4 gap-2"> */}
          {images.slice(currentIndex, currentIndex + visibleImagesCount).map((image) => (
            <img
              key={image}
              src={image}
              alt="Thumbnail"
              className="cursor-pointer rounded-lg shadow-sm hover:shadow-lg"
              onClick={() => handleImageClick(image)}
            />
          ))}
        {/* </div> */}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex + visibleImagesCount >= images.length}
          className={`px-3 py-1 rounded-full ${currentIndex + visibleImagesCount >= images.length ? 'opacity-50' : ''}`}
        >
          &#8250;
        </button>
      </div>
    </div>
    </div>

      {/* <div className="lg:w-1/2 relative">
  <div className="grid grid-cols-4 gap-2 mx-16">
    <div
      className="col-span-4 w-full md:h-full rounded-lg shadow-lg mb-4 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={selectedImage}
        alt="Selected"
        className={`w-full h-full object-contain transform  transition-transform duration-300 ${
          zoom ? "scale-150" : "scale-100"
        }`}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`, // Zoom at the cursor position
        }}
      />
      <div className="absolute top-2 right-2 bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded z-10">
        Save {discount}%
      </div>
    </div>
    {images.map((image) => (
      <img
        key={image}
        src={image}
        alt="Thumbnail"
        className="cursor-pointer rounded-lg shadow-sm hover:shadow-lg"
        onClick={() => handleImageClick(image)}
      />
    ))}
  </div>
</div> */}





        {/* Right Product Info */}
        <div className="px-4 lg:px-8 lg:w-1/2">
  <h2 className="text-3xl font-bold mb-4 mt-5 md:mt-0">
    {product.product_title}
  </h2>

  {product.product_des && (
  <p className="text-gray-700 mb-4">
    {product.product_des}
  </p>
)}


  <div className="flex items-center mb-4">
    <span className="text-yellow-500 text-2xl mr-2">       {renderStars(randomRating)}</span>
    <span className="text-gray-500">({randomRating}/5)</span>  
    <p className="text-gray-500 px-2 " >   {randomNumber !== null && (
    <span> Today bought by: <span className='text-[#8A0404]'>{randomNumber}</span></span>
      )}</p>   {/* Display the generated number */}
   
  </div>
  <div className="flex items-center mb-4">
          <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
          <span className="text-gray-700"><strong className="mx-2">Vegetarian</strong> product.</span>
        </div>


  {/* Weight and Quantity Section */}
  <div className="mb-6">
    <div className="flex items-center space-x-6">
      {/* Weight Section */}
      <div className="flex items-center space-x-2">
        <span className="text-xl text-[#8A0404]">WEIGHT:</span>
        <div className="flex space-x-2 pl-6">
        {sizes.map((label, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-full border border-gray-300 ${
            selectedButton === index ? 'bg-orange-600 text-white' : ''
          }`}
          onClick={() => handleButtonClick(index, label)}
          value={label}
        >
          {label}
        </button>
      ))}
        </div>
      </div>
    </div>
  </div>

  <div className="mb-6">
    <div className="flex items-center space-x-6">
      {/* Quantity Section */}
      <div className="flex items-center space-x-2">
        <span className="text-xl text-[#8A0404]">QUANTITY:</span>
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
  <div className="relative flex items-center ml-2">
  <span className="text-xl text-[#8A0404]">PRICE:</span>

  {/* Original Price with Strikethrough */}
  <span className="text-xl text-gray-500 line-through mr-2 pl-10">
    MRP ₹{productmrp[selectedButton]}
  </span>

  {/* Arrow Symbol */}
  <span className="text-gray-500 mx-2">
    &rarr;
  </span>

  {/* Discounted Price */}
  <span className="text-2xl text-red-600 font-bold">
    ₹{prices[selectedButton]}
  </span>
  <p className="text-sm text-gray-500 mt-1 ">
  (Incl. of all taxes)
</p>
</div>

{/* Inclusive of all taxes text */}


  </div>
 

  {/* Action Buttons */}
  <div className="flex space-x-4">
    <button className="hover:bg-orange-600 hover:text-white bg-white text-black py-2 px-8 rounded-full text-lg border border-orange-600 transition duration-300" onClick={handleAddToCart}>
      ADD TO CART
    </button>
    <button className="hover:bg-white hover:text-black bg-orange-600 text-white py-2 px-8 rounded-full text-lg border border-orange-600 transition duration-300" onClick={handleBuynow}>
      BUY NOW
    </button>
  </div>

  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-6 mt-4">
    {points.map((label, index) => (
      <div key={index} className="flex flex-col items-center">
        <span className="text-3xl">{iconMapping[label] || '?'}</span> {/* Use '🎊' if icon is not found */}
        <span className="mt-2 text-gray-700 text-center text-[12px] md:text-[18px]">{label}</span>
      </div>
    ))}
  </div>
  <div className=''>
  <CodesForGift/>
  </div>
</div>


      </div>
   <div className="container mx-auto lg:flex lg:space-x-6  border-gray-200 rounded-lg p-4 lg:px-12">
  {/* Left Section: Product Specifications */}
  <div className=" p-4">
    <h2 className="text-xl font-bold  ">Description</h2>
<div>
<div className="border-b-2 border-black-500 pb-2 mb-2 w-1/2"> </div>
  {product.actualp_editor}
</div>
<p className='text-red-900'>
 ALERT : Images are for illustration purpose only
 </p>
  </div>


</div>
<CustRiview onButtonClick={handleButtonClickAgain} />
{showComponent2 && <AddRiview productId={product.product_id} />}
      <Slider />
    
      <Newsletter></Newsletter>
      <Footer/>
    </>
  );
};

export default ProductDetail;

