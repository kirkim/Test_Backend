import bcrypt from 'bcrypt';
import config from '../config.js';

// password: 1231
let users = [
  {
    username: 'chichu',
    password: '$2b$12$onO6FjcLQx4ZHlpMgwzHg.2yAT9b6Jgde3ul6Jgr2CsUTza1JTqpm',
    name: 'Kirim',
    id: '1',
  },
];

async function hashPassword(user) {
  user.password = await bcrypt.hash(user.password, config.bcrypt.saltRounds);
}

export async function create(user) {
  await hashPassword(user);
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function getAllUsers() {
  return users;
}
