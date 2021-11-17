https://www.tutorialspoint.com/crypto-generatekeypairsync-method-in-node-js

https://attacomsian.com/blog/nodejs-encrypt-decrypt-data

https://www.pabbly.com/tutorials/crypto-in-node-js/

https://livecodestream.dev/post/beginners-guide-to-data-encryption-with-nodejs/

https://www.tutorialspoint.com/encrypt-and-decrypt-data-in-nodejs


```js
const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
function encrypt(text) {
   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// Decrypting text
function decrypt(text) {
   let iv = Buffer.from(text.iv, 'hex');
   let encryptedText = Buffer.from(text.encryptedData, 'hex');
   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedText);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}

// Text send to encrypt function
var hw = encrypt("Welcome to Tutorials Point...")
console.log(hw)
console.log(decrypt(hw))
```





