import React from 'react';
import Navbar from '../../component/Navbar';
import Footer from "../../component/Footer";


const ShippingPolicy = () => {

    return (
          <>
      <Navbar/>
        <div className="max-w-3xl mx-auto bg-white  mt-10 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center text-red-500">Shipping Policy</h1>
            
            <p className="text-gray-600 mb-4">
                <strong>FREE Delivery PAN India.</strong>
            </p>
            
            <p className="text-gray-600 mb-4">
                100% of orders are shipped within one business day. Orders placed over the weekend are dispatched on Mondays.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Standard Shipping</h2>
            <p className="text-gray-600 mb-4">
                Orders placed before 12pm should be received within 5-7 working business days across India. Local deliveries happen on the same day or the next day.
            </p>
            <p className="text-gray-600 mb-4">
                Orders placed on Saturdays, Sundays, or public holidays are handled on the Monday or the first working day after. (Working days exclude Sundays and public holidays).
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Processing Delays</h2>
            <p className="text-gray-600 mb-4">
                If we are unable to process your order due to inaccurate or incomplete payment information, your order processing may be delayed an additional 2 business days. Orders with out-of-stock item(s) may take an additional 7 - 15 business days to process and ship.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Incorrect or Incomplete Address</h2>
            <p className="text-gray-600 mb-4">
                In case of a wrong or incomplete address, if your package is returned to us, you must pay all delivery costs to re-deliver your order to the corrected address. We are not responsible for the loss of your order if the address provided at checkout is incomplete or incorrect.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Damaged Parcels</h2>
            <p className="text-gray-600 mb-4">
                If the parcel received is in damaged condition, we will provide a refund or arrange to ship a new parcel.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Delayed Parcels</h2>
            <p className="text-gray-600 mb-4">
                We cannot take responsibility for delays caused by the courier, and customers have to wait until the parcel is delivered.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Order Shipment Notification</h2>
            <p className="text-gray-600 mb-4">
                You will receive a shipment notification via WhatsApp/SMS once your order has shipped. It will contain the tracking information as well as a link to track your package online.
            </p>
        </div>
        <Footer/>
        </>
    );
};

export default ShippingPolicy;
