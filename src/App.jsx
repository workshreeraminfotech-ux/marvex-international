import React, { useState, Suspense, lazy } from 'react';

import HeaderTop from './components/HeaderTop';
import Navbar from './components/Navbar';
import FooterSection from './components/FooterSection';
import WhatsAppFloat from './components/WhatsAppFloat';
import Preloader from './components/Preloader';

// Main Home Page Loaded Directly for instant render
import Home from './pages/Home';

// Lazy Loaded Pages & Modals for lightning-fast initial load
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const QuickViewModal = lazy(() => import('./components/QuickViewModal'));
const QuoteModal = lazy(() => import('./components/QuoteModal'));

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
      <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Admin...</div>}>
        <AdminPage onNavigate={handleNavigate} />
        <Preloader />
      </Suspense>
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
        <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loading-spinner"></div></div>}>
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
        </Suspense>
      </main>

      <FooterSection onNavigate={handleNavigate} />

      <Suspense fallback={null}>
        {selectedProduct && (
          <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onOpenQuote={(prod) => handleOpenQuote(prod)} />
        )}

        {isQuoteOpen && (
          <QuoteModal 
            isOpen={isQuoteOpen} 
            initialProduct={quoteProduct} 
            onClose={() => setIsQuoteOpen(false)} 
          />
        )}
      </Suspense>

      <WhatsAppFloat />
      <Preloader />
    </div>
  );
}
