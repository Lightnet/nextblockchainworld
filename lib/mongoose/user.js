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

const UserSchema = new mongoose.Schema({
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

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    id: this._id,
    name: this.username,
    exp: parseInt(exp.getTime() / 1000),
    }, secret);
}

UserSchema.methods.toAuthJSON = function(){
  return {
    name: this.username
    //, email: this.email
    , token: this.generateJWT()
    //, bio: this.bio
    //, image: this.image
  };
}

UserSchema.methods.checkToken = function(token){
  // invalid token - synchronous
  try {
    //var decoded = jwt.verify(token, 'wrong-secret');//check fail
    var decoded = jwt.verify(token, secret);
    if(decoded){
      return true;
    }else{
      return false;
    }

  } catch(err) {
    // err
    return false;
  }
}

// Compile model from schema
mongoose.model('User', UserSchema );
//export default UserSchema;
//var User = mongoose.model('User', UserSchema );
//export default User;

// user.validPassword(password)