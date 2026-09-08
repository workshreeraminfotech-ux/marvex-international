import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Marvex International App Crash:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: '#0A2240', marginBottom: '8px' }}>Marvex International</h2>
          <p style={{ color: '#64748B', maxWidth: '500px', fontSize: '14px', lineHeight: 1.5 }}>
            Application encountered a temporary error.
          </p>
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '14px 20px', borderRadius: '12px', maxWidth: '650px', width: '100%', margin: '16px 0', textAlign: 'left', fontSize: '13px', fontFamily: 'monospace', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
            {String(this.state.error?.stack || this.state.error?.message || this.state.error)}
          </div>
          <button 
            onClick={() => {
              try {
                localStorage.removeItem('marvex_products');
                localStorage.removeItem('marvex_blogs');
                localStorage.removeItem('marvex_certs');
                localStorage.removeItem('marvex_enquiries');
              } catch(e) {}
              window.location.reload();
            }}
            style={{ background: 'linear-gradient(135deg, #1B4B7A 0%, #0284C7 100%)', color: '#fff', padding: '12px 28px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px', boxShadow: '0 4px 14px rgba(2,132,199,0.3)' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
