import React from 'react';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Premium = () => {
  const navigate = useNavigate();

  function Handelsubmit(){
    // navigate(`/RentProperty/${property.slug}`, { state: { property, id: property.id } });
    navigate("/Gifthamper")
  }
  return (
    <div className="bg-white py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-red-800">HAMPER THEY WIILL ACTUALLY <br/>LOVE!</h2>
        <h3>Packed in premium packaging , Guilt-free yummy snacks</h3>
      </div>
      <div className="flex flex-wrap justify-center mx-4 sm:mx-8 lg:mx-12">
  {/* Card 1 */}
  <div className="w-full sm:w-1/2 lg:w-1/4 h-[400px] p-2" onClick={Handelsubmit}>
    <div className="rounded-lg ">
      <img
        className="h-[400px] w-full object-contain mb-2"
        src="../img/mob/a.png"
        alt="FESTIVE Gift Hamper"
      />
    </div>
    {/* <div className="flex items-center justify-between mt-2">
      <div className="flex-grow text-center">
        <div className="inline-block border rounded-full p-1 px-3 hover:bg-orange-600 hover:text-white">
          <h3 className="text-lg font-medium">FESTIVE GIFT HAMPER</h3>
        </div>
      </div>

    </div> */}
  </div>

  {/* Card 2 */}
  <div className="w-full sm:w-1/2 lg:w-1/4 h-[400px] p-2" onClick={Handelsubmit}>
    <div className="rounded-lg ">
      <img
        className="h-[400px] w-full object-contain mb-2"
        src="../img/mob/d.png"
        alt="FESTIVE Gift Hamper"
      />
    </div>
    {/* <div className="flex items-center justify-between mt-2">
      <div className="flex-grow text-center">
        <div className="inline-block border rounded-full p-1 px-3 hover:bg-orange-600 hover:text-white">
          <h3 className="text-lg font-medium">FESTIVE GIFT HAMPER</h3>
        </div>
      </div>
  
    </div> */}
  </div>

  {/* Card 3 */}
  <div className="w-full sm:w-1/2 lg:w-1/4 h-[400px] p-2" onClick={Handelsubmit}>
    <div className="rounded-lg ">
      <img
        className="h-[400px] w-full object-contain mb-2"
        src="../img/mob/f.png"
        alt="FESTIVE Gift Hamper"
      />
    </div>
    {/* <div className="flex items-center justify-between mt-2">
      <div className="flex-grow text-center">
        <div className="inline-block border rounded-full p-1 px-3 hover:bg-orange-600 hover:text-white">
          <h3 className="text-lg font-medium">FESTIVE GIFT HAMPER</h3>
        </div>
      </div>
   
    </div> */}
  </div>

  {/* Card 4 */}
  <div className="w-full sm:w-1/2 lg:w-1/4 h-[400px] p-2" onClick={Handelsubmit}>
    <div className="rounded-lg ">
      <img
        className="h-[400px] w-full object-contain mb-2"
        src="../img/mob/s.png"
        alt="FESTIVE Gift Hamper"
      />
    </div>
    {/* <div className="flex items-center justify-between mt-2">
      <div className="flex-grow text-center">
        <div className="inline-block border rounded-full p-1 px-3 hover:bg-orange-600 hover:text-white">
          <h3 className="text-lg font-medium">FESTIVE GIFT HAMPER</h3>
        </div>
      </div>
    </div> */}
  </div>
</div>

    
    </div>
  );
};

export default Premium;
