import { PageMaker } from '../render/globalRender.js';

export function getPosts(req, res) {
  const htmlData = {
    title: `Post list`,
    content: ``,
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('/css/home.css');
  return res.send(pageMaker.render());
}
export function getCreate(req, res) {
  const htmlData = {
    title: `Post list`,
    content: `
		`,
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('/css/home.css');
  return res.send(pageMaker.render());
}
export function postCreate(req, res) {}
export function get(req, res) {}
export function update(req, res) {}
export function remove(req, res) {}
