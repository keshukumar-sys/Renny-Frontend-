import { Link } from 'react-router-dom';
import RennyLogo from '../assets/RennyLogo.webp';
import FooterBG from '../assets/Footer.webp'
import {
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa6';
import {
  RiFacebookLine,
  RiInstagramFill,
  RiLinkedinFill,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const socialLinks = [
  {
    icon: FaXTwitter,
    url: 'https://x.com/rennystrips?t=Zv74JfuWaVw3CHAxPHAQSA&s=08',
    color: '!text-black',
  },
  {
    icon: FaFacebookF,
    url: 'https://www.facebook.com/rennypvtltd',
    color: '!text-[#1877F2]',
  },
  {
    icon: FaLinkedinIn,
    url: 'https://www.linkedin.com/company/rennystrips/',
    color: '!text-[#0A66C2]',
  },
  {
    icon: FaInstagram,
    url: 'https://www.instagram.com/rennystrips/',
    color: '!text-[#E4405F]',
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gray-100 font-helvetica text-gray-800">
  {/* Diwali background */}
  <img
    src={FooterBG}
    alt=""
    aria-hidden="true"
    width={1920}
    height={742}
    loading="lazy"
    decoding="async"
    className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none z-0"
  />
  <div className='relative z-10'>
      {/* ================= MAIN FOOTER ================= */}
      <motion.div
        className="mx-auto px-6 md:pr-16 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div variants={item} className="space-y-4">
          <img
            src={RennyLogo}
            alt="Renny Logo"
            width="293"
            height="236"
            className="h-[100px] w-auto object-contain"
            loading="lazy"
          />
          <p className="text-sm text-gray-600">
            In 1996, Renny Strips Ltd embarked on its dynamic journey. Founded
            under the prudent leadership of Mr. Binny Gupta, Renny Strips Ltd.
          </p>
        </motion.div>

        {/* COL 2 */}
        <motion.div variants={item} className="space-y-3">
          <h3 className="font-semibold">About Us</h3>
          <FooterLink to="/company-overview">Company Overview</FooterLink>
          <FooterLink to="/manufacturing-units">
            Manufacturing Process
          </FooterLink>
          <FooterLink to="/quality-standard">Quality & Standard</FooterLink>
          <FooterLink to="/design-centre">Design Centre</FooterLink>
        </motion.div>

        {/* COL 3 */}
        <motion.div variants={item} className="space-y-2">
          <h3 className="font-semibold">Products</h3>
          <FooterLink
            to="/erw-pipes-and-tubes"
            className="block hover:translate-x-1 transition-transform text-[13px] uppercase font-medium text-gray-700 "
          >
            ERW Pipes & Tubes
          </FooterLink>
          <FooterLink
            to="/scaffolding-formwork"
            className="block hover:translate-x-1 transition-transform text-[13px] uppercase font-medium text-gray-700 "
          >
            Scaffolding & Formwork Systems
          </FooterLink>
          <FooterLink
            to="/narrow-hrcoil"
            className="block hover:translate-x-1 transition-transform text-[13px] uppercase font-medium text-gray-700 "
          >
            Narrow-width HR Coils
          </FooterLink>
          <FooterLink
            to="/wire-rods"
            className="block hover:translate-x-1 transition-transform text-[13px] uppercase font-medium text-gray-700 "
          >
            Wire Rods
          </FooterLink>
          <FooterLink
            to="/ms-billets"
            className="block hover:translate-x-1 transition-transform text-[13px] uppercase font-medium text-gray-700 "
          >
            MS Billets
          </FooterLink>
        </motion.div>

        {/* COL 4 */}
        <motion.div variants={item} className="space-y-3">
          <h3 className="font-semibold">Investor Relations</h3>
          <FooterLink to="/financials">Financials</FooterLink>
          <FooterLink to="/corporate-governance">
            Corporate Governance
          </FooterLink>
          <FooterLink to="/industry-report">Industry Report</FooterLink>
          <FooterLink to="/ipo">IPO Documents</FooterLink>
          <FooterLink to="/ipo-audio-visual">IPO Audio Visual</FooterLink>
          <FooterLink to="/share-holding-pattern">
            Shareholding Pattern
          </FooterLink>
          <FooterLink to="/our-policies">Our Policies</FooterLink>
        </motion.div>

        {/* COL 5 */}
        <motion.div variants={item} className="space-y-5">
          <div className="space-y-3">
            <h3 className="font-semibold">EC</h3>
            <FooterLink href="/ec">
              EC
            </FooterLink>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Sustainability</h3>
            <FooterLink href="/green-steel">
              Green Steel
            </FooterLink>
            <FooterLink to="/sustainability">ESG</FooterLink>
            <FooterLink to="/cbam">CBAM</FooterLink>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Media</h3>
            <FooterLink to="/news-room">News Room</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/events">Events</FooterLink>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Career</h3>
            <FooterLink to="/careers">Career</FooterLink>
          </div>
        </motion.div>

        {/* COL 6 */}
        <motion.div variants={item} className="space-y-4">
          <h3 className="font-semibold">Connect with us</h3>

          <div className="flex justify-center gap-2">
            <a
              href="https://x.com/rennystrips?t=Zv74JfuWaVw3CHAxPHAQSA&s=08"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Renny Strips on X"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black hover:opacity-80 transition-opacity shadow-md"
            >
              <span className="text-white text-md font-bold">𝕏</span>
            </a>

            <a
              href="https://www.facebook.com/rennypvtltd"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Renny Strips on Facebook"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1877F2] hover:opacity-80 transition-opacity shadow-md"
            >
              <span className="text-white text-lg font-bold flex items-center justify-center">
                <RiFacebookLine size={18} />
              </span>
            </a>

            <a
              href="https://www.instagram.com/rennystrips/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Renny Strips on Instagram"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-80 transition-opacity shadow-md"
            >
              <span className="text-white text-md flex items-center justify-center">
                <RiInstagramFill size={18} />
              </span>
            </a>

            <a
              href="https://www.linkedin.com/company/rennystrips/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Renny Strips on LinkedIn"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#0077B5] hover:opacity-80 transition-opacity shadow-md"
            >
              <span className="text-white text-md font-bold flex items-center justify-center">
                <RiLinkedinFill size={18} />
              </span>
            </a>
          </div>

          <motion.div
            variants={item}
            className="space-y-1 text-sm text-gray-600"
          >
            <p className="font-semibold text-gray-800">Contact us</p>
            <a href='tel:+918288001300'>+91-8288001300</a> <br/>
            <a href='tel:+919688001300'>+91-9688001300</a><br/>
            <a href='mailto:info@rennystrips.com'>info@rennystrips.com</a>
            <br/>
            <p className='font-semibold text-gray-800'>Corporate Office</p>
            <p>Khasra No. 34//6/2 (0-8)-7 (8-0)-9,
              Khata No. 121/127, Lakhowal Road, Kohara,
              Ludhiana, Punjab - 141112, India</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ================= BOTTOM BAR ================= */}
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="border-t border-gray-300"
      >
        <div className="mx-auto px-6 md:px-16 py-4 flex flex-col sm:flex-row justify-between text-sm text-gray-600 gap-2">
          <div>© 2026 Renny | All Rights Reserved</div>
          {/* <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-blue-800">
              Privacy Notice
            </Link>
            <Link to="/terms" className="hover:text-blue-800">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-blue-800">
              Cookie Policy
            </Link>
          </div> */}
        </div>
      </motion.div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, href, children }) => (
  <motion.div variants={item}>
    {href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-[13px] uppercase font-medium text-gray-700 hover:font-semibold hover:text-blue-900 hover:translate-x-1 transition-all"
      >
        <RiArrowRightSLine className="text-sm" />
        {children}
      </a>
    ) : (
      <Link
        to={to}
        className="flex items-center gap-1 text-[13px] uppercase font-medium text-gray-700 hover:font-semibold hover:text-blue-900 hover:translate-x-1 transition-all"
      >
        <RiArrowRightSLine className="text-sm" />
        {children}
      </Link>
    )}
  </motion.div>
);

export default Footer;
