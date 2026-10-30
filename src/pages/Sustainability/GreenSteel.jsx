import React, { useEffect } from 'react';
import SEO from '../../components/SEO'

const GreenSteel = () => {
  const pdfUrl =
    '/document/RENNY+STRIPS+LIMITED%2C+LUDHIANA%2C+PUNJAB.pdf';

  useEffect(() => {
    // react-snap crashes if the page navigates away mid-prerender
    if (navigator.userAgent === 'ReactSnap') return;
    // Automatically open the PDF in the same window
    window.location.replace(pdfUrl);
  }, []);

  return (
    <>
      <SEO
        title="Green Steel Certificate | Renny Strips"
        description="Green steel document of Renny Strips Limited, Ludhiana, Punjab."
        url={`${SITE_URL}${pdfUrl}`}
      />
    <div style={styles.container}>
      <h1>Redirecting to Document...</h1>
      <p>
        If the PDF does not open automatically, please click the button below:
      </p>

      <a href={pdfUrl} style={styles.button}>
        Open PDF Manually
      </a>
    </div>
    </>
  );
};

// Basic styling for the fallback page
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  },
};

export default GreenSteel;
