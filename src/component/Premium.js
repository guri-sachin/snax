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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mx-2 sm:mx-4 lg:mx-6">
  {/* Card 1 */}
  <div className="h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] p-1 sm:p-2" onClick={Handelsubmit}>
    <div className="rounded-lg">
      <img
        className="h-full w-full object-contain mb-2 sm:mb-4"
        src={`${process.env.PUBLIC_URL}/img/mob/a.webp`}
        alt="FESTIVE Gift Hamper"
      />
    </div>
  </div>

  {/* Card 2 */}
  <div className="h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] p-1 sm:p-2" onClick={Handelsubmit}>
    <div className="rounded-lg">
      <img
        className="h-full w-full object-contain mb-2 sm:mb-4"
        src={`${process.env.PUBLIC_URL}/img/mob/d.webp`}
        alt="FESTIVE Gift Hamper"
      />
    </div>
  </div>

  {/* Card 3 */}
  <div className="h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] p-1 sm:p-2" onClick={Handelsubmit}>
    <div className="rounded-lg">
      <img
        className="h-full w-full object-contain mb-2 sm:mb-4"
        src={`${process.env.PUBLIC_URL}/img/mob/f.webp`}
        alt="FESTIVE Gift Hamper"
      />
    </div>
  </div>

  {/* Card 4 */}
  <div className="h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px] p-1 sm:p-2" onClick={Handelsubmit}>
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
