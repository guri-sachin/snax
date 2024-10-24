import React from 'react';
import { FaShippingFast, FaHeadset, FaShieldAlt } from 'react-icons/fa'; // Icons for delivery, support, secure
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp,FaPinterest  } from 'react-icons/fa';


const ServiceSocialBar = () => {
  return (
    <div className="bg-white py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        {/* Left Section: Services */}
        <div className="flex justify-center space-x-8 ">
          {/* Fast Delivery */}
          <div className="text-center">
          {/* <img src="../img/home/22.webp" alt="Secure Payment" class="md:mx-auto mb-2 h-[50px] w-auto"/> */}
          <FaShippingFast className="text-5xl text-[#b8860b] mx-auto  h-[50px] w-auto" />

          <p className="text-[#b8860b] font-semibold mt-2">FAST DELIVERY</p>
          </div>
          {/* Secure Payment */}
          <div className="text-center">
            <FaShieldAlt className="text-5xl text-[#b8860b] mx-auto  h-[50px] w-auto" />
            <p className="text-[#b8860b] font-semibold mt-2">SECURE PAYMENT</p>
          </div>
          {/* Customer Support */}
          <div className="text-center">
          <FaHeadset className="text-5xl text-[#b8860b] mx-auto  h-[50px] w-auto" />

          {/* <img src="../img/home/1.webp" alt="Fast Delivery" className="md:mx-auto mb-2 h-[50px] w-auto" /> */}
            <p className="text-[#b8860b] font-semibold mt-2">CUSTOMER SUPPORT</p>
          </div>
        </div>

        {/* Right Section: Social Media */}
        <div className="text-center">
          <p className="text-gray-800 font-semibold mb-2">
            SHOW US SOME LOVE <span className="text-red-500">❤️</span> ON SOCIAL MEDIA
          </p>
          <div className="flex justify-center space-x-4  text-3xl text-blue-500">
          <a href="https://www.facebook.com/Snaxup/" target="_blank" aria-label="facehbook">   <FaFacebook className="hover:text-yellow-600 cursor-pointer" /></a>
      <a href="https://www.instagram.com/snaxup/?hl=en" target="_blank" aria-label="instagram"><FaInstagram className="hover:text-yellow-600 cursor-pointer text-[#E60023]" /></a>
      <a href="https://in.linkedin.com/company/snaxup-healthy-foods-india-pvt-ltd" target="_blank" aria-label="linkedin"><FaLinkedin className="hover:text-yellow-600 cursor-pointer" /></a>
      <a href="https://www.instagram.com/snaxup/?hl=en" target="_blank" aria-label="pinterest"><FaPinterest className="hover:text-yellow-600 cursor-pointer text-[#E60023]" /></a>
          </div>
        </div>
      </div>
          {/* WhatsApp Floating Icon */}
    <a
      href="https://wa.me/918929446677"
      className="fixed bottom-4 right-4 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
      target="_blank"
      rel="noopener noreferrer"
        aria-label="Whatsapp icon"
    >
      <FaWhatsapp className="text-white text-2xl" />
    </a>
    </div>
  );
};

export default ServiceSocialBar;
