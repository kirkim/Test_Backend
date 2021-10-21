import express from 'express';
import bcrypt from 'bcrypt';
import * as userDb from '../db/userData.js';
import { PageMaker } from '../render/globalRender.js';
import { config } from '../config.js';

export function seeMe(req, res) {}
export function updateMe(req, res) {}
export function deleteMe(req, res) {}
export function getSignup(req, res) {
  const htmlData = {
    title: 'Signup',
    content: `
			<div class="signup__div">
				<h2>Sign up</h2>
				<form class="signup__form" method="POST" action="/users/signup">
					<input type="text" name="username" placeholder="Username" required />
					<input type="text" name="name" placeholder="Name" required />
					<input
						type="password"
						name="password"
						placeholder="Password"
						required
					/>
					<input
						type="password"
						name="confirmPassword"
						placeholder="Confirm password"
						required
					/>
					<input type="submit" value="SignUp" />
				</form>
    	</div>`,
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('/css/signup.css');
  return res.send(pageMaker.render());
}

export async function postSignup(req, res) {
  const { username, name, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    //req.flash('error', `Can't change password`);
    return res.redirect('/users/signup');
  }
  const exist = await userDb.findByUsername(username);
  if (exist) {
    return res.redirect('/users/signup');
  }
  await userDb.create({ username, name, password });
  console.log(await userDb.getAlluser());
  return res.redirect('/users/login');
}

export function getLogin(req, res) {
  const htmlData = {
    title: 'Login',
    content: `
			<form class="login__form" method="POST">
      	<input type="text" name="username" placeholder="Username" />
      	<input type="password" name="password" placeholder="Password" />
      	<input type="submit" value="Login" />
    	</form>
			<a href="/users/signup">&create new user &rarr;</a>`,
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('/css/login.css');
  return res.send(pageMaker.render());
}
export async function postLogin(req, res) {
  const { username, password } = req.body;
  const user = await userDb.findByUsername(username);
  if (!user) {
    return res.redirect('/users/login');
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.redirect('/users/login');
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect('/');
}

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/users/login');
};
