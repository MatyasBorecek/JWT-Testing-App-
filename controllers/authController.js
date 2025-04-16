import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { readDb, writeDb } from '../utils/db.js';
import config from '../config/index.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await readDb();

    // find user in db.json
    const user = db.users.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Passw check
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Creation of JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({ accessToken: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const db = await readDb();

    // Check for existing user
    if (db.users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash passwd
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = {
      id: db.users.length + 1,
      email,
      password: hashedPassword,
      username,
      role: 'user'
    };

    // add to db.json
    db.users.push(newUser);
    await writeDb(db);

    // create token for new user
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        username: newUser.username
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.status(201).json({ accessToken: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
