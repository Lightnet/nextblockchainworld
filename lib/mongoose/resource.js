/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

// https://thinkster.io/tutorials/node-json-api/creating-the-user-model

import crypto from 'crypto';
//Require Mongoose
import mongoose from 'mongoose';
// crypto 
import jwt from 'jsonwebtoken';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32, unixTime } from '../helper';
//var secret = require('../config').secret;

var secret = process.env.SECRET || "secret";

//Define a schema
const Schema = mongoose.Schema;

const BlankSchema = new mongoose.Schema({
  id: {
    type:String,
    //default: uuidv4
    default: nanoid32
  },
  username: String,
  email: {
    type:String,
    default:''
  },
  token: String,
  bio: {
    type:String,
    default:''
  },
  image: {
    type:String,
    default:''
  },
  groups: {
    type:String,
    default:''
  },
  access: {
    type:String,
    default:'USER'
  },
  role: {
    type:String,
    default:'USER'
  },
  isBan: {
    type:String,
    default:''
  },
  created: {
    type:Number,
    default:unixTime
  },
  hash: String, //password
  salt: String //auto gen password key
}, {timestamps: true});

// Compile model from schema
mongoose.model('Resource', BlankSchema );
//export default BlankSchema;
//var User = mongoose.model('User', UserSchema );
//export default User;

// user.validPassword(password)