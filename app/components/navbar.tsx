import React from 'react';
import Dropdown from './dropdown';
import { useLanguage } from '../context/LanguageContext';
import translations from '../public/translations';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image'; // Import Next.js Image component

import NPSP_logo from '../assets/logo/NPSP_logo-removebg-preview.png'; // Import the NPSP logo

export default function Navbar() {
  const { language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-[#F7F7F7] text-gray-900 shadow-md border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo and Title */}
          <div className="flex items-center">
            <div className="flex gap-4 items-center">
              {/* Display NPSP logo */}
              <Image
                src={NPSP_logo}
                alt="NPSP Logo"
                width={70}
                height={70}
                className="rounded-full object-cover"
              />
              <span className="text-xl font-semibold text-gray-800">
                {translations[language].navbarTitle || 'NPSP Dashboard'}
              </span>
            </div>
          </div>

          {/* Right side: Desktop Dropdown */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-6">
              <Dropdown />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-400 p-2 rounded-md text-gray-800 hover:text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-4 pb-3 border-t border-gray-400 flex justify-end">
            <div className="px-5">
              <Dropdown />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
