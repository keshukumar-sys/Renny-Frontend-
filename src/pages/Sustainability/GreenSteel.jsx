import React, { useEffect } from 'react';

const GreenSteel = () => {
  const pdfUrl =
    'https://renny-assets-storage.s3.ap-south-1.amazonaws.com/documents/RENNY+STRIPS+LIMITED%2C+LUDHIANA%2C+PUNJAB.pdf';

  useEffect(() => {
    // Automatically open the PDF in the same window
    window.location.href = pdfUrl;
  }, []);
  return (
    <div style={styles.container}>
      <h1>Redirecting to Document...</h1>
      <p>
        If the PDF does not open automatically, please click the button below:
      </p>

      <a href={pdfUrl} style={styles.button}>
        Open PDF Manually
      </a>
    </div>
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
