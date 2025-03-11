const axios = require('axios');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Find the root directory of the project
const findRootDir = () => {
  let currentDir = __dirname;
  while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      throw new Error('Could not find project root directory');
    }
    currentDir = parentDir;
  }
  return currentDir;
};

const rootDir = findRootDir();
const envPath = path.join(rootDir, '.env');

// Load environment variables
dotenv.config({ path: envPath });

console.log(`Project root directory: ${rootDir}`);
console.log(`Environment file path: ${envPath}`);

// Get API key and token
const apiKey = process.env.NEXT_PUBLIC_MAPPLS_API_KEY;
const accessToken = process.env.MAPPLS_ACCESS_TOKEN;

console.log(`API Key: ${apiKey}`);
console.log(`Access Token: ${accessToken ? accessToken.substring(0, 10) + '...' : 'Not found'}`);

// Test the API key by making a simple request
async function testApiKey() {
  try {
    console.log('Testing Mappls API key...');
    
    // Test the API key by checking if the SDK URL is accessible
    const sdkUrl = `https://apis.mappls.com/advancedmaps/api/${apiKey}/map_sdk?v=3.0&layer=vector`;
    
    console.log(`Testing SDK URL: ${sdkUrl}`);
    
    const response = await axios.head(sdkUrl);
    
    console.log('SDK URL is accessible!');
    console.log(`Status: ${response.status}`);
    
    return true;
  } catch (error) {
    console.error('Error testing Mappls API key:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
    }
    return false;
  }
}

// Test the access token by making an authenticated request
async function testAccessToken() {
  if (!accessToken) {
    console.error('Access token not found in environment variables');
    return false;
  }
  
  try {
    console.log('Testing Mappls access token...');
    
    // Test the access token by making a simple request to the API
    // Try a different endpoint
    const response = await axios.get('https://apis.mappls.com/api/places/textsearch/json', {
      params: {
        query: 'coffee',
        region: 'IND'
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'new2'
      }
    });
    
    console.log('Access token is valid!');
    console.log(`Status: ${response.status}`);
    console.log('Sample response data:', JSON.stringify(response.data).substring(0, 200) + '...');
    
    return true;
  } catch (error) {
    console.error('Error testing Mappls access token:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return false;
  }
}

// Run the tests
async function runTests() {
  const apiKeyValid = await testApiKey();
  const accessTokenValid = await testAccessToken();
  
  console.log('\nTest Results:');
  console.log(`API Key Valid: ${apiKeyValid ? 'Yes' : 'No'}`);
  console.log(`Access Token Valid: ${accessTokenValid ? 'Yes' : 'No'}`);
  
  if (!apiKeyValid) {
    console.log('\nRecommendation: Your API key may be invalid or expired. Please check your API key and try again.');
  }
  
  if (!accessTokenValid) {
    console.log('\nRecommendation: Your access token may be invalid or expired. Try generating a new token with:');
    console.log('npm run generate-mappls-token');
  }
}

runTests().catch(error => {
  console.error('Error running tests:', error);
}); 