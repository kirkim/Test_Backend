import express from 'express';
import bcrypt from 'bcrypt';
import * as userDb from '../db/userData.js';

export function seeMe(req, res) {}
export function updateMe(req, res) {}
export function deleteMe(req, res) {}
export function getCreate(req, res) {
  console.log('here!');
  return res.end();
}
export function postCreate(req, res) {}
export function getLogin(req, res) {}
export function postLogin(req, res) {}
