import bcrypt from 'bcrypt';
import * as userDb from '../db/userData.js';
import PageMaker from '../render/pageMaker.js';
import * as postDb from '../db/postData.js';

export async function seeMe(req, res) {
  const userId = req.params.id;
  const user = await userDb.findById(userId);
  const posts = await postDb.findByUserId(user.id);
  let postData = '';

  for (let post of posts) {
    postData =
      postData +
      `<li><a href="/posts/view?no=${post.id}">${
        post.title
      }</a> ${post.createdAt.toLocaleString()}</li>`;
  }

  let edit = '';
  if (req.session.user.id === userId) {
    edit = `
		<nav class="profile__nav">
			<span class="profile__edit"><a href="/users/update/${userId}">프로필 편집</a></span>
			<span class="profile__delete" id="deleteBtn" data-id="${userId}">아이디 삭제</span>
		</nav>`;
  }
  const data = `
		<div class="profile">
			<h2>Profile</h2>
			<div class="profile__username">유저아이디: <b>${user.username}</b></div>
			<div class="profile__name">이름: <b>${user.name}</b></div>
			${edit}
		</div>
		<div class="profile__postlist">
			<h2>작성글</h2>
			<ul>
				${postData}
			</ul>
		</div>`;

  const htmlData = {
    title: 'Profile',
    contentFile: data,
  };

  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('profile.css');
  pageMaker.addJavascript('profile.js');
  return res.send(await pageMaker.render());
}

export async function getUpdateMe(req, res) {
  const { id } = req.params;
  const user = await userDb.findById(id);
  const message = req.query.msg ? req.query.msg : '';
  const data = `
	<div class="edit__profile">
		<h1>Edit profile</h1>
		<span class="message error">${message}</span>
		<form class="edit__form" id="edit__form" data-id="${id}">
			<input
    	  type="text"
    	  id="username"
    	  value="${user.username}"
    	  maxlength="16"
    	  required
    	/>
    	<input type="text" id="name" value="${user.name}" maxlength="16" required />
    	<input
    	  type="password"
    	  id="password"
    	  placeholder="Password"
    	  maxlength="16"
    	/>
    	<input
    	  type="password"
    	  id="confirmPassword"
    	  placeholder="Confirm password"
    	  maxlength="16"
    	/>
			<input type="submit" value="edit"/>
		</form>
	</div>`;
  const htmlData = {
    title: 'Edit profile',
    contentFile: data,
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('editProfile.css');
  pageMaker.addJavascript('editProfile.js');
  return res.send(await pageMaker.render());
}

export async function updateMe(req, res) {
  const { id } = req.params;
  const user = await userDb.findById(id);
  const { username, name, password, confirmPassword } = req.body;

  if (req.session.user.id !== user.id) {
    return res.sendStatus(403);
  }
  if (password || confirmPassword) {
    if (password !== confirmPassword) {
      req.flash('error', 'wrong password');
      return res.sendStatus(400);
    } else {
      await userDb.updatePassword(id, password);
    }
  }
  await userDb.updateProfile(id, { username, name });
  return res.sendStatus(200);
}

export async function deleteMe(req, res) {
  const { id } = req.params;
  const user = await userDb.findById(id);
  if (!user) {
    return res.sendStatus(400);
  }
  if (user.id !== req.session.user.id) {
    return res.sendStatus(403);
  }
  await userDb.findByIdAndDelete(id);
  req.session.destroy();
  return res.sendStatus(200);
}

export async function getSignup(req, res) {
  const htmlData = {
    title: 'Signup',
    contentFile: 'signup.html',
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('signup.css');
  return res.send(await pageMaker.render());
}

export async function postSignup(req, res) {
  const { username, name, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    req.flash('error', `Can't change password`);
    return res.redirect('/users/signup');
  }
  const exist = await userDb.findByUsername(username);
  if (exist) {
    req.flash('error', `username is already exists!`);
    return res.redirect('/users/signup');
  }
  await userDb.create({ username, name, password });
  req.flash('success', `Complete new user creation!`);
  return res.redirect('/users/login');
}

export async function getLogin(req, res) {
  const htmlData = {
    title: 'Login',
    contentFile: 'login.html',
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('login.css');
  return res.send(await pageMaker.render());
}

export async function postLogin(req, res) {
  const { username, password } = req.body;
  const user = await userDb.findByUsername(username);
  if (!user) {
    req.flash('error', `username or password is wrong!`);
    return res.redirect('/users/login');
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    req.flash('error', `username or password is wrong!`);
    return res.redirect('/users/login');
  }
  req.session.loggedIn = true;
  req.session.user = user;
  req.flash('success', `Welcome ${user.name}!`);
  return res.redirect('/posts/list');
}

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/users/login');
};
