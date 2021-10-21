import { PageMaker } from '../render/globalRender.js';

export function home(req, res) {
  const htmlData = {
    title: `Home!`,
    content: `
		<div class="home__url">
			<a href="/users/login">Login&rarr;</a><br>
			<a href="/posts">Post page&rarr;</a>
		</div>`,
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('/css/home.css');
  return res.send(pageMaker.render());
}
