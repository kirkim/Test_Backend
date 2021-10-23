import PageMaker from './pageMaker.js';

export default class CustomPageMaker extends PageMaker {
  constructor(data, req) {
    super(data, req);
  }

  //@OverRide
  setContent = (contentFile) => {
    return contentFile;
  };
}
