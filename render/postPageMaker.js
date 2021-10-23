import PageMaker from './pageMaker.js';

export default class PostPageMaker extends PageMaker {
  constructor(data, req) {
    super(data, req);
    this.posts = data.posts;
  }

  //@OverRide
  setContent = () => {
    let data = '';
    this.posts.forEach((element) => {
      data = data + `<a href="/posts/${element.id}">${element.title}</a><br>`;
    });
    return data;
  };
}
