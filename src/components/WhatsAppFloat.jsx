import React from 'react';

export default function WhatsAppFloat() {
  return (
    <div className="wa-float-container">
      <a
        href="https://api.whatsapp.com/send?phone=918200712955&text=Hello%20Marvex%20International,%20I%20am%20interested%20in%20your%20export%20commodities."
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float-btn"
        aria-label="Chat with Marvex International on WhatsApp"
        title="Chat on WhatsApp (+91 8200712955)"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM17.82 16.19C17.58 16.86 16.63 17.43 15.82 17.61C15.26 17.73 14.54 17.82 12.08 16.8C8.94 15.5 6.92 12.31 6.76 12.1C6.61 11.89 5.48 10.39 5.48 8.83C5.48 7.27 6.27 6.51 6.59 6.18C6.91 5.85 7.23 5.85 7.47 5.85C7.71 5.85 7.95 5.85 8.11 5.86C8.27 5.86 8.51 5.8 8.75 6.38C8.99 6.96 9.58 8.39 9.65 8.54C9.72 8.69 9.79 8.89 9.69 9.09C9.59 9.29 9.52 9.39 9.37 9.56C9.22 9.73 9.07 9.87 8.92 10.05C8.76 10.22 8.6 10.4 8.78 10.71C8.96 11.02 9.58 12.03 10.49 12.84C11.67 13.89 12.63 14.23 12.95 14.38C13.27 14.53 13.46 14.5 13.65 14.28C13.84 14.06 14.47 13.33 14.7 13.01C14.93 12.69 15.17 12.73 15.48 12.85C15.79 12.97 17.46 13.79 17.77 13.95C18.08 14.11 18.29 14.19 18.37 14.33C18.45 14.47 18.45 15.13 18.21 15.8C18.06 16.19 17.82 16.19 17.82 16.19Z" fill="#FFFFFF"/>
        </svg>
        <span className="wa-float-pulse"></span>
      </a>
    </div>
  );
}
