import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword, verifyPassword } from './auth';

// Define the user type
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

// Path to the CSV file
const CSV_FILE_PATH = path.join(process.cwd(), 'data', 'users.csv');

// Ensure the data directory exists
const ensureDataDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Create the CSV file if it doesn't exist
const ensureCsvFileExists = () => {
  ensureDataDirectoryExists();
  if (!fs.existsSync(CSV_FILE_PATH)) {
    const headers = 'id,name,email,password,createdAt,updatedAt\n';
    fs.writeFileSync(CSV_FILE_PATH, headers);
  }
};

// Parse CSV data to user objects
const parseCsvToUsers = (csvData: string): User[] => {
  const lines = csvData.split('\n');
  // Skip the header line
  const dataLines = lines.slice(1).filter(line => line.trim() !== '');
  
  return dataLines.map(line => {
    const [id, name, email, password, createdAt, updatedAt] = line.split(',');
    return { id, name, email, password, createdAt, updatedAt };
  });
};

// Convert user objects to CSV data
const usersToCSV = (users: User[]): string => {
  const headers = 'id,name,email,password,createdAt,updatedAt\n';
  const rows = users.map(user => 
    `${user.id},${user.name},${user.email},${user.password},${user.createdAt},${user.updatedAt}`
  ).join('\n');
  
  return headers + rows;
};

// Get all users
export const getAllUsers = (): User[] => {
  ensureCsvFileExists();
  const csvData = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
  return parseCsvToUsers(csvData);
};

// Find user by email
export const findUserByEmail = (email: string): User | null => {
  const users = getAllUsers();
  return users.find(user => user.email === email) || null;
};

// Create a new user
export const createUser = async (name: string, email: string, password: string): Promise<User> => {
  const users = getAllUsers();
  
  // Check if user already exists
  if (users.some(user => user.email === email)) {
    throw new Error('User with this email already exists');
  }
  
  // Hash the password
  const hashedPassword = await hashPassword(password);
  
  // Create new user
  const now = new Date().toISOString();
  const newUser: User = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now
  };
  
  // Add to users array and save
  users.push(newUser);
  fs.writeFileSync(CSV_FILE_PATH, usersToCSV(users));
  
  return newUser;
};

// Verify user credentials
export const verifyUserCredentials = async (email: string, password: string): Promise<User | null> => {
  const user = findUserByEmail(email);
  
  if (!user) {
    return null;
  }
  
  const isPasswordValid = await verifyPassword(password, user.password);
  
  return isPasswordValid ? user : null;
};

// Update user
export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const users = getAllUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return null;
  }
  
  // Update the user
  const updatedUser = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  users[userIndex] = updatedUser;
  fs.writeFileSync(CSV_FILE_PATH, usersToCSV(users));
  
  return updatedUser;
}; 