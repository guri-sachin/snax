import React from "react";
import Navbar from '../../component/Navbar';
import Footer from "../../component/Footer";




const RefundPolicy = () => {
        
  return (
          <>
          <Navbar/>
    <div className="bg-gray-100 min-h-screen ">
      <div className="max-w-4xl mx-auto  rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 text-red-600">
          Refund Policy
        </h1>

        <p className="text-gray-700 mb-4">
        We have a 02 days return policy, which means you have 02 days after receiving your item to request a return. 

        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">How to initiate a return/refund:</h2>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>
          To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.

          </li>
          <li>
          To start a return, you can contact us <strong>Email</strong> at 
            <a href="mailto:contactus@snaxup.com" className="text-blue-600"> contactus@snaxup.com</a>.
          </li>
        </ul>

        <p className="text-gray-700 mb-4">
        If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.

        </p>


        <p className="text-sm font-semibold text-gray-800 mt-6 mb-2">You can always contact us for any return question at contactus@snaxup.com. 

</p> 
<h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Damages and issues
</h2>
        <p className="text-gray-700 mb-4">
        Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">        Exceptions / non-returnable items

</h2>
        <p className="text-gray-700 mb-4">
        Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.      </p>
        Unfortunately, we cannot accept returns on sale items or gift cards.



        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Refunds</h2>
        <p className="text-gray-700 mb-4">
          It will take 7 working days for your bank or credit card company to process and post the refund.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Exchanges</h2>
        <p className="text-gray-700 mb-4">
        The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.

</p>
<h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Refunds</h2>


        <p className="text-gray-700 mb-4">
        We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
If more than 15 business days have passed since we’ve approved your return, please contact us at contactus@snaxup.com.
        </p>
      </div>
    </div>
    <Footer/>

    </>
  );
};

export default RefundPolicy;
