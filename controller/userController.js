import express from 'express';
import bcrypt from 'bcrypt';
import * as userDb from '../db/userData.js';
import PageMaker from '../render/pageMaker.js';
import * as postDb from '../db/postData.js';

export async function seeMe(req, res) {
  const userId = req.params.id;
  const user = await userDb.findById(userId);
  const posts = await postDb.findByUserId(user.id);
  console.log(posts);
  let postData = '';

  for (let post of posts) {
    postData =
      postData +
      `<li><a href="/posts/post/${post.id}">${
        post.title
      }</a> ${post.createdAt.toLocaleString()}</li>`;
  }

  const data = `
		<div class="profile">
			<div class="profile__username">${user.username}</div>
			<div class="profile__name">${user.name}</div>
			<div class="profile__postlist">
				<h2>작성글</h2>
				<ul>
					${postData}
				</ul>
			</div>
		</div>`;

  const htmlData = {
    title: 'Profile',
    contentFile: data,
  };

  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('profile.css');
  return res.send(await pageMaker.render());
}
export function updateMe(req, res) {}
export function deleteMe(req, res) {}

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
  return res.redirect('/posts');
}

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/users/login');
};
