import express from 'express';
import bcrypt from 'bcrypt';
import * as userDb from '../db/userData.js';
import { PageMaker } from '../render/globalRender.js';

export function seeMe(req, res) {}
export function updateMe(req, res) {}
export function deleteMe(req, res) {}

export function getSignup(req, res) {
  const htmlData = {
    title: 'Signup',
    contentFile: 'signup.html',
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('signup.css');
  return res.send(pageMaker.render());
}

export async function postSignup(req, res) {
  const { username, name, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    req.flash('error', `Can't change password`);
    return res.redirect('/users/signup');
  }
  const exist = await userDb.findByUsername(username);
  if (exist) {
    return res.redirect('/users/signup');
  }
  await userDb.create({ username, name, password });
  return res.redirect('/users/login');
}

export function getLogin(req, res) {
  const htmlData = {
    title: 'Login',
    contentFile: 'login.html',
  };
  const pageMaker = new PageMaker(htmlData, req);
  pageMaker.addCss('login.css');
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
  req.flash('success', `Welcome ${user.name}!`);
  return res.redirect('/posts');
}

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/users/login');
};
