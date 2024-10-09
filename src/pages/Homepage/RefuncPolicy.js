import React from "react";
import Navbar from '../../component/Navbar';
import Footer from "../../component/Footer";




const RefundPolicy = () => {
        
  return (
          <>
          <Navbar/>
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 text-red-600">
          Refund Policy
        </h1>

        <p className="text-gray-700 mb-4">
          Our return & refund policy is simple. If you don't like the product you have ordered, 
          just let us know within 24 hours of receiving the product. We'll be happy to send a 
          replacement & if that is not possible, we'll issue a refund of up to Rs 500.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">How to initiate a return/refund:</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>
            You can contact us via <strong>WhatsApp or Phone</strong> at 
            <a href="tel:+918929446677" className="text-blue-600"> +91 8929 446 677</a>.
          </li>
          <li>
            You can also contact us via <strong>Email</strong> at 
            <a href="mailto:contactus@snaxup.com" className="text-blue-600"> contactus@snaxup.com</a>.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Damages and Issues</h2>
        <p className="text-gray-700 mb-4">
          Please inspect your order upon reception and contact us immediately, within 1 day of 
          receipt of the item, if the item is defective, damaged, or if you receive the wrong item 
          so that we can make it right.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Refunds</h2>
        <p className="text-gray-700 mb-4">
          It will take 7 working days for your bank or credit card company to process and post the refund.
        </p>
        <p className="text-gray-700 mb-4">
          Refunds are not applicable on products bought using coupon codes or during promotional events. 
          No refund or replacement requests will be processed after 3 days of receiving the product. Orders 
          once shipped cannot be canceled.
        </p>
      </div>
    </div>
    <Footer/>

    </>
  );
};

export default RefundPolicy;
