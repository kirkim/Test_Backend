import fs from 'fs';
import config from '../config.js';

export class PageMaker {
  constructor(data, req) {
    this.title = data.title;
    this.content = this.readFile(data.contentFile);
    this.css = '';
    this.javascript = '';
    this.footer = '';
    this.required();
    this.req = req;
  }

  required = () => {
    if (this.title === undefined || this.content === undefined) {
      throw new Error('title or content have to exist.');
    }
  };

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
  render = () => {
    let data = `
			<!DOCTYPE html>
			<html lang="en">
  		<head>
  		  <meta charset="UTF-8" />
  		  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  		  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="stylesheet" href="/css/base.css" />
				${this.css}
  		  <title>${this.title}</title>
  		</head>
  		<body>
  		  ${this.content}
  		</body>
			<footer>
				${this.footer}
			</footer>
			<script src="/js/base.js"></script>
			${this.javascript}
			</html>`;
    if (this.req.session.loggedIn) {
      const logoutBtn = this.readFile('/tool/logout.html');
      data = this.req.session.user.name + '님 반갑습니다.  ' + logoutBtn + data;
    }
    return data;
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
