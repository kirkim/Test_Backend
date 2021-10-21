export class PageMaker {
  constructor(htmlData, req) {
    this.title = htmlData.title;
    this.content = htmlData.content;
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

  render = () => {
    let data = `
			<!DOCTYPE html>
			<html lang="en">
  		<head>
  		  <meta charset="UTF-8" />
  		  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  		  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
				${this.css}
  		  <title>${this.title}</title>
  		</head>
  		<body>
  		  ${this.content}
  		</body>
			<footer>
				${this.footer}
			</footer>
			${this.javascript}
			</html>`;
    if (this.req.session.loggedIn) {
      data = this.req.session.user.name + '님 반갑습니다.' + data;
    }
    return data;
  };

  addCss = (cssUrl) => {
    const css = `<link rel="stylesheet" href="${cssUrl}" />`;
    this.css = this.css + css;
  };

  addJavascript = (jsUrl) => {
    const js = `<script src="${jsUrl}"></script>`;
    this.javascript = this.javascript + js;
  };

  setFooter = (footer) => {
    this.footer = footer;
  };
}
