import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { 
  UsersIcon, ActiveUsersIcon, LoansIcon, SavingsIcon, 
  FilterIcon, OptionsIcon 
} from '../components/Icons';
import type { User, UserStatus } from '../types';
import { storage } from '../services/storage';

interface UsersPageProps {
  onLogout: () => void;
}
const UsersPage: React.FC<UsersPageProps> = ({ onLogout }) => {
  // 1. State Management
  const [users, setUsers] = useState<User[]>([]); // Master list
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Display list
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  
  const [filterValues, setFilterValues] = useState({
    organization: '',
    username: '',
    email: '',
    phoneNumber: '',
    dateJoined: '',
    status: ''
  });

  const navigate = useNavigate();

  // 2. Load Data
  useEffect(() => {
    const data = storage.getUsers();
    setUsers(data);
    setFilteredUsers(data);
  }, []);

  // 3. Filter Logic
  const toggleFilter = (columnName: string) => {
    setActiveFilterColumn(activeFilterColumn === columnName ? null : columnName);
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = users.filter((user: User) => { 
      return (
        (filterValues.organization === '' || user.organization.toLowerCase().includes(filterValues.organization.toLowerCase())) &&
        (filterValues.username === '' || user.username.toLowerCase().includes(filterValues.username.toLowerCase())) &&
        (filterValues.email === '' || user.email.toLowerCase().includes(filterValues.email.toLowerCase())) &&
        (filterValues.status === '' || user.status === filterValues.status)
      );
    });
    setFilteredUsers(filtered);
    setCurrentPage(1);
    setActiveFilterColumn(null);
  };

  const handleReset = () => {
    setFilterValues({ organization: '', username: '', email: '', phoneNumber: '', dateJoined: '', status: '' });
    setFilteredUsers(users);
    setActiveFilterColumn(null);
  };

  // 4. Pagination & Helpers
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const stats = [
    { label: 'USERS', value: '2,453', icon: <UsersIcon />, bgColor: 'rgba(223, 24, 255, 0.1)' },
    { label: 'ACTIVE USERS', value: '2,453', icon: <ActiveUsersIcon />, bgColor: 'rgba(87, 24, 255, 0.1)' },
    { label: 'USERS WITH LOANS', value: '12,453', icon: <LoansIcon />, bgColor: 'rgba(245, 95, 68, 0.1)' },
    { label: 'USERS WITH SAVINGS', value: '102,453', icon: <SavingsIcon />, bgColor: 'rgba(255, 51, 102, 0.1)' },
  ];

  const getStatusClass = (status: UserStatus) => `status-pill status-pill--${status.toLowerCase()}`;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit'
    });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
    }

    return (
      <div className="pagination">
        <div className="pagination__left">
          <span>Showing</span>
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
            {[10, 20, 50, 100].map(val => <option key={val} value={val}>{val}</option>)}
          </select>
          <span>out of {filteredUsers.length}</span>
        </div>
        <div className="pagination__right">
          <button className="page-btn page-btn--nav" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>‹</button>
          {pages.map((p, i) => (
            <button key={i} className={`page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => typeof p === 'number' && handlePageChange(p)} disabled={p === '...'}>
              {p}
            </button>
          ))}
          <button className="page-btn page-btn--nav" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
        </div>
      </div>
    );
  };

  return (
    <div className="users-page">
      <Header />
      <Sidebar onLogout={onLogout} />
      <main className="users-page__content">
        <h2>Users</h2>
        <div className="users-page__stats">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-card__icon-box" style={{ background: stat.bgColor }}>{stat.icon}</div>
              <span className="stat-card__label">{stat.label}</span>
              <span className="stat-card__value">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="users-page__table-wrapper scrollbar-hide">
          <table className="table">
            <thead>
              <tr>
                {['ORGANIZATION', 'USERNAME', 'EMAIL', 'PHONE NUMBER', 'DATE JOINED', 'STATUS'].map((head, i) => (
                  <th key={i} style={{ position: 'relative' }}>
                    <div className="header-cell" onClick={() => toggleFilter(head)} style={{ cursor: 'pointer' }}>
                      {head} <FilterIcon />
                    </div>
                    {activeFilterColumn === head && (
                      <div className="filter-popup">
                        <form onSubmit={handleFilter}>
                          <div className="filter-group">
                            <label>Organization</label>
                            <select value={filterValues.organization} onChange={(e) => setFilterValues({...filterValues, organization: e.target.value})}>
                              <option value="">Select</option>
                              <option value="Lendsqr">Lendsqr</option>
                              <option value="Iridia">Iridia</option>
                            </select>
                          </div>
                          <div className="filter-group">
                            <label>Username</label>
                            <input type="text" placeholder="User" value={filterValues.username} onChange={(e) => setFilterValues({...filterValues, username: e.target.value})} />
                          </div>
                          {/* Add other inputs (Email, Status, etc) here as needed */}
                          <div className="filter-popup__btns">
                            <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
                            <button type="submit" className="btn-filter">Filter</button>
                          </div>
                        </form>
                      </div>
                    )}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr key={user.id} onClick={() => navigate(`/users/${user.id}`)} style={{ cursor: 'pointer' }}>
                  <td>{user.organization}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{formatDate(user.dateJoined)}</td>
                  <td><span className={getStatusClass(user.status)}>{user.status}</span></td>
                  <td onClick={(e) => e.stopPropagation()} style={{ position: 'relative', overflow: 'visible' }}>
                    <button 
                      className="options-trigger" 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the row click (navigation) from firing
                        setActiveMenuId(activeMenuId === user.id ? null : user.id);
                      }}
                    >
                      <OptionsIcon />
                    </button>
  
                    {activeMenuId === user.id && (
                      <div className="options-menu">
                          <button onClick={() => navigate(`/users/${user.id}`)}>👁 View Details</button>
                        <button>🚫 Blacklist User</button>
                        <button>✅ Activate User</button>
                      </div>
                    )}
                  </td>                    
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {renderPagination()}
      </main>
    </div>
  );
};

export default UsersPage;