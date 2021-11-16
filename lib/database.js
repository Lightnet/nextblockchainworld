/*
  LICENSE: MIT
  Created by: Lightnet  
*/

/*
  Information:
    To keep the setup simple.
  mongodb
*/
// https://next-auth.js.org/adapters/mongodb

//Import the mongoose module
import mongoose from 'mongoose';

//Set up default mongoose connection
//var mongoDB = 'mongodb://127.0.0.1/my_database';
var mongoDB = process.env.DATABASE_URL || 'mongodb://127.0.0.1/rpg';

var db;
if(!db){
  db = global.db;
}
//console.log(db);
if(!db){
  console.log("init DB")
  mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
  //Get the default connection
  db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', err => {
    console.log(`DB connected`);
  })
  db.on('connected', () => {
    console.log('connected to mongodb');
  });
  db.on('disconnected', () => {
    console.log('connection disconnected');
  });
  require('./mongoose/user');
  global.db = db;
}else{
  console.log("REUSE DB")
}

export default db;





export async function sessionTokenCheck(session){
  return new Promise( async (resolve, reject) => {
    if(session){
      if(!session.user.name){
        resolve({error:"FAIL",userid:null,username:null});
      }
      if(!session.user.token){
        resolve({error:"FAIL",userid:null,username:null});
      }

      if(session.user.token){
        const User = db.model('User');
        const user = await User.findOne({username: session.user.name}).exec();
        if(typeof session.user.token == "string"){
          //console.log("STRING DATA...");
          if(user){
            //console.log("FOUND???");
            let bcheck = user.checkToken(session.user.token);
            //console.log("TOKEN: ", bcheck);
            //console.log(user);
            if(bcheck){
              // pass
              resolve({error:null,userid:user.id,username:user.username});
            }else{
              resolve({error:"FAIL",userid:null,username:null});
            }
          }else{
            resolve({error:"FAIL",userid:null,username:null});
          }
        }
      }
    }else{
      resolve({error:"FAIL",userid:null,username:null});
    }
  });
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
export async function testCall(){
  return new Promise((resolve, reject) => {
    //setTimeout(() => {
      resolve( {error:"test" ,user:null});
    //}, 300);
  });
}