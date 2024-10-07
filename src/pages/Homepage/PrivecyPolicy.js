import React from 'react';
import Navbar from '../../component/Navbar'
import Footer from '../../component/Footer';



const PrivacyPolicy = () => {
  return (
          <>
          <Navbar/>
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4">SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</h2>
        <p className="mb-4">
          When you purchase something from our store, as part of the buying and selling process, we collect the personal
          information you give us such as your name, address, and email address to personalize your experience.
        </p>
        <p className="mb-4">
          When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in
          order to provide us with information that helps us learn about your browser, operating system & preferences.
        </p>
        <p className="mb-4">
          Email marketing: With your permission, we may send you emails about our store, new products, and other updates.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4">SECTION 2 - CONSENT</h2>
        <p className="mb-4">
          You consent to receive communications from us by way of e-mails, phone calls, and SMS’s with respect to your
          transactions on our Website. Users will be required to register their valid phone numbers and e-mail addresses
          to facilitate such communication.
        </p>
        <p className="mb-4">
          How do you get my consent?
          <br />
          When you provide us with personal information to complete a transaction, verify your credit card, place an
          order, arrange for a delivery, or return a purchase, we imply that you consent to our collecting it and using it
          for that specific reason only.
        </p>
        <p className="mb-4">
          If after you opt-in, you change your mind, you may withdraw your consent by contacting us at{' '}
          <a href="mailto:contactus@snaxup.com" className="text-blue-500">
            contactus@snaxup.com
          </a>{' '}
          or mailing us at: The SnaXup Company, Unit2, A123, DDA Sheds, Block A, Okhla Phase II, Okhla Industrial Estate,
          New Delhi, Delhi 110020.
        </p>
      </section>

      {/* Add remaining sections similarly... */}
      
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4">SECTION 3 - DISCLOSURE</h2>
        <p className="mb-4">
          We may disclose your personal information if we are required by law to do so or if you violate our Terms of
          Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4">SECTION 4 - PAYMENT</h2>
        <p className="mb-4">
          We use Razorpay & other platforms for processing payments. We/Razorpay do not store your card data on their
          servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when
          processing payment.
        </p>
      </section>

      {/* Continue adding the remaining sections here */}
    </div>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
