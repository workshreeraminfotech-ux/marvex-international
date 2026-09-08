import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import ProductModal from './ProductModal';
import { PRODUCT_CATEGORIES } from '../data/products';
import { useStoreProducts } from '../utils/useStore';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('Ground Spices');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const productsList = useStoreProducts();

  const filteredProducts = productsList.filter(item => {
    if (!item) return false;
    const cat = String(item.category || item.cat || '');
    const subcat = String(item.subcategory || '');
    const matchesCategory = cat.toLowerCase() === activeCategory.toLowerCase() || 
      subcat.toLowerCase() === activeCategory.toLowerCase();
    const q = searchTerm.toLowerCase();
    const matchesSearch = q === '' ||
      item.title.toLowerCase().includes(q) || 
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.desc && item.desc.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-80 bg-light" id="products">
      <div className="container">
        <div className="section-title text-center">
          <span className="eyebrow">Export Commodity Catalog</span>
          <h2>Explore Marvex International <span>Agro & Spices Catalog</span></h2>
          <p className="section-desc">Search and filter through our export-grade wholesale ground spices, whole spices, seed spices, and agro commodities.</p>
        </div>

        {/* Controls */}
        <div className="catalog-controls">
          <div className="search-input-wrap">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search commodities (e.g. Turmeric, Cumin, Chilli, Cardamom...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-pills">
            {PRODUCT_CATEGORIES.map((cat, idx) => (
              <button 
                key={idx}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map((item, idx) => (
            <div key={item.id || idx} className="product-card" onClick={() => setSelectedProduct(item)}>
              <div className="card-img-wrap">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description || item.desc}</p>
                <div className="card-foot" style={{ marginTop: 'auto' }}>
                  <button className="btn btn-primary" style={{ width: '100%', padding: '9px 14px', fontSize: '13px', justifyContent: 'center' }}>
                    <span>Request Quote</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>
            <p>No products found matching "{searchTerm}". Try searching for another term.</p>
          </div>
        )}
      </div>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}
