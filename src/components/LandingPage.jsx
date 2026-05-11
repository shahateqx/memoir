import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthSession } from '../auth/AuthSessionContext';
import { Auth } from '../auth/Auth';
import './LandingPage.css';
import { GripVertical, MousePointer2, Zap, Users, Lock } from 'lucide-react';

export const LandingPage = () => {
  const { session } = useAuthSession();
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState(null); // 'login' | 'signup' | null

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const openAuth = (mode) => setAuthMode(mode);
  const closeAuth = () => setAuthMode(null);

  if (session) return null; // Prevent flicker while redirecting

  return (
    <div className="landing-body">
      <nav className="landing-nav">
        <div className="landing-logo">
          <div style={{ background: 'var(--accent)', color: 'white', width: '24px', height: '24px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontFamily: 'var(--font-body)' }}>M</div>
          Memoir
        </div>
        <div className="nav-links">
          <a href="#product">Product</a>
          <a href="#solutions">Solutions</a>
          <a href="#pricing">Pricing</a>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="landing-btn" onClick={() => openAuth('login')}>Log in</button>
          <button className="landing-btn btn-primary" onClick={() => openAuth('signup')}>Get Memoir free</button>
        </div>
      </nav>

      <header className="hero">
        <h1>Your knowledge, unified.</h1>
        <p>Memoir is the workspace where better, faster work happens. Notes, tasks, and collaboration—all in one place.</p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <button className="landing-btn btn-primary" style={{ padding: '14px 32px', fontSize: '17px' }} onClick={() => openAuth('signup')}>Get Memoir free</button>
          <button className="landing-btn" style={{ padding: '14px 32px', fontSize: '17px' }}>Request a demo</button>
        </div>
      </header>

      <div className="browser-frame">
        <div className="browser-header">
          <div className="dots">
            <div className="dot" style={{ background: '#ff5f56' }}></div>
            <div className="dot" style={{ background: '#ffbd2e' }}></div>
            <div className="dot" style={{ background: '#27c93f' }}></div>
          </div>
          <div className="browser-address">https://memoir.so/workspace/sci-fi-masterpieces</div>
        </div>
        <iframe src="/app-preview.html" title="App Preview"></iframe>
      </div>

      <section className="landing-section" id="product">
        <div className="feature-grid">
          <div className="feature-content">
            <h2>Blocks, not just text.</h2>
            <p>Everything in Memoir is a block. A paragraph, a task, an image, or a snippet of code. Mix and match them to build the perfect page for your thoughts.</p>
            <button className="landing-btn">Learn about block types</button>
          </div>
          <div className="feature-image">
            <div style={{ width: '80%', background: 'white', border: '1px solid var(--border)', borderRadius: '6px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <div style={{ height: '12px', background: 'var(--border)', width: '60%', marginBottom: '16px', borderRadius: '2px' }}></div>
              <div style={{ height: '12px', background: 'var(--border)', width: '90%', marginBottom: '16px', borderRadius: '2px' }}></div>
              <div style={{ height: '48px', background: 'var(--surface)', border: '1px solid var(--border)', width: '100%', margin: '24px 0', display: 'flex', alignItems: 'center', padding: '12px', borderRadius: '4px' }}>
                <div style={{ width: '24px', height: '24px', background: 'var(--accent)', borderRadius: '4px', marginRight: '12px' }}></div>
                <div style={{ height: '8px', background: 'var(--border)', width: '40%', borderRadius: '2px' }}></div>
              </div>
              <div style={{ height: '12px', background: 'var(--border)', width: '80%', borderRadius: '2px' }}></div>
            </div>
          </div>
        </div>

        <div className="feature-grid">
          <div className="feature-image" style={{ background: 'oklch(98% 0.01 250)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '60%' }}>
              <div style={{ padding: '12px', background: 'white', border: '1px solid var(--border)', borderRadius: '6px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', transform: 'rotate(-3deg)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <GripVertical size={16} color="var(--muted)" />
                 <div style={{ height: '10px', background: 'var(--border)', width: '80%', borderRadius: '2px' }}></div>
              </div>
              <div style={{ padding: '12px', background: 'white', border: '1px solid var(--border)', borderRadius: '6px', opacity: 0.4, display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <GripVertical size={16} color="var(--muted)" />
                 <div style={{ height: '10px', background: 'var(--border)', width: '60%', borderRadius: '2px' }}></div>
              </div>
            </div>
            <div style={{ position: 'absolute', right: '40px', top: '60px', width: '40px', height: '40px', background: 'var(--accent)', borderRadius: '50%', opacity: 0.15, border: '2px solid var(--accent)' }}></div>
            <MousePointer2 size={24} style={{ position: 'absolute', right: '50px', top: '70px', color: 'var(--accent)' }} />
          </div>
          <div className="feature-content">
            <h2>Drag and drop everything.</h2>
            <p>Your ideas shouldn't be static. Reorganize your thoughts as fast as you have them. Drag blocks to nest them, move them to new pages, or turn them into something else entirely.</p>
            <button className="landing-btn">Explore flexible layouts</button>
          </div>
        </div>
      </section>

      <section className="social-proof">
        <div className="landing-section" style={{ margin: '0 auto' }}>
          <h2>Trusted by individuals and teams worldwide</h2>
          <div className="logo-cloud">
            <div className="landing-logo">ACME CORP</div>
            <div className="landing-logo">GLOBEX</div>
            <div className="landing-logo">SOYLENT</div>
            <div className="landing-logo">INITECH</div>
            <div className="landing-logo">UMBRELLA</div>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-title">Focus on what matters.</div>
        <div className="benefits-grid">
          <div className="benefit-card">
            <Zap size={32} color="var(--accent)" />
            <h3>Lightning Fast</h3>
            <p>Built for speed and focus. No loading spinners, just instant action so you can stay in the flow state.</p>
          </div>
          <div className="benefit-card">
            <Users size={32} color="var(--accent)" />
            <h3>Real-time Collab</h3>
            <p>Work together in the same page, at the same time. See presence markers and edits as they happen.</p>
          </div>
          <div className="benefit-card">
            <Lock size={32} color="var(--accent)" />
            <h3>Privacy First</h3>
            <p>Your data is yours. End-to-end encryption for your most private thoughts and enterprise security.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to organize your mind?</h2>
        <p>Join 100,000+ individuals and teams using Memoir to build their second brain. Start free today.</p>
        <button className="landing-btn" style={{ padding: '18px 48px', fontSize: '18px', background: 'white', color: 'var(--fg)', borderColor: 'white' }} onClick={() => openAuth('signup')}>Get Memoir free</button>
      </section>

      <footer className="landing-footer">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="landing-logo">
            <div style={{ background: 'var(--accent)', color: 'white', width: '20px', height: '20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontFamily: 'var(--font-body)' }}>M</div>
            Memoir
          </div>
          <div style={{ maxWidth: '240px', lineHeight: '1.6' }}>The all-in-one workspace for your notes, tasks, and wikis.</div>
        </div>
        <div style={{ display: 'flex', gap: '60px' }}>
          <div className="footer-col">
            <span>Product</span>
            <a href="#">Overview</a>
            <a href="#">Web App</a>
            <a href="#">Desktop App</a>
            <a href="#">Mobile App</a>
          </div>
          <div className="footer-col">
            <span>Resources</span>
            <a href="#">Help Center</a>
            <a href="#">Guides</a>
            <a href="#">Community</a>
            <a href="#">API</a>
          </div>
          <div className="footer-col">
            <span>Company</span>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </footer>

      {authMode && (
        <div className="auth-modal-overlay" onClick={closeAuth}>
          <div onClick={(e) => e.stopPropagation()}>
            <Auth initialMode={authMode} />
          </div>
        </div>
      )}
    </div>
  );
};
