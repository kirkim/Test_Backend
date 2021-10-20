import express from 'express';
import bcrypt from 'bcrypt';
import * as userDb from '../db/userData.js';
import path from 'path';

export function seeMe(req, res) {}
export function updateMe(req, res) {}
export function deleteMe(req, res) {}
export function getCreate(req, res) {
  return res.sendFile(path.resolve() + '/static/html/signup.html');
}
export function postCreate(req, res) {
  const { username, name, password, confirmPassword } = req.body;
  userDb.create({ username, name, password, confirmPassword });
  return res.redirec('/users/login');
}
export function getLogin(req, res) {
  return res.sendFile(path.resolve() + '/static/html/login.html');
}
export function postLogin(req, res) {}
