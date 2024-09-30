import { Request, Response } from 'express';
import * as userService from '../services/userServices'; 

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userId = await userService.registerUser(username, password);
    res.json({ userId });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userId = await userService.loginUser(username, password);
    res.json({ userId });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};