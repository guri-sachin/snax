import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductCard = ({ image, title, price, mrp,onClick  }) => {
  return (
    <div className="relative overflow-hidden transition-all duration-300 sm:mx-2 md:mx-4 lg:mx-10">
      {/* Image */}
      <div>
        <img
          src={image}
          alt={title}
          className="w-full h-[450px] object-cover md:object-contain transition-transform duration-300"
          onClick={onClick}
        />
      </div>
      {/* Plus Icon */}
 
      {/* Title and Price */}
      <div className="text-center mt-0">
        <p className="text-xl font-bold text-red-600">
          <span className="text-md text-gray-500 line-through ">
            ₹{mrp}
          </span>
          <span className="text-gray-500 mx-2">
            &rarr;
          </span>
          ₹{price}
        </p>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      </div>
    </div>
  );
};

const Sugarfree = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${apiUrl}chocolate-products`);
        setProducts(response.data);
      } catch (err) {
        if (err.response) {
          setError(`Error: ${err.response.data.error || 'Something went wrong'}`);
        } else if (err.request) {
          setError('Error: No response from the server');
        } else {
          setError('Error: Failed to make the request');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    localStorage.setItem('id', product.product_id);
    navigate(`/product/${product.product_slug.replace(/\s+/g, '-')}`, { state: { product, id: product.product_id } });
  };

  const handelGETon = () => {
    navigate('/Chocolate');
  };

  return (
    <div className="py-12 px-4">
      <h2 className="text-center text-2xl font-semibold text-red-700 mb-8">SUGAR FREE CHOCOLATE</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {products.slice(0, 2).map(product => (
          <ProductCard
            key={product.id}
            image={product.product_feature_img}
            title={product.product_short}
            mrp={product.product_price ? product.product_price.split(',')[0] : 'N/A'}
            price={product.actualp_price ? product.actualp_price.split(',')[0] : 'N/A'}
            onClick={() => handleProductClick(product)} // Added onClick to handle click event
          />
        ))}
      </div>
      <br />
      <div className="text-center mt-12">
        <button className="hover:bg-orange-600 hover:text-white bg-white text-black py-2 px-8 rounded-full text-lg border border-orange-600 transition duration-300" onClick={handelGETon}>
          VIEW ALL
        </button>
      </div>
    </div>
  );
};

export default Sugarfree;
