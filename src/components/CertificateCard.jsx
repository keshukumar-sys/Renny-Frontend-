import React from "react";

const CertificateCard = ({ certificateDetails }) => {
  return (
    <div className="h-90 flex bg-gray-100 flex-col rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out">
      
      {/* Image Section */}
      <div className="h-11/12 flex items-center justify-center">
        <img
          className="object-contain w-full h-full"
          src={certificateDetails.img}
          alt="certificate"
        />
      </div>

      {/* Footer */}
      <div className="h-1/12 bg-[#292c44] text-white text-sm flex justify-between items-center p-2">
        <p>{certificateDetails.title}</p>
        <a
          href={certificateDetails.img}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          View
        </a>
      </div>

    </div>
  );
};

export default CertificateCard;