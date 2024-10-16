import React from 'react';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Premium = () => {
  const navigate = useNavigate();

  function Handelsubmit(){
    navigate("/Gifthamper")
  }
  return (
    <div className="bg-white py-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-red-800">HAMPER THEY WILL ACTUALLY<br/>LOVE!</h2>
        <h3>Packed in premium packaging , Guilt-free yummy snacks</h3>
      </div>
      <div className="flex flex-wrap justify-center mx-2 sm:mx-4 lg:mx-6">
  {/* Card 1 */}
  <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] p-1 sm:p-2 mb-4 sm:mb-6" onClick={Handelsubmit}>
    <div className="rounded-lg">
      <img
        className="h-full w-full object-contain mb-2 sm:mb-4"
        src={`${process.env.PUBLIC_URL}/img/mob/a.webp`}
        alt="FESTIVE Gift Hamper"
      />
    </div>
  </div>

  {/* Card 2 */}
  <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] p-1 sm:p-2 mb-4 sm:mb-6" onClick={Handelsubmit}>
    <div className="rounded-lg">
      <img
        className="h-full w-full object-contain mb-2 sm:mb-4"
        src={`${process.env.PUBLIC_URL}/img/mob/d.webp`}
        alt="FESTIVE Gift Hamper"
      />
    </div>
  </div>

  {/* Card 3 */}
  <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] p-1 sm:p-2 mb-4 sm:mb-6" onClick={Handelsubmit}>
    <div className="rounded-lg">
      <img
        className="h-full w-full object-contain mb-2 sm:mb-4"
        src={`${process.env.PUBLIC_URL}/img/mob/f.webp`}
        alt="FESTIVE Gift Hamper"
      />
    </div>
  </div>

  {/* Card 4 */}
  <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4 h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] p-1 sm:p-2 mb-4 sm:mb-6" onClick={Handelsubmit}>
    <div className="rounded-lg">
      <img
        className="h-full w-full object-contain mb-2 sm:mb-4"
        src={`${process.env.PUBLIC_URL}/img/mob/s.webp`}
        alt="FESTIVE Gift Hamper"
      />
    </div>
  </div>
</div>





    
    </div>
  );
};

export default Premium;
