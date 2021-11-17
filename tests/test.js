const crypto = require("crypto");


const keypair = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

//console.log(keypair.privateKey.toString('base64'));
//console.log(keypair.publicKey);
//console.log(keypair.publicKey.toString('base64'));
//console.log(keypair);


// https://attacomsian.com/blog/nodejs-encrypt-decrypt-data
// https://www.section.io/engineering-education/data-encryption-and-decryption-in-node-js-using-crypto/
/*
const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);


const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
  return decrpyted.toString();
};


const hash = encrypt('Hello World!');
console.log(hash);

const text = decrypt(hash);
console.log(text); // Hello World!
*/
/*
const algorithm = "aes-256-cbc"; 
// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);
// protected data
const message = "This is a secret message as";
// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);
// the cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
// encrypt the message
// input encoding
// output encoding
let encryptedData = cipher.update(message, "utf-8", "hex");
//console.log(encryptedData)
encryptedData += cipher.final("hex");
console.log("Encrypted message: " + encryptedData);

// the decipher function
const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
console.log(decryptedData)
decryptedData += decipher.final("utf8");
console.log("Decrypted message: " + decryptedData);
*/

/*
const hash = text => {
  const hash = crypto.createHash('sha256');
  hash.on('readable', () => {
    const data = hash.read();
    if (data) {
      console.log(data.toString('hex'));
    }
  });
  hash.write(text);
  hash.end();
}
hash("testasdasd asd asd asd asd asd asdas ");
*/

/*
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
let iv = crypto.randomBytes(16); 
console.log(key)

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
*/
/*
const algorithm = 'aes-256-ctr';
const Securitykey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const initVector = crypto.randomBytes(16);

console.log(initVector);

function encrypt(text){
  //const initVector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  let encryptedData = cipher.update(text, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
}

function decrypt(text){
  //const initVector = crypto.randomBytes(16);
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  let decryptedData = decipher.update(text, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

var hw = encrypt("Welcome to Tutorials Point...")
console.log(hw)

console.log(decrypt(hw))
*/

