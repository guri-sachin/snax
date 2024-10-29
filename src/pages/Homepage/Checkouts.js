import React, { useState,useEffect } from 'react';
import Navbar from '../../component/Navbar';
import { useLocation,Link } from 'react-router-dom';
import axios from 'axios';

import { useCart } from '../../CartContext'; // Adjust the path as necessary
import Swal from 'sweetalert2'; // Import SweetAlert
import SecureStorage from 'react-secure-storage';
import Codes from '../../component/Codes'

const CheckoutPage = () => {
  const { cart } = useCart();
  const apiUrl = process.env.REACT_APP_API_URL;

    const location = useLocation();
    // New loading state
    const [loading, setLoading] = useState(false);

  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  // const { userIdentifier } = location.state || {}; // Retrieve userEmail from navigation state

  useEffect(() => {
    const userIdentifier = SecureStorage.getItem('userIdentifier');

    if (userIdentifier) {
      if (userIdentifier.includes('@')) {
        // If the identifier contains '@', it's an email
        setEmail(userIdentifier);
      } else {
        // Otherwise, it's considered a phone number
        setPhone(userIdentifier);
      }
    }
  }, []);
  const [address, setAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    provience: '',
    postalCode: '', 
    country: 'India',
    address_type: 'Home',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Prepaid');
  const [finalTotal, setFinalTotal] = useState(0); // Initial value set to 0


  // const handlePaymentMethodChange = (event) => {
  //   setPaymentMethod(event.target.value);
  // };


  // const calculateTotal = () => {
  //   const totalAmount = cart.reduce((total, product) => {
  //     const price = parseFloat(product.price) || 0;
  //     if (paymentMethod === 'COD') {
  //       total += 30; // Add ₹30 if COD is selected
  //     }
  //     return total + (price * product.quantity);
  //   }, 0);
  
  //   // Check if discount is applied, otherwise return totalAmount
  //   return discount > 0 ? totalAmount - (totalAmount * discount / 100) : totalAmount;
  // };
  

  const handlePaymentMethodChange = (event) => {
    const selectedPaymentMethod = event.target.value;
    setPaymentMethod(selectedPaymentMethod);
  
    // Recalculate total after switching payment methods
    const totalAfterSwitch = calculateTotal(selectedPaymentMethod);
    setFinalTotal(totalAfterSwitch);
  };
  
  
    
  // Calculate total whenever cart, paymentMethod, or discount changes
useEffect(() => {
  const totalAmount = calculateTotal(paymentMethod);
  setFinalTotal(totalAmount);
}, [cart, paymentMethod, discount]); // Recalculate total when cart, payment method, or discount changes


   const calculateTotal = (method) => {
    let totalAmount = cart.reduce((total, product) => {
      const price = parseFloat(product.price) || 0;
      return total + (price * product.quantity);
    }, 0);
  
    // Apply coupon discount first
    // if (discount > 0) {
      totalAmount -= (totalAmount * parseFloat(discount) / 100);
    
  
    // Add ₹30 for COD (if selected)
    if (method === 'COD') {
      totalAmount += 30; // Add ₹30 if COD is selected
    }
    return totalAmount;
  };
  



  // Form validation for email, phone, and address fields
  const validateForm = () => {
    if (!email || !phone || !address.addressLine1 || !address.city || !address.provience || !address.postalCode) {
      setError('Please fill out all required fields');
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill out all required fields!',
      });
      return false;
    }
    return true;
  };



