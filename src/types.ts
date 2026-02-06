export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
  personalInfo: {
    fullName: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: string;
    residence: string;
  };
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
  accountDetails: {
    accountNumber: string;
    bank: string;
    balance: string;
    tier: number;
  };
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}