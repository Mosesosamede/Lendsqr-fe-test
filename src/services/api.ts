import type { User, UserStatus } from '../types';

const API_URL = 'https://697f923ed1548030ab666acd.mockapi.io/lendsqr/v1/users/';

const STATUSES: UserStatus[] = ['Active', 'Inactive', 'Pending', 'Blacklisted'];

/**
 * Maps API response to the rich User structure required by the UI.
 * This ensures that even if the API lacks certain fields (like socials or education), 
 * the app remains functional and beautiful.
 */
const mapApiUserToInternalUser = (apiUser: any): User => {
  return {
    id: apiUser.id || Math.random().toString(36).substr(2, 9),

    organization: apiUser.orgName || 'Lendsqr',
    username: apiUser.userName || apiUser.fullName || 'Unknown User',
    email: apiUser.email || 'user@example.com',
    phoneNumber: apiUser.phoneNumber || '080-000-0000',
    dateJoined: apiUser.createdAt || new Date().toISOString(),
    status: STATUSES[apiUser.id.length % STATUSES.length],
    personalInfo: {
      fullName: apiUser.userName || 'Unknown User',
      bvn: apiUser.bvn || '12345678901',
      gender: apiUser.gender || (Math.random() > 0.5 ? 'Female' : 'Male'),
      maritalStatus: 'Single',
      children: 'None',
      residence: apiUser.address || "Parent's Apartment"
    },
    education: {
      level: 'B.Sc',
      employmentStatus: 'Employed',
      sector: 'FinTech',
      duration: '2 years',
      officeEmail: apiUser.email || 'office@lendsqr.com',
      monthlyIncome: '₦200,000.00 - ₦400,000.00',
      loanRepayment: '40,000'
    },
    socials: {
      twitter: `@${(apiUser.userName || 'user').replace(/\s/g, '_').toLowerCase()}`,
      facebook: apiUser.userName || 'User FB',
      instagram: `@${(apiUser.userName || 'user').replace(/\s/g, '_').toLowerCase()}`
    },
    guarantor: {
      fullName: 'Debby Ogana',
      phoneNumber: '07060780922',
      email: 'debby@gmail.com',
      relationship: 'Sister'
    },
    accountDetails: {
      accountNumber: apiUser.accountNumber || '1234567890',
      bank: apiUser.bankName || 'Providus Bank',
      balance: apiUser.accountBalance || '200,000.00',
      tier: Math.floor(Math.random() * 3) + 1
    }
  };
};

export const fetchUsersFromApi = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map(mapApiUserToInternalUser);
  } catch (error) {
    console.error('Failed to fetch users from API:', error);
    return [];
  }
};