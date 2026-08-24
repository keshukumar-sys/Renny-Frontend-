import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "917973901019";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />

      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-7 h-7 fill-white relative z-10"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.129 6.744 3.047 9.379L1.054 31.49l6.328-2.027A15.89 15.89 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.35 22.602c-.39 1.1-1.932 2.013-3.17 2.28-.846.18-1.95.324-5.668-1.218-4.76-1.972-7.822-6.81-8.06-7.125-.228-.316-1.918-2.556-1.918-4.874 0-2.318 1.214-3.458 1.644-3.93.39-.43.92-.608 1.226-.608.15 0 .285.008.406.014.43.018.644.042.928.718.354.846 1.218 2.97 1.324 3.186.108.216.21.498.072.796-.13.304-.24.44-.456.688-.216.248-.422.438-.638.706-.198.234-.42.484-.174.922.246.432 1.094 1.8 2.348 2.916 1.616 1.436 2.978 1.882 3.402 2.09.43.21.682.176.934-.106.26-.288 1.108-1.292 1.404-1.736.29-.438.586-.364.986-.218.406.15 2.57 1.212 3.01 1.434.438.222.73.332.838.516.106.184.106 1.068-.284 2.168z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
