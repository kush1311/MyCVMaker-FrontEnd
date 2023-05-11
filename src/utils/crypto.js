const CryptoJS = require('crypto-js');

console.log(process.env);

const PRIVATE_KEY = process.env.REACT_APP_CRYPTO_PRIVATE_KEY;
console.log('PRIVATE_KEY --> ', PRIVATE_KEY);

function encrypt(text) {
  const encrypted = CryptoJS.AES.encrypt(text, PRIVATE_KEY).toString();
  return Buffer.from(encrypted).toString('base64');
}

function decrypt(encryptedData) {
  const base64DecodedString = Buffer.from(encryptedData, 'base64').toString('utf-8');
  const bytes = CryptoJS.AES.decrypt(base64DecodedString, PRIVATE_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encrypt,
  decrypt,
};
