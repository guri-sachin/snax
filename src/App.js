import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Navbar from "./component/Navbar";
import Premium from "./component/Premium";
import Collection from "./component/Collection";
import Sugarfree from "./component/SugarFree";
import Customise from "./component/Customise";
import Footer from "./component/Footer";
import Product from "./pages/Homepage/Product";
import Card from "./pages/Homepage/Card";
import Contactus from "./pages/Homepage/Contactus";
import Myorders from "./pages/Homepage/Myorders";
import Signup from "./pages/Homepage/Signup";
import Login from "./pages/Homepage/Login";
import Payment from "./pages/Homepage/Payment";
import Reviews from "./component/Reviews";
import FooterSection from "./component/FooterSection";
import CustRiview from "./component/CustRiview";
import AddRiview from "./component/AddRiview";
import Codes from "./component/Codes";
import PrivecyPolicy from "./pages/Homepage/PrivecyPolicy";
import Termsconditions from "./pages/Homepage/Terms&conditions";
import RefuncPolicy from "./pages/Homepage/RefuncPolicy";
import ShippingPolicy from "./pages/Homepage/ShippingPolicy";



import ProductList from "./pages/Homepage/ProductList";
import CustomizeGift from "./pages/Homepage/CustomizeGift";
import Gifthamper from "./pages/Homepage/Gifthamper";
import Allfun from "./pages/Homepage/Allfun";
import Checkout from "./pages/Homepage/Checkout";
import Checkouts from "./pages/Homepage/Checkouts";

import Gifts from "./pages/Homepage/Gifts";
import CustomItem from "./pages/Homepage/CustomItem";

import LoginOtp from "./pages/Homepage/LoginOtp";
import Aboutus from "./pages/Homepage/Aboutus";



import { CartProvider } from './CartContext'; // Adjust the path accordingly






function App() {
  
  return (
    <Router>
             <CartProvider>

      <Routes>
      <Route index path="/Codes" element={<Codes />} />
        <Route index path="/" element={<Homepage />} />
        <Route index path="/Navbar" element={<Navbar />} />
        <Route index path="/Reviews" element={<Reviews />} />
        <Route index path="/AddRiview" element={<AddRiview />} />
        <Route index path="/PrivecyPolicy" element={<PrivecyPolicy />} />
        <Route index path="/Termsconditions" element={<Termsconditions />} />
        <Route index path="/RefuncPolicy" element={<RefuncPolicy />} />
        <Route index path="/ShippingPolicy" element={<ShippingPolicy />} />

        
        <Route index path="/CustRiview" element={<CustRiview />} />
        
        <Route index path="/Premium" element={<Premium />} />
        <Route index path="/Collection" element={<Collection />} />
        <Route index path="/Sugarfree" element={<Sugarfree />} />
        <Route index path="/Customise" element={<Customise/>} />
        <Route index path="/Footer" element={<Footer/>} />
        <Route index path="/Product/:slug" element={<Product/>} /> 
        <Route index path="/Card" element={<Card/>} />
        <Route index path="/Contactus" element={<Contactus/>} /> 
        <Route index path="/Myorders" element={<Myorders/>} /> 
        <Route index path="/ProductList/:category" element={<ProductList/>} /> 
        <Route index path="/Signup" element={<Signup/>} />  
        <Route index path="/Login" element={<Login/>} />   
        <Route index path="/CustomizeGift" element={<CustomizeGift/>} />  
        <Route index path="/Gifthamper" element={<Gifthamper/>} /> 
                <Route index path="/Allfun" element={<Allfun/>} /> 
                <Route index path="/Checkout" element={<Checkout/>} /> 
                <Route index path="/LoginOtp" element={<LoginOtp/>} /> 
                <Route index path="/Gifts" element={<Gifts/>} /> 

                <Route index path="/CustomItem" element={<CustomItem/>} /> 
                <Route index path="/Aboutus" element={<Aboutus/>} /> 
                <Route index path="/Checkouts" element={<Checkouts/>} /> 
                <Route index path="/Payment" element={<Payment/>} /> 
                <Route index path="/FooterSection" element={<FooterSection/>} /> 

                
                {/* <Route exact path="/BlogsDsc/:slug" element={<BlogsDsc/>}></Route>   */}

        


      </Routes>
      </CartProvider>

    </Router>
  );
}

export default App;
