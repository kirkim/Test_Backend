let posts = [
  {
    id: '1',
    title: 'sample post',
    content: 'Hello world!',
    createdAt: Date.now(),
    userId: '1',
  },
];

export async function create(post) {
  const created = { ...post, createdAt: Date.now(), id: Date.now().toString() };
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
