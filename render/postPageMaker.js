import PageMaker from './pageMaker.js';
import * as userDb from '../db/userData.js';

export default class PostPageMaker extends PageMaker {
  constructor(data, req) {
    super(data, req);
    this.posts = data.posts;
    this.pageRange = 10;
    this.pagebarRange = 10;
    this.page = {
      currentNum: data.num ? data.num : 1,
      maxNum: Math.ceil(data.posts.length / this.pageRange),
    };
  }

  formatList = async (post, nb) => {
    const title = `<div class="board__title"><a href="/posts/post/${post.id}">${post.title}</a></div>`;
    let user = await userDb.findById(post.userId);
    if (!user) {
      user = {
        name: 'none',
        id: '', // 삭제된 유저 아이디 루트 넣기
      };
    }
    const num = `<div class="board__num">${nb}</div>`;
    const auth = `<div class="board__auth"><a href="/users/${user.id}">${user.name}</a></div>`;
    const date = `<div class="board__date">${post.createdAt.toLocaleString()}</div>`;
    const view = `<div class="board__set">${num}${title}${auth}${date}</div>`;
    return view;
  };

  makePagebar = () => {
    let data = '';
    let firstPage = '';
    let lastPage = '';
    const tool = (this.page.currentNum - 1) % this.pagebarRange;
    let x = this.page.currentNum - tool;
    if (x > this.pagebarRange) {
      firstPage = `<a href="/posts/1">[1]</a>...`;
    }
    if (this.page.maxNum >= x + this.pagebarRange) {
      lastPage = `...<a href="/posts/${this.page.maxNum}">[${this.page.maxNum}]</a>`;
    }

    for (let i = x; i <= x + this.pagebarRange; i++) {
      if (i >= x + this.pagebarRange || i > this.page.maxNum) {
        break;
      }
      console.log(i, this.page.currentNum);
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

  //@OverRide
  setContent = async () => {
    let data = '';
    const base = `
		<div class="main__set">
		<div class="main__num">Num</div>
			<div class="main__title">제목</div>
			<div class="main__auth">글쓴이</div>
			<div class="main__date">작성일</div>
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
    const pagebar = `<div class="pagebar">${this.makePagebar()}</div>`;

    return `<div class="board">${base}${data}${pagebar}</div>`;
  };
}
