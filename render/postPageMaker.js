import PageMaker from './pageMaker.js';
import * as userDb from '../db/userData.js';

export default class PostPageMaker extends PageMaker {
  constructor(data, req) {
    super(data, req);
    this.posts = data.posts;
    this.pageRange = data.pageRange;
    this.type = data.type;
    this.pagebarRange = 10;
    this.page = {
      currentNum: data.num ? data.num : 1,
      maxNum: Math.ceil(data.posts.length / this.pageRange),
    };
  }

  formatList = async (post, nb) => {
    const title = `<div class="${this.type}__title"><a href="/posts/post/${post.id}">${post.title}</a></div>`;
    let user = await userDb.findById(post.userId);
    if (!user) {
      user = {
        name: 'none',
        id: '', // 삭제된 유저 아이디 루트 넣기
      };
    }
    const num = `<div class="${this.type}__num">${nb}</div>`;
    const auth = `<div class="${this.type}__auth"><a href="/users/${user.id}">${user.name}</a></div>`;
    const date = `
		<div class="${this.type}__date">
			${post.createdAt.toLocaleString()}
		</div>`;
    const view = `<div class="${this.type}__set">${num}${title}${auth}${date}</div>`;
    return view;
  };

  makePagebar = () => {
    let data = '';
    let firstPage = '';
    let lastPage = '';
    const tool = (this.page.currentNum - 1) % this.pagebarRange;
    let x = this.page.currentNum - tool;
    if (x > this.pagebarRange) {
      firstPage = `
			<a href="/posts/1">[1]</a> ...
			<a href="/posts/${x - 1}">◀︎ </a>`;
    }
    if (this.page.maxNum >= x + this.pagebarRange) {
      lastPage = `...<a href="/posts/${this.page.maxNum}">[${this.page.maxNum}]</a>`;
    }

    for (let i = x; i <= x + this.pagebarRange; i++) {
      if (i > this.page.maxNum) {
        break;
      } else if (i >= x + this.pagebarRange) {
        data = data + `<a href="/posts/${i}"> ▶︎</a>`;
        break;
      }

      if (i === parseInt(this.page.currentNum)) {
        data =
          data +
          `<a href="/posts/${i}"><b style="font-size:20px">[${i}]</b></a>`;
      } else {
        data = data + `<a href="/posts/${i}">[${i}]</a>`;
      }
    }

    return firstPage + data + lastPage;
  };

  makeBoardNav = () => {
    let data = '';
    data = `
		<div class="uploadBtn">
			<a href="/posts/upload">글쓰기</a>
		</div>`;

    return data;
  };

  //@OverRide
  setContent = async () => {
    let data = '';
    const base = `
		<div class="${this.type}__main__set">
		<div class="${this.type}__main__num">Num</div>
			<div class="${this.type}__main__title">제목</div>
			<div class="${this.type}__main__auth">글쓴이</div>
			<div class="${this.type}__main__date">작성일</div>
		</div>`;

    let i = 0;
    const range = this.page.currentNum * this.pageRange;
    for (let post of this.posts) {
      i++;
      if (i <= range - this.pageRange) {
        continue;
      }
      if (i > range) {
        break;
      }
      const view = await this.formatList(post, i);
      data = data + view;
    }
    const boardNav = `<div class="${
      this.type
    }__nav">${this.makeBoardNav()}</div>`;
    const pagebar = `<div class="${
      this.type
    }__pagebar">${this.makePagebar()}</div>`;

    return `<div class="${this.type}">${base}${data}${boardNav}${pagebar}</div>`;
  };
}
