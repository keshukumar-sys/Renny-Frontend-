import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RennyLogo from '../assets/RennyLogo.webp';
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaChevronRight,
} from 'react-icons/fa';

import greatPlace from '../assets/Great_Place_To_Work-removebg-preview.webp';
const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const toggleMobileDropdown = (index) => {
    setActiveMobileDropdown(activeMobileDropdown === index ? null : index);
  };

  const navLinks = [
    {
      title: 'About Us',
      links: [
        { name: 'Company Overview', path: '/company-overview' },
        { name: 'Manufacturing Process', path: '/manufacturing-units' },
        { name: 'Quality & Standard', path: '/quality-standard' },
        { name: 'Design Centre', path: '/design-centre' },
      ],
    },
    {
      title: 'Products',
      links: [
        { name: 'ERW Pipes & Tubes', path: '/erw-pipes-and-tubes' },
        {
          name: 'Scaffolding & Formwork Systems',
          path: '/scaffolding-formwork',
          // subLinks: [
          //   { name: "ProductRange", path: "/product-range" },
          //   { name: "ProductRange2", path: "/product-range-2" },
          // ],
        },
        { name: 'Narrow-width HR Coils', path: '/narrow-hrcoil' },
        { name: 'Wire Rods', path: '/wire-rods' },
        { name: 'MS Billets', path: '/ms-billets' },
      ],
    },
    {
      title: 'Investor Relations',
      links: [
        { name: 'Financials', path: '/financials' },
        { name: 'Corporate Governance', path: '/corporate-governance' },
        { name: 'Industry Report', path: '/industry-report' },
        { name: 'IPO Documents', path: '/ipo' },
        { name: 'IPO Audio Visual', path: '/ipo-audio-visual' },
        { name: 'Shareholding Pattern', path: '/share-holding-pattern' },
        { name: 'Our Policies', path: '/our-policies' },
      ],
    },
    { title: 'EC', path: '/ec' },
    {
      title: 'Sustainability',
      links: [
        { name: 'Green Steel', path: '/green-steel' },
        { name: 'ESG', path: '/sustainability' },
        { name: 'CBAM', path: '/cbam' },
      ],
    },
    {
      title: 'Media',
      links: [
        { name: 'News Room', path: '/news-room' },
        { name: 'Blogs', path: '/blog' },
        { name: 'Events', path: '/events' },
      ],
    },
    { title: 'Career', path: '/careers' },
    { title: 'Contact Us', path: '/contact-us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-16 flex items-center justify-between px-6
        transition-all duration-500 ease-in-out font-helvetica
        ${
          isScrolled
            ? 'bg-white/70 backdrop-blur-md shadow-md '
            : 'bg-transparent backdrop-blur-0'
        }
      `}
    >
      {/* Logo */}
      <Link to="/" aria-label="Go to homepage">
        <img
          src={RennyLogo}
          alt="Renny Logo"
          width="217"
          height="175"
          className="h-20 w-auto cursor-pointer rounded-md p-2"
        />
      </Link>
      {/* Navigation (Desktop) */}
      <ul
        className={`hidden lg:flex items-center gap-3 transition-all duration-300
    ${
      isScrolled ? 'text-gray-700 font-semibold' : 'font-semibold text-blue-900'
    }
  `}
      >
        {/* About Us */}
        <li className="relative group">
          <span className="cursor-pointer hover:bg-blue hover:text-white px-4 py-3 rounded-xl">
            About Us
          </span>
          <ul className="absolute hidden group-hover:block bg-white shadow-lg mt-2 w-64 z-50">
            <li>
              <Link to="/company-overview" className="dropdown-item">
                Company Overview
              </Link>
            </li>

            <li>
              <Link to="/manufacturing-units" className="dropdown-item">
                Manufacturing Process
              </Link>
            </li>

            <li>
              <Link to="/quality-standard" className="dropdown-item">
                Quality & Standard
              </Link>
            </li>
            <li>
              <Link to="/design-centre" className="dropdown-item">
                Design Centre
              </Link>
            </li>
          </ul>
        </li>

        {/* Products */}
        <li className="relative group">
          <span className="cursor-pointer hover:bg-blue hover:text-white px-4 py-3 rounded-xl">
            Products
          </span>

          <ul className="absolute hidden group-hover:block bg-white shadow-lg mt-2 w-72 z-50">
            {/* Nested Dropdown */}

            <li>
              <Link to="/erw-pipes-and-tubes" className="dropdown-item">
                ERW Pipes & Tubes
              </Link>
            </li>
            <li className="relative group/submenu">
              <Link
                to="/scaffolding-formwork"
                className="dropdown-item whitespace-nowrap block"
              >
                <span className="inline-flex items-center gap-1.5">
                  Scaffolding & Formwork Systems
                  {/* <FaChevronRight className="text-[10px]" /> */}
                </span>
              </Link>

              {/* <ul className="absolute left-full top-0 hidden group-hover/submenu:block bg-white shadow-lg w-56">
                <li>
                  <Link to="/product-range" className="dropdown-item">
                    ProductRange
                  </Link>
                </li>
                <li>
                  <Link to="/product-range-2" className="dropdown-item">
                    ProductRange2
                  </Link>
                </li>
              </ul> */}
            </li>
            <li>
              <Link to="/narrow-hrcoil" className="dropdown-item">
                Narrow-width HR Coils
              </Link>
            </li>
            <li>
              <Link to="/wire-rods" className="dropdown-item">
                Wire Rods
              </Link>
            </li>
            <li>
              <Link to="/ms-billets" className="dropdown-item">
                MS Billets
              </Link>
            </li>
          </ul>
        </li>

        {/* Investor Relations */}
        <li className="relative group">
          <span className="cursor-pointer hover:bg-blue hover:text-white px-4 py-3 rounded-xl">
            Investor Relations
          </span>
          <ul className="absolute hidden group-hover:block bg-white shadow-lg mt-2 w-72 z-50">
            <li>
              <Link to="/financials" className="dropdown-item">
                Financials
              </Link>
            </li>
            <li>
              <Link to="/corporate-governance" className="dropdown-item">
                Corporate Governance
              </Link>
            </li>
            <li>
              <Link to="/industry-report" className="dropdown-item">
                Industry Report
              </Link>
            </li>
            <li>
              <Link to="/ipo" className="dropdown-item">
                IPO Documents
              </Link>
            </li>
            <li>
              <Link to="/ipo-audio-visual" className="dropdown-item">
                IPO Audio Visual
              </Link>
            </li>
            <li>
              <Link to="/share-holding-pattern" className="dropdown-item">
                Shareholding Pattern
              </Link>
            </li>
            <li>
              <Link to="/our-policies" className="dropdown-item">
                Our Policies
              </Link>
            </li>
          </ul>
        </li>

        {/* EC */}
        <li>
          <Link
            to="/ec"
            className="hover:bg-blue hover:text-white px-4 py-3 rounded-xl"
          >
            EC
          </Link>
        </li>

        {/* Sustainability */}
        <li className="relative group">
          <span className="cursor-pointer hover:bg-blue hover:text-white px-4 py-3 rounded-xl">
            Sustainability
          </span>
          <ul className="absolute hidden group-hover:block bg-white shadow-lg mt-2 w-64 z-50">
            <li>
              <Link to="/sustainability" className="dropdown-item">
                ESG
              </Link>
            </li>
            <li>
            <Link to="/cbam" className="dropdown-item">
                CBAM
              </Link> 
            </li>
          </ul>
        </li>

        {/* Media */}
        <li className="relative group">
          <span className="cursor-pointer hover:bg-blue hover:text-white px-4 py-3 rounded-xl">
            Media
          </span>
          <ul className="absolute hidden group-hover:block bg-white shadow-lg mt-2 w-48 z-50">
            <li>
              <Link to="/news-room" className="dropdown-item">
                News Room
              </Link>
            </li>
            <li>
              <Link to="/blog" className="dropdown-item">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/events" className="dropdown-item">
                Events
              </Link>
            </li>
          </ul>
        </li>

        {/* Career */}
        <li>
          <Link
            to="/careers"
            className="hover:bg-blue hover:text-white px-4 py-3 rounded-xl"
          >
            Career
          </Link>
        </li>

        {/* Contact Us */}
        <li>
          <Link
            to="/contact-us"
            className="hover:bg-blue hover:text-white px-4 py-3 rounded-xl"
          >
            Contact Us
          </Link>
        </li>

   
      </ul>
      {/* Mobile Menu Toggle */}
      <div className='flex '>
  <button
        aria-label="Open navigation menu"
        aria-expanded={isMenuOpen}
        aria-controls="main-nav"
        className="lg:hidden text-2xl text-blue-900 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>{' '}
      <div className="flex items-center">
        <div className="w-16 h-auto md:w-12 lg:w-14  object-contain">
          <img
            src={greatPlace}
            alt="Great Place to Work"
            className={`w-full h-auto ${isScrolled ? 'mt-43 scale-175 ' : ''}`}
          />
        </div>
      </div>
      </div>
    
      {/* Mobile Navigation Drawer */}
      <div
        id="main-nav"
        className={`fixed top-16 left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out transform lg:hidden ${
          isMenuOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-full opacity-0'
        }`}
        style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}
      >
        <ul className="flex flex-col p-6 space-y-4">
          {navLinks.map((item, index) => (
            <li
              key={index}
              className="border-b border-gray-100 pb-2 last:border-none"
            >
              {item.links ? (
                <>
                  <div
                    className="flex justify-between items-center cursor-pointer py-2 text-gray-800 font-semibold hover:text-blue"
                    onClick={() => toggleMobileDropdown(index)}
                  >
                    <span>{item.title}</span>
                    {activeMobileDropdown === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                    {/* Great Place Image - Added 'flex items-center' for vertical alignment within the UL */}
                  </div>
                  {/* Mobile Dropdown */}
                  <ul
                    className={`pl-4 mt-2 space-y-2 transition-all duration-300 ${
                      activeMobileDropdown === index ? 'block' : 'hidden'
                    }`}
                  >
                    {item.links.map((subLink, subIndex) => (
                      <li key={subIndex}>
                        {subLink.subLinks ? (
                          <>
                            <Link
                              to={subLink.path}
                              className="block font-medium text-gray-700 py-2 hover:text-blue"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subLink.name}
                            </Link>
                            <ul className="pl-4 space-y-2">
                              {subLink.subLinks.map((nested, nestedIndex) => (
                                <li key={nestedIndex}>
                                  <Link
                                    to={nested.path}
                                    className="block py-2 text-sm text-gray-600 hover:text-blue"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {nested.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          <Link
                            to={subLink.path || '#'}
                            className="block py-2 text-sm text-gray-600 hover:text-blue"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subLink.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={item.path}
                  className="block py-2 text-gray-800 font-semibold hover:text-blue"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
