// src/services/userService.ts
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/types';
import * as database from '../DAL/database';

export const registerUser = async (username: string, password: string): Promise<string> => {
  const existingUser = database.findUserByUsername(username);
  if (existingUser) {
    throw new Error('Username already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();
  const newUser: User = { userId, username, password: hashedPassword };
  
  database.addUser(newUser);
  return userId;
};

export const loginUser = async (username: string, password: string): Promise<string> => {
  const user = database.findUserByUsername(username);
  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  return user.userId;
};