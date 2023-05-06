const CryptoJS = require('crypto-js');

const PRIVATE_KEY = process.env.CRYPTO_PRIVATE_KEY;

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, PRIVATE_KEY).toString();
}

function decrypt(encryptedData) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, PRIVATE_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encrypt,
  decrypt,
};
