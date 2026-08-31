import { lazy, Suspense, useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Parallax from './components/ParallaxSection';
import ScrollToTop from './components/ScrollToTop.jsx';
import PageSpinner from './components/PageSpinner.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import NotFound from './pages/NotFound.jsx';
import Thankyou from './pages/Thankyou.jsx';
import GreenSteel from './pages/Sustainability/GreenSteel.jsx';
import ScaffoldingBrochure from './pages/ScaffoldingBrochure.jsx';
// import CBAM from "./pages/Sustainability/CBAM.jsx";

/* ── Pages ── */
const Home = lazy(() => import('./pages/Home'));

/* About */
const About = lazy(() => import('./pages/About/About'));
const Manufacturing = lazy(() => import('./pages/About/Manufacturing'));
const Quality = lazy(() => import('./pages/About/Quality'));
const DesignCentre = lazy(() => import('./pages/About/DesignCentre'));

/* Products */
const MSBillets = lazy(() => import('./pages/Products/MSBillets'));
const WireRods = lazy(() => import('./pages/Products/WireRods'));
const HRCoils = lazy(() => import('./pages/Products/HRCoils'));
const ERW = lazy(() => import('./pages/Products/ERW'));
const Scaffolding = lazy(() => import('./pages/Products/Scaffolding'));
const ProductRange = lazy(() => import('./pages/Products/ProductRange.jsx'));
const ProductRange2 = lazy(() => import('./pages/Products/ProductRange2.jsx'));

/* Investor Relations */
const Financials = lazy(() => import('./pages/Investors/Financials'));
const Governance = lazy(() => import('./pages/Investors/Governance'));
const Industry = lazy(() => import('./pages/Investors/Industry'));
const IPODocs = lazy(() => import('./pages/Investors/IPODocs'));
const IPOAV = lazy(() => import('./pages/Investors/IPOAV'));
const Shareholding = lazy(() => import('./pages/Investors/Shareholding'));
const Policies = lazy(() => import('./pages/Investors/Policies'));

/* EC */
const EC = lazy(() => import('./pages/EC/EC'));

/* Sustainability */
const Sustainability = lazy(
  () => import('./pages/Sustainability/Sustainability')
);
const CBAM = lazy(() => import('./pages/Sustainability/CBAM.jsx'));

/* Media */
const News = lazy(() => import('./pages/Media/News'));
const Blogs = lazy(() => import('./pages/Media/Blogs'));
const BlogDetail = lazy(() => import('./pages/Media/BlogDetail'));
const Events = lazy(() => import('./pages/Media/Events'));

/* Career */
const Career = lazy(() => import('./pages/Career/Career'));
const JobDetails = lazy(() => import('./pages/Career/JobDetails'));
const JobApply = lazy(() => import('./pages/Career/JobApply.jsx'));

/* Contact */
const Contact = lazy(() => import('./pages/Contact/Contact'));
const ThankYou = lazy(() => import('./pages/Thankyou.jsx'));
const ComingSoon = lazy(() => import('./pages/ComingSoon.jsx'));

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showGlobalPreloader, setShowGlobalPreloader] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('page_id') === '2404') {
      window.location.replace('/');
    }
  }, []);

  useEffect(() => {
    const isPrerender =
      typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';
    if (isPrerender) {
      setShowGlobalPreloader(true);
      return;
    }
    setShowGlobalPreloader(false);
  }, []);

  useEffect(() => {
    // Trailing slash redirection
    if (location.pathname !== '/' && location.pathname.endsWith('/')) {
      const newPath = location.pathname.slice(0, -1);
      navigate(newPath + location.search, { replace: true });
      return;
    } 

    // Query string SEO redirect
    if (location.pathname === '/' && location.search.includes('p=')) {
      navigate('/', { replace: true });
      return;
    }

    // setIsLoading(true);
    // // Show spinner for a short duration while page content gets rendered
    // const timer = setTimeout(() => {
    //   setIsLoading(false);
    // }, 200);

    // return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="App relative min-h-screen overflow-x-hidden font-helvetica clip scroll-smooth no-scrollbar">
      {showGlobalPreloader && <PageSpinner />}
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="flex-grow">
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* SEO Redirects */}
            {[
              {
                path: '/tag/scaffolding-formwork-company-in-india/feed',
                to: '/blog/trusted-scaffolding-and-formwork-company-in-india-delivering-safety-and-strength',
              },
              {
                path: '/tag/forged-scaffolding-components',
                to: '/blog/complete-guide-to-forged-scaffolding-components-for-industrial-projects',
              },
              {
                path: '/tag/scaffolding-formwork-company-in-india',
                to: '/blog/trusted-scaffolding-and-formwork-company-in-india-delivering-safety-and-strength',
              },
              {
                path: '/blog/renny-strips-leading-the-future-of-steel-fabrication-forging',
                to: '/blog',
              },
              {
                path: '/the-surging-demand-for-sustainable-steel-scaffolding-and-formwork-within-the-construction-and-infrastructure-in',
                to: '/blog',
              },
              {
                path: '/tag/scaffolding-and-formworks-frames/feed',
                to: '/blog/scaffolding-and-formworks-frames-innovations-driving-faster-and-safer-building',
              },
              { path: '/tag/renny/feed', to: '/' },
              {
                path: '/tag/wire-rod-manufacturers-in-india/feed',
                to: '/blog/explore-the-leading-wire-rod-manufacturers-in-india-for-superior-industrial-applications',
              },
              {
                path: '/renny-kwikstage-scaffolding-a-global-leader-in-versatile-high-performance-scaffolding-solutions',
                to: '/blog/kwikstage-scaffolding-expert-insights-for-better-construction-performance',
              },
              {
                path: '/renny-strips-leading-the-future-of-steel-fabrication-forging',
                to: '/blog',
              },
              { path: '/category/uncategorized/page/3', to: '/blog' },
              { path: '/category/uncategorized/page/2', to: '/blog' },
              {
                path: '/tag/gi-hollow-section-pipe/feed',
                to: '/blog/gi-square-hollow-pipe-manufacturers-in-india-providing-durable-solutions-for-industries',
              },
              {
                path: '/blog/renny-kwikstage-scaffolding-a-global-leader-in-versatile-high-performance-scaffolding-solutions',
                to: '/blog/kwikstage-scaffolding-expert-insights-for-better-construction-performance',
              },
              {
                path: '/explore-the-leading-wire-rod',
                to: '/blog/explore-the-leading-wire-rod-manufacturers-in-india-for-superior-industrial-applications',
              },
              {
                path: '/blog/renny-kwikstage-',
                to: '/blog/kwikstage-scaffolding-expert-insights-for-better-construction-performance',
              },
              {
                path: '/blog/renny-indias-leading-erw-pipe-manufacturer',
                to: '/blog',
              },
              { path: '/tag/v/feed', to: '/' },
              {
                path: '/the-role-of-renny-steel-props-in-modern-construction-innovation-safety-efficiency',
                to: '/blog',
              },
              { path: '/blog/the-', to: '/blog' },
            ].map((redirect, index) => (
              <Route
                key={index}
                path={redirect.path}
                element={<Navigate to={redirect.to} replace />}
              />
            ))}

            {/* About */}
            <Route path="/company-overview" element={<About />} />
            <Route path="/manufacturing-units" element={<Manufacturing />} />
            <Route path="/quality-standard" element={<Quality />} />
            <Route path="/design-centre" element={<DesignCentre />} />

            {/* Products */}
            <Route path="/ms-billets" element={<MSBillets />} />
            <Route path="/wire-rods" element={<WireRods />} />
            <Route path="/narrow-hrcoil" element={<HRCoils />} />
            <Route path="/erw-pipes-and-tubes" element={<ERW />} />
            <Route path="/scaffolding-formwork" element={<Scaffolding />} />

            {/* Investor Relations */}
            <Route path="/financials" element={<Financials />} />
            <Route path="/corporate-governance" element={<Governance />} />
            <Route path="/industry-report" element={<Industry />} />
            <Route path="/ipo" element={<IPODocs />} />
            <Route path="/ipo-audio-visual" element={<IPOAV />} />
            <Route path="/share-holding-pattern" element={<Shareholding />} />
            <Route path="/our-policies" element={<Policies />} />

            {/* EC */}
            <Route path="/ec" element={<EC />} />

            {/* Sustainability */}
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/green-steel" element={<GreenSteel />} />
            <Route path="/cbam" element={<CBAM />} />

            {/* Media */}
            <Route path="/news-room" element={<News />} />
            <Route path="/blog" element={<Blogs />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/events" element={<Events />} />

            {/* Contact */}
            <Route path="/contact-us" element={<Contact />} />

            {/* Career */}
            <Route path="/careers" element={<Career />} />
            <Route path="/careers/:jobId" element={<JobDetails />} />
            <Route path="/careers/:jobId/apply" element={<JobApply />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/thank-you" element={<Thankyou />} />
            <Route path="/:slug/thank-you" element={<Thankyou />} />
            <Route path="/catelogue-download" element={<ComingSoon />} />
            <Route path="/scaffolding-brochure" element={<ScaffoldingBrochure />} />
          </Routes>
          <Parallax />
          <Footer />
        </Suspense>
      </main>
      <WhatsAppButton />
    </div>
  );
};

export default App;
