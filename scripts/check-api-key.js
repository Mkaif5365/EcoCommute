const https = require('https');

const apiKey = 'a6f5b905587a2e6ff31e4127f881783f';
const url = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk?v=3.0&layer=vector`;

console.log(`Testing API key: ${apiKey}`);
console.log(`URL: ${url}`);

https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  
  if (res.statusCode === 200) {
    console.log('API key is valid!');
  } else {
    console.log('API key may not be valid.');
  }
  
  res.on('data', (chunk) => {
    // Just to consume the data
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
}); 