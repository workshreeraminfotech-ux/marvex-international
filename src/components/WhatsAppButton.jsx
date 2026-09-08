import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a 
      href="https://api.whatsapp.com/send?phone=918200712955&text=Hello%20Marvex%20International,%20I%20am%20interested%20in%20your%20wholesale%20agro%20commodities." 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-btn"
      aria-label="Chat on Business WhatsApp"
      title="Chat on Business WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}
