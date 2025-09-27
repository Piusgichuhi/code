export enum Theme {
  Light = "light",
  Dark = "dark",
}

export enum UserRole {
  User = "user",
  Root = "root",
}

export interface User {
  username: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, role: UserRole) => void;
  logout: () => void;
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface CyberTool {
  name: string;
  category: string;
  description: string;
}

export interface NewsArticle {
  title: string;
  summary: string;
  source: string;
}

export enum AttackType {
    DDoS = 'DDoS',
    BruteForce = 'Brute Force',
    SQLEnabled = 'SQL Injection'
}

export interface AttackLog {
    id: number;
    timestamp: string;
    ipAddress: string;
    attackType: AttackType;
    status: 'Blocked' | 'In Progress' | 'Resolved';
}
