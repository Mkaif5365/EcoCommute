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

// Client credentials from environment variables or command line arguments
const clientId = process.env.MAPPLS_CLIENT_ID || process.argv[2] || '96dHZVzsAusBQM027ImnJ2wLI4EizOFdSli_U45Q94Ec8q-NIi7wyN8THLsSNKCpVJEu_YcrZeKZsIVW0-2t1A==';
const clientSecret = process.env.MAPPLS_CLIENT_SECRET || process.argv[3] || 'lrFxI-iSEg8ce_URaq06Se05F1e4rFsK8JXORR3i34L26hz26nSOl374JztsjaVls82-1mV2MAcMhavu1wSZHdVRgz27mWRU';
const defaultKey = process.env.NEXT_PUBLIC_MAPPLS_API_KEY || process.argv[4] || 'a6f5b905587a2e6ff31e4127f881783f';

console.log(`Project root directory: ${rootDir}`);
console.log(`Environment file path: ${envPath}`);

// Function to generate Mappls API token
async function generateMapplsToken() {
  try {
    console.log('Generating Mappls API token...');
    console.log(`Using client ID: ${clientId.substring(0, 10)}...`);
    
    const url = 'https://outpost.mappls.com/api/security/oauth/token';
    
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    
    const response = await axios.post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json',
        'User-Agent': 'new2'
      }
    });
    
    if (response.data && response.data.access_token) {
      console.log('Token generated successfully!');
      
      // Check if .env file exists
      if (!fs.existsSync(envPath)) {
        console.log('.env file not found, creating new one');
        fs.writeFileSync(envPath, '# Environment variables for Mappls API\n');
      }
      
      // Read .env file
      let envContent = fs.readFileSync(envPath, 'utf8');
      
      // Check if NEXT_PUBLIC_MAPPLS_API_KEY already exists in .env
      if (envContent.includes('NEXT_PUBLIC_MAPPLS_API_KEY=')) {
        // Replace existing key
        envContent = envContent.replace(
          /NEXT_PUBLIC_MAPPLS_API_KEY=.*/,
          `NEXT_PUBLIC_MAPPLS_API_KEY=${defaultKey}`
        );
      } else {
        // Add new key
        envContent += `\nNEXT_PUBLIC_MAPPLS_API_KEY=${defaultKey}`;
      }
      
      // Check if MAPPLS_CLIENT_ID already exists in .env
      if (!envContent.includes('MAPPLS_CLIENT_ID=')) {
        envContent += `\nMAPPLS_CLIENT_ID=${clientId}`;
      }
      
      // Check if MAPPLS_CLIENT_SECRET already exists in .env
      if (!envContent.includes('MAPPLS_CLIENT_SECRET=')) {
        envContent += `\nMAPPLS_CLIENT_SECRET=${clientSecret}`;
      }
      
      // Check if MAPPLS_ACCESS_TOKEN already exists in .env
      if (envContent.includes('MAPPLS_ACCESS_TOKEN=')) {
        // Replace existing token
        envContent = envContent.replace(
          /MAPPLS_ACCESS_TOKEN=.*/,
          `MAPPLS_ACCESS_TOKEN=${response.data.access_token}`
        );
      } else {
        // Add new token
        envContent += `\nMAPPLS_ACCESS_TOKEN=${response.data.access_token}`;
      }
      
      // Write updated content back to .env file
      fs.writeFileSync(envPath, envContent);
      
      console.log('Environment variables updated successfully!');
      console.log(`Access Token: ${response.data.access_token}`);
      console.log(`Token expires in: ${response.data.expires_in} seconds`);
      
      return response.data;
    } else {
      throw new Error('Failed to generate token: No access_token in response');
    }
  } catch (error) {
    console.error('Error generating Mappls API token:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    throw error;
  }
}

// Execute the function
generateMapplsToken()
  .then(() => {
    console.log('Token generation process completed.');
  })
  .catch((error) => {
    console.error('Token generation failed:', error.message);
    // Don't exit with error code, just log the error
    console.error('Continuing despite token generation failure.');
  }); 