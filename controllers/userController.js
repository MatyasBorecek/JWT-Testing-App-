import { readDb } from '../utils/db.js';

export const getAllUsers = async (req, res) => {
  try {
    const db = await readDb();

    // Return user without passwd
    const safeUsers = db.users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json(safeUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
