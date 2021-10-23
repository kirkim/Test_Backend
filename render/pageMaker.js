import fs from 'fs';
import config from '../config.js';

export default class PageMaker {
  constructor(data, req) {
    this.data = data;
    this.css = '';
    this.javascript = '';
    this.footer = '';
    //this.required();
    this.req = req;
  }

  // required = () => {
  //   if (this.title === undefined || this.content === undefined) {
  //     throw new Error('title or content have to exist.');
  //   }
  // };

  readFile = (contentFile) => {
    try {
      const content = fs.readFileSync(
        config.static.url + '/html/' + contentFile,
        'utf-8'
      );
      return content;
    } catch (error) {
      throw error;
    }
  };

  printMessage = () => {
    if (this.req.session.flash) {
      const flash = this.req.flash();
      if (flash.error) {
        return `<div class="message error">${flash.error}</div>`;
      }
      if (flash.success) {
        return `<div class="message success">${flash.success}</div>`;
      }
      if (flash.info) {
        return `<div class="message info">${flash.info}</div>`;
      }
    }
    return '';
  };

  makeNav = () => {
    let loginNav = '';
    let user = '';

    if (this.req.session.loggedIn) {
      user = `<li>${this.req.session.user.name} 님</li>`;
      loginNav = this.readFile('/nav/login_nav.html');
    }
    const nav = `
			<nav>
				<ul>
						${user}
						${loginNav}
				</ul>
			</nav>
			`;
    return nav;
  };

  setContent = async (contentFile) => {
    return this.readFile(contentFile);
  };

  render = async () => {
    const title = this.data.title;
    const content = await this.setContent(this.data.contentFile);
    const nav = this.makeNav();
    let data = `
			<!DOCTYPE html>
			<html lang="en">
  		<head>
  		  <meta charset="UTF-8" />
  		  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  		  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="stylesheet" href="/css/_reset.css" />
				<link rel="stylesheet" href="/css/base.css" />
				${this.css}
  		  <title>${title}</title>
  		</head>
  		<body>
				<header>
					${nav}
				</header>
  		  ${content}
  		</body>
			<footer>
				${this.footer}
			</footer>
			<script src="/js/base.js"></script>
			${this.javascript}
			</html>`;

    const message = this.printMessage();
    return message + data;
  };

  addCss = (cssUrl) => {
    const css = `<link rel="stylesheet" href="/css/${cssUrl}" />`;
    this.css = this.css + css;
  };

  addJavascript = (jsUrl) => {
    const js = `<script src="/js/${jsUrl}"></script>`;
    this.javascript = this.javascript + js;
  };

  setFooter = (footerFile) => {
    this.footer = this.readFile(footerFile);
  };
}
