import React from 'react';

const Festival = () => {
  return (
    <div className="container mx-auto mt-5 px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center">
        <div className="text-center mb-4">
          <div className="fes-image-box">
            <img src="/img/home/eh2.jpg" alt="Festival image 1" className="w-full h-auto rounded-lg " />
          </div>
        </div>
        <div className="text-center mb-4">
          <div className="image-box ">
            <img src="/img/home/eh5.jpg" alt="Festival image 2" className="w-full h-auto rounded-lg " />
          </div>
          <div className="image-box">
            <img src="/img/home/eh4.jpg" alt="Festival image 3" className="w-full h-auto rounded-lg " />
          </div>
        </div>
        <div className="text-center mb-4">
          <div className="fest-image-box">
            <img src="/img/home/eh1.jpg" alt="Festival image 4" className="w-full h-auto rounded-lg " />
          </div>
        </div>
        <div className="text-center mb-4">
          <div className="image-box ">
            <img src="/img/home/eh.jpg" alt="Festival image 5" className="w-full h-auto rounded-lg " />
          </div>
          <div className="image-box">
            <img src="/img/home/eh3.jpg" alt="Festival image 6" className="w-full h-auto rounded-lg " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Festival;
