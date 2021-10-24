import PageMaker from '../render/pageMaker.js';
import PostPageMaker from '../render/postPageMaker.js';
import * as postDb from '../db/postData.js';
import * as userDb from '../db/userData.js';

export async function getPosts(req, res) {
  const { id } = req.params;
  const posts = await postDb.getAllPosts();
  const htmlData = {
    title: 'Post list',
    posts: posts,
    type: 'board',
    num: id,
    pageRange: 10,
  };
  const postPageMaker = new PostPageMaker(htmlData, req);
  postPageMaker.addCss('posts.css');
  return res.send(await postPageMaker.render());
}

export async function getUpload(req, res) {
  const htmlData = {
    title: 'Create post',
    contentFile: 'upload.html',
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('upload.css');
  return res.send(await pageMaker.render());
}

export async function postUpload(req, res) {
  const { title, content } = req.body;
  const userId = req.session.user;
  await postDb.create({ title, content, userId });
  req.flash('success', `Add new post!`);
  return res.redirect('/posts');
}

export async function get(req, res) {
  const { id } = req.params;
  const post = await postDb.findById(id);
  const user = await userDb.findById(post.userId);
  // if (!post) {
  //   return new Error('Not found post!');
  // }
  const content = `
	<div class="post__set">
		<div class="post__title">${post.title}</div>
		<div class="post__info">
			<div class="post__auth">
				<a href="/users/${user.id}">${user.name}</a> |
			</div>
			<div class="post__date">${post.createdAt.toLocaleString()}</div>
		</div>
		<div class="post__content">${post.content}</div>
	</div>
	`;

  const htmlData = {
    title: 'Post',
    contentFile: content,
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('post.css');
  return res.send(await pageMaker.render());
}

export function update(req, res) {}
export function remove(req, res) {}
