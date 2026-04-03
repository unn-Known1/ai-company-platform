import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWebSocket } from '../context/WebSocketContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { connected } = useWebSocket();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/agents', label: 'Agents' },
    { path: '/tickets', label: 'Tickets' },
    { path: '/missions', label: 'Missions' },
    { path: '/budgets', label: 'Budgets' },
    { path: '/org', label: 'Org Chart' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: '256px', backgroundColor: '#1f2937', color: 'white', padding: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>AI Platform</h2>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                color: location.pathname === item.path ? '#60a5fa' : '#d1d5db',
                textDecoration: 'none',
                borderRadius: '0.25rem',
                marginBottom: '0.25rem',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1 }}>
        <header style={{ backgroundColor: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: connected ? '#22c55e' : '#ef4444' }} />
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{connected ? 'Connected' : 'Disconnected'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.875rem' }}>{user?.name || user?.email}</span>
            <button onClick={logout} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Logout</button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default Layout;
