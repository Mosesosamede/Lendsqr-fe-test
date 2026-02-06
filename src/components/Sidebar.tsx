import React, { useState } from 'react';
import { useLocation, Link, } from 'react-router-dom';


interface SidebarProps {
  onLogout: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);



  const sections = [
    {
      title: 'CUSTOMERS',
      items: [
        { label: 'Users', icon: '👥', path: '/users' },
        { label: 'Guarantors', icon: '🤝', path: '/guarantors' },
        { label: 'Loans', icon: '💰', path: '/loans' },
        { label: 'Decision Models', icon: '⚖️', path: '/decision' },
        { label: 'Savings', icon: '🐷', path: '/savings' },
        { label: 'Loan Requests', icon: '📝', path: '/requests' },
        { label: 'Whitelist', icon: '👤', path: '/whitelist' },
        { label: 'Karma', icon: '💫', path: '/karma' },
      ]
    },
    {
      title: 'BUSINESSES',
      items: [
        { label: 'Organization', icon: '🏢', path: '/org' },
        { label: 'Loan Products', icon: '🏦', path: '/products' },
        { label: 'Savings Products', icon: '💸', path: '/savings-p' },
        { label: 'Fees and Charges', icon: '🧾', path: '/fees' },
        { label: 'Transactions', icon: '🔄', path: '/transactions' },
        { label: 'Services', icon: '⚙️', path: '/services' },
        { label: 'Service Account', icon: '🛠️', path: '/service-acc' },
        { label: 'Settlements', icon: '📅', path: '/settlements' },
        { label: 'Reports', icon: '📊', path: '/reports' },
      ]
    }
  ];

  return (
    <>
      <button className="lg:hidden fixed bottom-6 right-6 z-[1001] bg-[#39CDCC] text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </button>

      <aside className={`sidebar scrollbar-hide ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__item switch-org">
          <span className="sidebar__item-icon">💼</span>
          <span>Switch Organization</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#213F7D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <Link to="/users" className={`sidebar__item ${location.pathname === '/users' ? 'sidebar__item--active' : ''}`}>
          <span className="sidebar__item-icon">🏠</span>
          <span>Dashboard</span>
        </Link>

        {sections.map((section, idx) => (
          <div key={idx} className="sidebar__section">
            <h3 className="sidebar__section-title">{section.title}</h3>
            {section.items.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={i}
                  to={item.path}
                  className={`sidebar__item ${isActive ? 'sidebar__item--active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="sidebar__item-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}

        <div className="sidebar__section" style={{ borderTop: '1px solid rgba(33, 63, 125, 0.1)', marginTop: '40px', paddingTop: '20px' }}>
          <button className="sidebar__item" onClick={onLogout} style={{ width: '100%' }}>
            <span className="sidebar__item-icon">🚪</span>
            <span>Logout</span>
            
          </button>
          <div style={{ padding: '20px 30px', fontSize: '12px', opacity: 0.6 }}>v1.2.0</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;