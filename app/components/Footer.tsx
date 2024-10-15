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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.917227546192!2d72.8381418758353!3d18.935057556380855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1d081eac0c7%3A0x5592d1df92fa4d69!2s15%2C%20JN%20Heredia%20Rd%2C%20Ballard%20Estate%2C%20Fort%2C%20Mumbai%2C%20Maharashtra%20400001!5e0!3m2!1sen!2sin!4v1728980820016!5m2!1sen!2sin"
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
