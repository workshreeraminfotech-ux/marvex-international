import React, { useState } from 'react';

import HeaderTop from './components/HeaderTop';
import Navbar from './components/Navbar';
import FooterSection from './components/FooterSection';
import QuickViewModal from './components/QuickViewModal';
import QuoteModal from './components/QuoteModal';
import WhatsAppFloat from './components/WhatsAppFloat';
import Preloader from './components/Preloader';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Earthing Parts');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quoteProduct, setQuoteProduct] = useState('');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const handleNavigate = (pageId, category = null) => {
    if (category) {
      setActivePage('products');
      setSelectedCategory(category);
    } else if (pageId.startsWith('category-')) {
      setActivePage('products');
      const catMap = {
        'category-earthing-parts': 'Earthing Parts',
        'category-spices-agro': 'Spices & Agro Commodities',
        'category-hardware-items': 'Hardware & Sanitary Items',
        'category-hardware-sanitary': 'Hardware & Sanitary Items',
        'category-indian-spices': 'Spices & Agro Commodities',
        'category-agro-commodities': 'Spices & Agro Commodities',
        'category-machinery': 'Hardware & Sanitary Items',
        'category-pipes': 'Hardware & Sanitary Items'
      };
      setSelectedCategory(catMap[pageId] || 'Earthing Parts');
    } else if (pageId === 'products') {
      setActivePage('products');
      setSelectedCategory(category || 'Earthing Parts');
    } else {
      setActivePage(pageId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (productName = '') => {
    setQuoteProduct(productName);
    setIsQuoteOpen(true);
  };

  // Dedicated Admin Screen
  if (activePage === 'admin') {
    return (
      <div>
        <AdminPage onNavigate={handleNavigate} />
        <Preloader />
      </div>
    );
  }

  return (
    <div>
      <HeaderTop />
      <Navbar 
        activePage={activePage} 
        onNavigate={handleNavigate} 
        onOpenQuote={() => handleOpenQuote()} 
      />

      <main>
        {(activePage === 'home' || activePage === 'faq') && (
          <Home 
            onSelectProduct={setSelectedProduct} 
            onNavigate={handleNavigate} 
            onOpenQuote={(prod) => handleOpenQuote(prod)} 
          />
        )}
        {activePage === 'about' && (
          <AboutPage 
            onNavigate={handleNavigate} 
            onOpenQuote={() => handleOpenQuote()} 
          />
        )}
        {activePage === 'products' && (
          <ProductsPage 
            initialCategory={selectedCategory}
            onSelectProduct={setSelectedProduct} 
            onOpenQuote={(prod) => handleOpenQuote(prod)} 
          />
        )}
        {activePage === 'blog' && (
          <BlogPage />
        )}
        {activePage === 'contact' && (
          <ContactPage 
            onOpenQuote={() => handleOpenQuote()} 
          />
        )}
      </main>

      <FooterSection onNavigate={handleNavigate} />

      {selectedProduct && (
        <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onOpenQuote={(prod) => handleOpenQuote(prod)} />
      )}

      <QuoteModal 
        isOpen={isQuoteOpen} 
        initialProduct={quoteProduct} 
        onClose={() => setIsQuoteOpen(false)} 
      />

      <WhatsAppFloat />
      <Preloader />
    </div>
  );
}
