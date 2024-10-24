import React from 'react';
import Navbar from '../../component/Navbar';
import Footer from "../../component/Footer";





const TermsOfService = () => {
  return (
          <>
          <Navbar/>
         
    <div className="min-h-screen bg-gray-100 ">
      <div className="max-w-3xl mx-auto   p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-red-600">Terms of Service</h1>
        <h2 className="text-2xl font-semibold mt-6 mb-2">OVERVIEW</h2>
        <p className="mb-4">
          This website is operated by snaxup-com. Throughout the site, the terms “we”, “us” and “our” refer to snaxup-com. snaxup-com offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
        </p>
        <p className="mb-4">
          By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
        </p>
        <p className="mb-4">
          Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
        </p>
        <p className="mb-4">
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">SECTION 1 - ONLINE STORE TERMS</h2>
        <p className="mb-4">
          By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">SECTION 2 - GENERAL CONDITIONS</h2>
        <p className="mb-4">
          We reserve the right to refuse Service to anyone for any reason at any time.
        </p>

        {/* Continue adding sections similarly... */}

        <h2 className="text-2xl font-semibold mt-6 mb-2">SECTION 20 - CONTACT INFORMATION</h2>
        <p className="mb-4">
          Questions about the Terms of Service should be sent to us at <a href="mailto:contactus@snaxup.com" className="text-red-600">contactus@snaxup.com</a>.
        </p>
        <p className="mb-4">
          Our contact information is posted below:
        </p>
        <p className="mb-4">
          SnaXup Healthy Foods India Pvt. Ltd. <br />
          Unit2, A123, DDA Sheds, Block A, Okhla Phase II, Okhla Industrial Estate, New Delhi, Delhi 110020 <br />
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default TermsOfService;
