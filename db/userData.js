let users = [
  {
    id: '1',
    username: 'chichu',
    password: 's',
    name: 'Jisoo',
  },
];

export async function create(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
