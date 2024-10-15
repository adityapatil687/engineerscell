"use client";
import translations from "../public/translations";
import { useLanguage } from "../context/LanguageContext";
import qrcode from "../assets/icons/qr code.png";
import Image from "next/image";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-gray-800 text-white py-10 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center md:space-x-8 px-4">
        {/* Contact Information (conditionally rendered) */}
        {/* Uncomment below div to display the Contact Us section */}
        {/* <div className="mb-6 md:mb-0 flex-1 text-center">
                    <h2 className="text-lg font-bold mb-2">Contact Us</h2>
                    <p>A108 Adam Street</p>
                    <p>+91 7758026057</p>
                    <p>info@example.com</p>
                </div> */}

        {/* Location */}
        <div className="flex-1 mb-6 md:mb-0 flex flex-col items-center text-center">
          <h2 className="text-lg font-bold mb-2">
            {translations[language].location}
          </h2>
          <iframe
            className="map-iframe"
            src="https://maps.app.goo.gl/3pWZWEmvAw6r6NRLA?g_st=aw"
            height="200"
            style={{ border: "none" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer"
          ></iframe>
        </div>

        {/* QR Code Section */}
        <div className="flex-1 mb-6 md:mb-0 flex flex-col items-center text-center">
          <h2 className="text-lg font-bold mb-2">
            {translations[language].scanQR}
          </h2>
          <Image
            src={qrcode}
            alt="Join our WhatsApp group"
            className="w-32 h-32 mb-2"
          />
          <p className="text-center text-sm">
            {translations[language].joinWhatsApp}
          </p>
        </div>
      </div>
      <style jsx>{`
        .map-iframe {
          width: 300px; /* Default width for mobile */
        }

        @media (min-width: 768px) {
          .map-iframe {
            width: 400px; /* Width for desktop */
          }
        }
      `}</style>
    </footer>
  );
}
