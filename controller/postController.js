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
  const { range, page, no } = req.query;
  const posts = await postDb.getAllPosts();
  const htmlData = {
    title: 'Post',
    posts: posts,
    type: 'board',
    num: page ? page : 1,
    pageRange: range ? range : 10,
    no: no,
  };
  const viewPageMaker = new PostPageMaker(htmlData, req);
  viewPageMaker.addCss('posts.css');
  viewPageMaker.addCss('post.css');
  viewPageMaker.addJavascript('post.js');
  return res.send(await viewPageMaker.render());
}

export async function getUpdate(req, res) {
  const { no: id } = req.query;
  const { user } = req.session;
  const post = await postDb.findById(id);

  if (!post) {
    return res.sendStatus(404);
  }
  if (post.userId !== user.id) {
    return res.sendStatus(403);
  }
  const data = `
	<div class="update__div">
  	<h2>Update post</h2>
  	<div class="update__form">
  	  <div class="title">
  	    <label for="update__title">title </label>
  	    <input class="title__input" type="text" id="update__title" name="title" value="${post.title}" maxlength="50" required />
  	  </div>
  	  <div class="content">
  	    <label for="update__content">content </label>
  	    <textarea name="content" id="update__content" maxlength="1500" required>${post.content}</textarea>
  	  </div>
  	  <button data-id="${id}">Update</button>
  	</div>
	</div>`;
  const htmlData = {
    title: 'Update post',
    contentFile: data,
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('update.css');
  pageMaker.addJavascript('update.js');
  return res.send(await pageMaker.render());
}

export async function putUpdate(req, res) {
  const {
    body: { title, content },
    query: { no: id },
  } = req;
  const post = await postDb.findById(id);
  if (!post) {
    return res.sentDtatus(404);
  }
  if (post.userId !== req.session.user.id) {
    return res.sendStatus(403);
  }
  const update = await postDb.update(id, { title, content });
  if (!update) {
    return res.sendStatus(404);
  }

  req.flash('success', 'complete update post!');
  return res.sendStatus(200);
}

export async function remove(req, res) {
  const { no: id } = req.query;
  const { user } = req.session;
  const post = await postDb.findById(id);
  if (!post) {
    return res.sendStatus(404);
  }

  if (post.userId !== user.id) {
    return res.sendStatus(403);
  }
  await postDb.findByIdAndDelete(id);
  req.flash('success', 'complete remove post');
  return res.sendStatus(200);
}
