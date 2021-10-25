import PageMaker from '../render/pageMaker.js';
import PostPageMaker from '../render/postPageMaker.js';
import * as postDb from '../db/postData.js';
import * as userDb from '../db/userData.js';

export async function getPosts(req, res) {
  const { range, page } = req.query;
  //const { id } = req.params;
  const posts = await postDb.getAllPosts();
  const htmlData = {
    title: 'Post list',
    posts: posts,
    type: 'board',
    num: page ? page : 1,
    pageRange: range ? range : 10,
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

  let deleteBtn = '';
  if (user.id === req.session.user.id) {
    deleteBtn = `<button class="post__delete" id="deleteBtn" data-id="${id}">삭제</button>`;
  }
  const content = `
	<div class="post__set">
		<div class="post__title">${post.title}</div>
		<div class="post__info">
			<div class="post__auth">
				<a href="/users/${user.id}">${user.name}</a> |
			</div>
			<div class="post__date">${post.createdAt.toLocaleString()}</div>
			${deleteBtn}
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
  pageMaker.addJavascript('post.js');
  return res.send(await pageMaker.render());
}

export function update(req, res) {}

export async function remove(req, res) {
  const { id } = req.params;
  const { user } = req.session;
  const post = await postDb.findById(id);
  if (!post) {
    return res.sendStatus(404);
  }

  if (post.userId === user.id) {
    await postDb.findByIdAndDelete(id);
    return res.sendStatus(200);
  }

  return res.sendStatus(403);
}
