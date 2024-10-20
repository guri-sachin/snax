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
            <li className="mb-2 text-gray-700">  <Link to="/ProductList/SNACKS"> SNACKS </Link></li>
            <li className="mb-2 text-gray-700"><Link to="/ProductList/CHAI"> CHAI</Link> </li>
     <li className="mb-2 text-gray-700">        <Link to="/ProductList/GREENTEA">GREEN TEA</Link></li>
         <li className="mb-2 text-gray-700">    <Link to="/gifthamper">GIFT HAMPER</Link></li>
            <li className="mb-2 text-gray-700"><Link to="/ProductList/Premix"> PREMIX</Link></li>
           <li className="mb-2 text-gray-700">  <Link to="/contactus">BULK ORDERS</Link></li>
            </ul>
          </div>

          {/* Second Column */}
          <div>
            <ul className=" md:pl-16 ">
             <li className="mb-2 text-gray-700"> <Link to="/aboutus">ABOUT US</Link></li>
              
<li className="mb-2 text-gray-700">  <Link to="/contactus">CONTACT US</Link></li>
              <li className="mb-2 text-gray-700">BLOG</li>
              <li className="mb-2 text-gray-700">WE ARE HIRING</li>
              <li className="mb-2 text-gray-700">FAQ'S</li>
              
            </ul>
          </div>
        


          {/* Third Column */}
          <div>
            <ul className=" md:pl-16 ">
            {/* <li className="mb-2 text-gray-700"> <Link to="/contactus">  CANCELLATION & RETURNS </Link> </li> */}
           <li className="mb-2 text-gray-700">    <Link to="/ShippingPolicy">  SHIPPING POLICY </Link> </li>
             <li className="mb-2 text-gray-700">   <Link to="/PrivecyPolicy">PRIVACY POLICY </Link></li>
         <li className="mb-2 text-gray-700">    <Link to="/Termsconditions"> TERM & CONDITIONS</Link> </li>
            <li className="mb-2 text-gray-700"> <Link to="/RefuncPolicy">REFUND POLICY</Link> </li>
            <li className="mb-2 text-gray-700">FSSAI: 13321010000403</li>
            </ul>
        
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-8 text-gray-700">
        COPYRIGHT © 2024, SNAXUP.COM. ALL RIGHTS RESERVED
      </div>
    </footer>
  );
};

export default Footer;
