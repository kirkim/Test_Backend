let posts = [
  {
    id: '1',
    title: 'sample post',
    content: 'Hello world!',
    createdAt: new Date(),
    userId: '1',
  },
  {
    id: '2',
    title: 'hello everyone',
    content: 'Hello world!',
    createdAt: new Date(),
    userId: '1',
  },
  {
    id: '3',
    title: 'wow!',
    content: 'Hello world!aasd',
    createdAt: new Date(),
    userId: '1',
  },
];

export async function create(post) {
  const created = { ...post, createdAt: new Date(), id: Date.now().toString() };
  posts.push(created);
  return created.id;
}

export async function findById(id) {
  return posts.find((post) => post.id === id);
}

export async function findByUserId(userId) {
  return posts.find((post) => post.userId === userId);
}

export async function getAllPosts() {
  return posts;
}

for (let i = 0; i < 1200; i++) {
  create({ title: 'sample', content: 's', userId: '1' });
}
