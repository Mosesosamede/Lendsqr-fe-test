import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import type { User } from '../types';
import { storage } from '../services/storage';

interface UserDetailsPageProps {
  onLogout: () => void;
}
const UserDetailsPage: React.FC<UserDetailsPageProps> = ({ onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('General Details');

  useEffect(() => {
    if (id) {
      const found = storage.getUserById(id);
      if (found) {
        setUser(found);
      }
    }
  }, [id]);

  if (!user) {
    return (
      <div className="loading-state" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>User not found or loading...</p>
      </div>
    );
  }

  const tabs = ['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'];

  return (
    <div className="details-page">
      <Header />
      <Sidebar onLogout={onLogout} />
      <main className="details-page__content">
        {/* Top Navigation */}
        <button 
          className="back-btn" 
          onClick={() => navigate('/users')} 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', background: 'none', border: 'none', cursor: 'pointer', color: '#545F7D' }}
        >
          <span>←</span> Back to Users
        </button>

        <div className="details-page__title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '500', color: '#213F7D' }}>User Details</h2>
          <div className="action-btns" style={{ display: 'flex', gap: '20px' }}>
            <button className="btn-blacklist" style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #E4033B', color: '#E4033B', background: 'none', fontWeight: '600', cursor: 'pointer' }}>BLACKLIST USER</button>
            <button className="btn-activate" style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #39CDCC', color: '#39CDCC', background: 'none', fontWeight: '600', cursor: 'pointer' }}>ACTIVATE USER</button>
          </div>
        </div>

        {/* Header Summary Card */}
        <div className="details-page__header-card">
          <div className="top-summary">
            <div className="user-avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#D7E5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: '#213F7D' }}>
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-main-info">
              <h3 style={{ fontSize: '22px', color: '#213F7D', margin: '0' }}>{user.username}</h3>
              <p style={{ color: '#545F7D', fontSize: '12px' }}>{user.id}</p>
            </div>
            <div className="divider"></div>
            <div className="user-tier">
              <p style={{ fontSize: '14px', marginBottom: '5px', color: '#545F7D' }}>User's Tier</p>
              <div style={{ color: '#E9B200' }}>
                {'★'.repeat(user.accountDetails.tier)}{'☆'.repeat(3 - user.accountDetails.tier)}
              </div>
            </div>
            <div className="divider"></div>
            <div className="bank-info">
              <h3 style={{ fontSize: '22px', color: '#213F7D', margin: '0' }}>₦{user.accountDetails.balance}</h3>
              <p style={{ fontSize: '12px', color: '#213F7D' }}>{user.accountDetails.accountNumber}/{user.accountDetails.bank}</p>
            </div>
          </div>

          <div className="tabs scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Card */}
        <div className="details-page__main-card">
          {activeTab === 'General Details' ? (
            <>
              <section className="section">
                <h4>Personal Information</h4>
                <div className="info-grid">
                  <InfoBlock label="Full Name" value={user.personalInfo.fullName} />
                  <InfoBlock label="Phone Number" value={user.phoneNumber} />
                  <InfoBlock label="Email Address" value={user.email} />
                  <InfoBlock label="BVN" value={user.personalInfo.bvn} />
                  <InfoBlock label="Gender" value={user.personalInfo.gender} />
                  <InfoBlock label="Marital Status" value={user.personalInfo.maritalStatus} />
                  <InfoBlock label="Children" value={user.personalInfo.children} />
                  <InfoBlock label="Residence" value={user.personalInfo.residence} />
                </div>
              </section>

              <hr />

              <section className="section">
                <h4>Education and Employment</h4>
                <div className="info-grid">
                  <InfoBlock label="Level of Education" value={user.education.level} />
                  <InfoBlock label="Employment Status" value={user.education.employmentStatus} />
                  <InfoBlock label="Sector" value={user.education.sector} />
                  <InfoBlock label="Duration" value={user.education.duration} />
                  <InfoBlock label="Office Email" value={user.education.officeEmail} />
                  <InfoBlock label="Monthly Income" value={user.education.monthlyIncome} />
                  <InfoBlock label="Loan Repayment" value="40,000" />
                </div>
              </section>

              <hr />

              <section className="section">
                <h4>Socials</h4>
                <div className="info-grid">
                  <InfoBlock label="Twitter" value={user.socials.twitter} />
                  <InfoBlock label="Facebook" value={user.socials.facebook} />
                  <InfoBlock label="Instagram" value={user.socials.instagram} />
                </div>
              </section>

              <hr />

              <section className="section">
                <h4>Guarantor</h4>
                <div className="info-grid">
                  <InfoBlock label="Full Name" value={user.guarantor.fullName} />
                  <InfoBlock label="Phone" value={user.guarantor.phoneNumber} />
                  <InfoBlock label="Relationship" value={user.guarantor.relationship} />
                </div>
              </section>
            </>
          ) : (
            <div className="empty-tab-content" style={{ padding: '40px', textAlign: 'center', color: '#545F7D' }}>
              <h3>No {activeTab} available</h3>
              <p>There is currently no data to display for this section.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Sub-component for clean rendering of info blocks
const InfoBlock: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="info-block" style={{ marginBottom: '30px' }}>
    <span className="label" style={{ display: 'block', fontSize: '12px', color: '#545F7D', textTransform: 'uppercase', marginBottom: '8px' }}>
      {label}
    </span>
    <span className="value" style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#545F7D' }}>
      {value || 'N/A'}
    </span>
  </div>
);

export default UserDetailsPage;