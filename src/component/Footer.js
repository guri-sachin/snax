import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 lg:pl-20 " >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8  md:text-left">
          {/* First Column */}
          <div>
            <ul className="md:pl-16">
              <li className="mb-2 text-gray-900 font-bold">
                <Link to="/" className="hover:underline"> Our Products </Link>
              </li>
              <li className="mb-2 text-gray-700">
                <Link to="/ProductList/SNACKS" className="hover:underline"> SNACKS </Link>
              </li>
              <li className="mb-2 text-gray-700">
                <Link to="/ProductList/CHAI" className="hover:underline"> CHAI </Link>
              </li>
              <li className="mb-2 text-gray-700">
                <Link to="/ProductList/GREENTEA" className="hover:underline"> GREEN TEA </Link>
              </li>
              <li className="mb-2 text-gray-700">
                <Link to="/gifthamper" className="hover:underline"> GIFT HAMPER </Link>
              </li>
              <li className="mb-2 text-gray-700">
                <Link to="/ProductList/Premix" className="hover:underline"> PREMIX </Link>
              </li>
              <li className="mb-2 text-gray-700">
                <Link to="/contactus" className="hover:underline"> BULK ORDERS </Link>
              </li>
            </ul>
          </div>


          {/* Second Column */}
          <div>
            <ul className=" md:pl-16 ">
              <li className="mb-2 text-gray-900 font-bold">
                <Link to="/" className="hover:underline"> More Information
                </Link>
              </li> 
              
              <li className="mb-2 text-gray-700"> <Link to="/aboutus" className="hover:underline">ABOUT US</Link></li>

              <li className="mb-2 text-gray-700">  <Link to="/contactus" className="hover:underline">CONTACT US</Link></li>
              <li className="mb-2 text-gray-700" >BLOG</li>
              <li className="mb-2 text-gray-700">WE ARE HIRING</li>
              <li className="mb-2 text-[#8A0404]">contactus@snaxup.com</li>

            </ul>
          </div>



          {/* Third Column */}
          <div>
            <ul className=" md:pl-16 ">
              <li className="mb-2 text-gray-900 font-bold">
                <Link to="/" className="hover:underline"> Need Assistance ?
                </Link>
              </li>
              
              <li className="mb-2 text-gray-700">    <Link to="/ShippingPolicy" className="hover:underline">  SHIPPING POLICY </Link> </li>
              <li className="mb-2 text-gray-700">   <Link to="/PrivecyPolicy" className="hover:underline">PRIVACY POLICY </Link></li>
              <li className="mb-2 text-gray-700">    <Link to="/Termsconditions" className="hover:underline"> TERM & CONDITIONS</Link> </li>
              <li className="mb-2 text-gray-700"> <Link to="/RefuncPolicy" className="hover:underline">REFUND POLICY</Link> </li>
              <li className="mb-2 text-gray-700">FSSAI: 13321010000403</li>
            </ul>

          </div>
          <div>
            <ul className=" md:pl-16 ">
            <li className="mb-2 text-gray-900 font-bold">
                <Link to="/" className="hover:underline"> Our Address
                </Link>
              </li>
          
              <li className="mb-2 text-gray-700"> Unit2, A123, DDA Sheds, Block A, Okhla Phase II, Okhla Industrial Estate, New Delhi, Delhi 110020


</li>
<li className="mb-2 text-gray-700">Our hours of operation are Monday-Saturday: 10 AM - 6 PM IST
</li>


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
