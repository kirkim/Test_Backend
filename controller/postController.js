import { PageMaker } from '../render/globalRender.js';

export function getPosts(req, res) {
  const htmlData = {
    title: 'Post list',
    contentFile: 'posts.html',
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('posts.css');
  return res.send(pageMaker.render());
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
export function postUpload(req, res) {}
export function get(req, res) {}
export function update(req, res) {}
export function remove(req, res) {}
