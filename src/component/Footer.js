import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 lg:pl-20 " >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* First Column */}
          <div>
            <ul className=" md:pl-16 ">
            <Link to="/ProductList/SNACKS">  <li className="mb-2 text-gray-700">SNACKS</li></Link>
            <Link to="/ProductList/NUTS"> <li className="mb-2 text-gray-700">NUTS</li></Link>
            <Link to="/ProductList/GREENTEA"> <li className="mb-2 text-gray-700">GREEN TEA</li></Link>
            <Link to="/gifthamper"> <li className="mb-2 text-gray-700">GIFT HAMPER</li></Link>
            <Link to="/ProductList/Premix"> <li className="mb-2 text-gray-700">PREMIX</li></Link>
            <Link to="/contactus"> <li className="mb-2 text-gray-700">BULK ORDERS</li></Link>
            </ul>
          </div>

          {/* Second Column */}
          <div>
            <ul className=" md:pl-16 ">
            <Link to="/aboutus">  <li className="mb-2 text-gray-700">ABOUT US</li></Link>
              
  <Link to="/contactus"><li className="mb-2 text-gray-700">CONTACT US</li></Link>
              <li className="mb-2 text-gray-700">BLOG</li>
              <li className="mb-2 text-gray-700">WE ARE HIRING</li>
              <li className="mb-2 text-gray-700">FAQ'S</li>
            </ul>
          </div>

          {/* Third Column */}
          <div>
            <ul className=" md:pl-16 ">
            <Link to="/contactus">  <li className="mb-2 text-gray-700">CANCELLATION & RETURNS</li></Link> 
            <Link to="/contactus">    <li className="mb-2 text-gray-700">SHIPPING & EXCHANGE</li></Link> 
            <Link to="/contactus">   <li className="mb-2 text-gray-700">PRIVACY POLICY</li></Link> 
            <Link to="/contactus">  <li className="mb-2 text-gray-700">TERM & CONDITIONS</li></Link> 
            <Link to="/contactus"> <li className="mb-2 text-gray-700">REFUND POLICY</li></Link> 
            </ul>
        
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-8 text-gray-500">
        COPYRIGHT © 2024, SNAXUP.COM. ALL RIGHTS RESERVED
      </div>
    </footer>
  );
};

export default Footer;
