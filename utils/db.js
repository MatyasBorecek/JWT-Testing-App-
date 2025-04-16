import { readFile, writeFile } from 'fs/promises';

/** @typedef User
 * @property {number} id
 * @property {string} email
 * @property {string} password
 * @property {string} username
 * @property {string} role
 */

/**
 * Returns users
 * @return {Promise<{users: array<User>}>}
 */
export const readDb = async () => {
  const data = await readFile('./db.json', 'utf8');
  return JSON.parse(data);
};

export const writeDb = async (data) => {
  await writeFile('./db.json', JSON.stringify(data, null, 2));
};
