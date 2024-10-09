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
        <h2 className="text-2xl font-semibold text-red-800">HAMPER THEY WIILL ACTUALLY <br/>LOVE!</h2>
        <h3>Packed in premium packaging , Guilt-free yummy snacks</h3>
      </div>
      <div className="flex flex-wrap justify-center mx-4 sm:mx-8 lg:mx-12">
  {/* Card 1 */}
  <div className="w-full sm:w-1/2 lg:w-1/4 h-[400px] p-2" onClick={Handelsubmit}>
    <div className="rounded-lg ">
      <img
        className="h-[400px] w-full object-contain mb-2"
        src="../img/mob/a.webp"
        alt="FESTIVE Gift Hamper"
      />
    </div>

  </div>

  {/* Card 2 */}
  <div className="w-full sm:w-1/2 lg:w-1/4 h-[400px] p-2" onClick={Handelsubmit}>
    <div className="rounded-lg ">
      <img
        className="h-[400px] w-full object-contain mb-2"
        src="../img/mob/d.webp"
        alt="FESTIVE Gift Hamper"
      />
    </div>

  </div>

  {/* Card 3 */}
  <div className="w-full sm:w-1/2 lg:w-1/4 h-[400px] p-2" onClick={Handelsubmit}>
    <div className="rounded-lg ">
      <img
        className="h-[400px] w-full object-contain mb-2"
        src="../img/mob/f.webp"
        alt="FESTIVE Gift Hamper"
      />
    </div>
 
  </div>

  {/* Card 4 */}
  <div className="w-full sm:w-1/2 lg:w-1/4 h-[400px] p-2" onClick={Handelsubmit}>
    <div className="rounded-lg ">
      <img
        className="h-[400px] w-full object-contain mb-2"
        src="../img/mob/s.webp"
        alt="FESTIVE Gift Hamper"
      />
    </div>

  </div>
</div>

    
    </div>
  );
};

export default Premium;
