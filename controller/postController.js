import PageMaker from '../render/pageMaker.js';
import PostPageMaker from '../render/postPageMaker.js';
import * as postDb from '../db/postData.js';

export async function getPosts(req, res) {
  const posts = await postDb.getAllPosts();
  const htmlData = {
    title: 'Post list',
    posts: posts,
  };
  const postPageMaker = new PostPageMaker(htmlData, req);
  postPageMaker.addCss('posts.css');
  return res.send(postPageMaker.render());
}

export function getUpload(req, res) {
  const htmlData = {
    title: 'Create post',
    contentFile: 'upload.html',
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('upload.css');
  return res.send(pageMaker.render());
}

export async function postUpload(req, res) {
  const { title, content } = req.body;
  const userId = req.session.user;
  await postDb.create({ title, content, userId });
  req.flash('success', `Add new post!`);
  return res.redirect('/posts');
}

export function get(req, res) {}

export function update(req, res) {}
export function remove(req, res) {}
