/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://github.com/nextauthjs/next-auth/issues/717
// https://next-auth.js.org/tutorials/securing-pages-and-api-routes
// https://next-auth.js.org/configuration/options

import { getCsrfToken } from "next-auth/react";
import db from "../../lib/database";
//var secret = process.env.SECRET || "secret";

export default async (req, res)=>{
  console.log("[[[=== SIGN IN ===]]]");

  if(req.method !== 'POST'){
    return res.status(405).json({message:'Method not allowed!'});
  }
  //delay for database setup else error not setup need work
  const csrfToken = await getCsrfToken();

  const User = db.model('User');
  
  console.log("req.body");
  console.log(req.body);
  //console.log(req.body.firstname);
  var userData = JSON.parse(req.body);

  //const user = await User.findOne({username: userData.alias}).then(function(user){
    const user = await User.findOne({username: userData.alias}).exec();
    console.log("user");
    //console.log(user);
    if(userData.isNewUser){
      if(!user){
        console.log("[newUser] NOT FOUND, creating...")
        //create user
        let newUser = new User({username: userData.alias})
        newUser.setPassword(userData.passphrase);
        try{
        let saveUser = await newUser.save();
          //if (err) return handleError(err);
          // saved!
          console.log("save user");
          return res.json(saveUser.toAuthJSON());
        }catch(e){
          return res.json({error:"FAIL"});
        }
      }else{
        console.log("[newUser] Exist");
        return res.json({error:"EXIST"});
      }
    }else{
      if(!user){
        console.log("[login] NOT FOUND")
        return res.json({error:"NOTFOUND"});
        //create user
      }else{
        console.log("[login] Exist");
        if(user.validPassword(userData.passphrase)){
          //user.toAuthJSON();
          console.log("[login] password pass!");
          return res.json(user.toAuthJSON());
        }else{
          console.log("[login] password fail!");
          return res.json({error:"PASSWORDFAIL"});
        }
      }
    }
  //});

  //res.json({id: 1, name: 'J Smith', email: 'jsmith@example.com'});
  console.log("[[[=== UNKNOWN LOGIN FAIL ===]]]")
  return res.json({error:"NOTFOUND"});
};