const handleCheckout = async () => {
  setError('');

  if (!validateForm()) return;

  const payload = {
    email,
    phone,
    totalAmount: calculateTotal(paymentMethod),
    discount: discount,
    paymentMethod,
    address,
    afterdiscount: discountedPrice,
    items: cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size || 'N/A',
      price: parseFloat(item.price),
      img: item.feature_img,
      title: item.product_short,
    })),
  };

  try {

    // Step 1: Create order
    const orderResponse = await fetch(`${apiUrl}orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!orderResponse.ok) {
      const errorDetails = await orderResponse.text();
      throw new Error(`Error creating order: ${errorDetails}`);
    }

    const orderData = await orderResponse.json();
    const amountToPay = discountedPrice ? discountedPrice : calculateTotal(paymentMethod); // Use discountedPrice if available, otherwise calculateTotal

    if (paymentMethod === 'COD') {
setLoading(true);
  // Step 4: Call Shiprocket API to create a shipment
  const shiprocketPayload = {
    order_id: orderData.orderId,
    order_date: new Date().toISOString(),
    pickup_location: "Primary",
    billing_customer_name: email,
    billing_last_name: email,
    billing_address: payload.address.addressLine1,
    billing_city: payload.address.city,
    billing_pincode: payload.address.postalCode,
    billing_state: payload.address.provience,
    billing_country: payload.address.country,
    billing_email: email,
    billing_phone: phone,
    shipping_is_billing: true,
    order_items: cart.map(item => ({
      name: item.title,
      sku: item.sku,
    
      units: item.quantity,
      selling_price: item.price,
      length: 10, // Assuming values
      breadth: 10,
      height: 10,
      weight: 1,
    })),
    payment_method: 'COD',
    sub_total: calculateTotal(paymentMethod),
    length: 10,
    breadth: 10,
    height: 10,
    weight: 1,
  };

const shiprocketResponse = await axios.post(`${apiUrl}shiprocket/create-order`, shiprocketPayload);
if (shiprocketResponse.status === 200) {
setLoading(false);

Swal.fire({
icon: 'success',
title: 'Order placed successfully!',
text: 'Your order has been placed and is being processed.',
});
} else {
throw new Error('Failed to create shipment');
}
    }else {
    // Step 2: Initiate Razorpay payment
    const paymentOptions = {
      amount: amountToPay , // Razorpay requires amount in paise
      currency: 'INR',
      order_id: orderData.orderId, // Use the order ID generated by your backend
    };

    const { data: razorpayOrder } = await axios.post(`${apiUrl}create-order`, paymentOptions);

    const options = {
      key: 'rzp_live_WsL3Pddgbmkywu' , // Replace with your Razorpay Key ID
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'snaxup',
      description: 'B2B Order Transaction',
      order_id: razorpayOrder.order_id, // Razorpay Order ID
      handler: async function (response) {

           // Step 3: Verify payment with the backend
    const verifyPayload = {
      orderId: orderData.orderId,
      paymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature
    };

    const verifyResponse = await fetch(`${apiUrl}verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(verifyPayload),
    });

    if (verifyResponse.ok) {
      const result = await verifyResponse.json();
        // Step 3: After successful payment, update payment status in the database
        const paymentUpdatePayload = {
          orderId: orderData.orderId,
          paymentId: response.razorpay_payment_id,
          
          status: 'Success',
        };
        const paymentUpdateResponse = await fetch(`${apiUrl}update-order-status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(paymentUpdatePayload),
        });

        if (!paymentUpdateResponse.ok) {
          const errorDetails = await paymentUpdateResponse.text();
          throw new Error(`Error updating payment status: ${errorDetails}`);
        }
      } else {
        const errorDetails = await verifyResponse.text();
        throw new Error(`Payment verification failed: ${errorDetails}`);
      }
  
setLoading(true);

        // Step 4: Call Shiprocket API to create a shipment
           const shiprocketPayload = {
                order_id: orderData.orderId,
                order_date: new Date().toISOString(),
                pickup_location: "Primary",
                billing_customer_name: email,
                billing_last_name: email,
                billing_address: payload.address.addressLine1,
                billing_city: payload.address.city,
                billing_pincode: payload.address.postalCode,
                billing_state: payload.address.provience,
                billing_country: payload.address.country,
                billing_email: email,
                billing_phone: phone,
                shipping_is_billing: true,
                order_items: cart.map(item => ({
                  name: item.title,
                  sku: item.sku,
                
                  units: item.quantity,
                  selling_price: item.price,
                  length: 10, // Assuming values
                  breadth: 10,
                  height: 10,
                  weight: 1,
                })),
                payment_method: 'Prepaid',
                sub_total: calculateTotal(),
                length: 10,
                breadth: 10,
                height: 10,
                weight: 1,
              };

        const shiprocketResponse = await axios.post(`${apiUrl}shiprocket/create-order`, shiprocketPayload);
        if (shiprocketResponse.status === 200) {
          setLoading(false);

          Swal.fire({
            icon: 'success',
            title: 'Order placed successfully!',
            text: 'Your order has been placed and is being processed.',
          });
        } else {
          throw new Error('Failed to create shipment');
        }
      },
      prefill: {
        name: address.name,
        email: email,
        contact: phone,
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  } catch (err) {
    console.error('Error during checkout:', err.message);

    // Show error alert if payment fails or order creation fails
    Swal.fire({
      icon: 'error',
      title: 'Payment Failed',
      text: err.message || 'Something went wrong. Please try again.',
    });

    setError(err.message || 'Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};


  const [couponCode, setCouponCode] = useState(''); // Store the coupon code entered by the user
 
   // Initial total amount (without coupon)


   const handleApplyCoupon = async () => {
    try {
      const orderAmount = calculateTotal(paymentMethod); // Calculate the total based on selected payment method
      const response = await fetch(`${apiUrl}validate-coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: couponCode,
          category: "any",
          orderAmount: orderAmount,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const discountPercentage = data.discount;
        setDiscount(discountPercentage); // Set the discount value in state
        // Recalculate the final amount after applying the discount
        const finalAmount = calculateTotal(paymentMethod);
        setFinalTotal(finalAmount); // Ensure the finalTotal is updated
        Swal.fire({
          title: 'Coupon Applied!',
          text: `You get a ${discountPercentage}% discount. Your final amount is ₹${finalAmount.toFixed(2)}.`,
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.error || 'An unknown error occurred.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const initialTotal = calculateTotal();


  return (
          <>
          <Navbar/>
          {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <img src="../../img/home/loader.gif" alt="Loading..." className="w-32 h-32" />
        </div>
      )}
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Left Section - Contact & Delivery */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-[#8A0404]">Contact</h2>
          <form className="space-y-4">

          <div>
            
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded" placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
           
        
         

      {/* Conditional message based on phone presence */}
      {email ? (
        <p className="text-sm text-green-600 mt-2">Happy shopping!</p>
      ) : (
        <p className="text-sm text-gray-600 mt-2">
          We are using this email to create your account. You will use this number for login.
        </p>
      )}

     
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-6 text-[#8A0404]">Delivery</h2>

            <div>
              <label className="block text-sm font-medium text-gray-600">Country/Region</label>
              <select className="w-full p-3 border border-gray-300 rounded">
                <option>India</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">First name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded" placeholder="First name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Last name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded" placeholder="Last name" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Address</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded" placeholder="Address" 
                                value={address.addressLine1}
                                onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Apartment, suite, etc. (optional)</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded" placeholder="Apartment, suite, etc." 
                 onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">City</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded" placeholder="City"
                                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">State</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded" placeholder="State"
                                  onChange={(e) => setAddress({ ...address, provience: e.target.value })}
                                  />
              

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">PIN code</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded" placeholder="PIN code"
                                                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}

                 />
              </div>
          
            </div>

            <div>
            <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="text-offers" className="mr-2" />
              <label htmlFor="offers" className="text-sm">Email me with news and offers</label>

              </div>
              
             <div className="flex items-center space-x-2 mt-4">
              <input type="checkbox" id="save" className="mr-2" />
              <label htmlFor="save" className="text-sm">T&C Apply</label>
            </div> 
          </form>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-[#8A0404]">Order Summary</h2>
    

    {/* actual card */}
          {cart.map((product, index) => (
          <div  key={index}  className="flex justify-between items-center border-b pb-4">
          
            <div
           className="flex items-center space-x-4">
              <img src={product.feature_img} alt="product" className="w-20 h-20 object-cover rounded" />
              <div>
                <p>{product.title}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Size: {product.size}</p>


                {/* <p className="text-sm text-gray-600">Delivery Date: September 22, 2024</p> */}
              </div>
            </div>
          
            <p> ₹{(parseFloat(product.price) * product.quantity).toFixed(2)}
            <p className="text-sm text-gray-900 line-through">MRP: ₹{product.product_price ? product.product_price.split(',')[0] : 'N/A'}</p>

            </p>
          </div>
  ) )}


         

          <div>
  {cart.length > 0 ? (
    
    <>
    
    <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">Discount code</label>
            <div className="flex space-x-4 mt-2">
              <input type="text"    value={couponCode}                       // Bind the input value to the state
          onChange={(e) => setCouponCode(e.target.value)}  className="w-full p-3 border border-orange-600 rounded " placeholder="Discount code" />
              <button onClick={handleApplyCoupon} className="hover:bg-orange-600 hover:text-white bg-white text-black py-2 px-8 rounded-full text-lg border border-orange-600 transition duration-300">Apply</button>
            </div>
          </div>
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center">
          <p>Subtotal ({cart.length} ITEMS)</p>
          <p>₹{calculateTotal().toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
        <p>Shipping</p>
        <p className={paymentMethod === 'Prepaid' ? 'text-green-600 font-bold' : ''}>
          {paymentMethod === 'Prepaid' ? 'FREE' : '₹30'}
        </p>
      </div>
        {discount ? (
  <p className="text-green-600 font-semibold">You saved Rs. {discount}!</p>
) : null}      </div>
  <div className="mt-6 border-t pt-4"></div>
  <div className="flex justify-between w-full items-center">
  <div className="flex items-center">
    <input
      type="radio"
      id="prepaid"
      name="paymentMethod"
      value="Prepaid"
      checked={paymentMethod === 'Prepaid'}
      onChange={handlePaymentMethodChange}
      className="mr-2"
    />
    <label htmlFor="prepaid">Prepaid</label>
  </div>

  <div className="flex items-center">
    <input
      type="radio"
      id="cod"
      name="paymentMethod"
      value="COD"
      checked={paymentMethod === 'COD'}
      onChange={handlePaymentMethodChange}
      className="mr-2"
    />
    <label htmlFor="cod">Cash on Delivery</label>
  </div>
</div>

    
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center font-bold text-lg">
          <p className='text-[#8A0404]'>Total</p>
          <p>
          INR ₹ {finalTotal > 0 ? finalTotal.toFixed(2) : initialTotal.toFixed(2)}  <p className="text-sm text-gray-500">
  (Incl. of all taxes)
</p>

          {/* INR ₹ {discountedPrice > 0 ? discountedPrice.toFixed(2) : initialTotal.toFixed(2)} */}



          </p>
        </div>
      </div>
    </>
  ) : (
    <div className="mt-6 border-t pt-4 text-center">


    </div>
  )}
  

</div>


       
<button
  type="button"
  onClick={handleCheckout}
  className="w-full bg-orange-600 text-white p-3 rounded mt-4"
  disabled={(!discountedPrice && !initialTotal) || (discountedPrice <= 0 && initialTotal <= 0) || loading}
>
  Place Order
</button>
<Codes/>
        </div>

      </div>
    </div>
    </>
  );
};

export default CheckoutPage;
