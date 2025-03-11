#!/usr/bin/env node

/**
 * This script is used to generate a Mappls API token on server startup.
 * It can be run as part of the server startup process.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if token generation is needed
const shouldGenerateToken = () => {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) return true;
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    const tokenMatch = envContent.match(/MAPPLS_ACCESS_TOKEN=([^\n]+)/);
    
    if (!tokenMatch) return true;
    
    // Check if token expiry info exists
    const expiryMatch = envContent.match(/MAPPLS_TOKEN_EXPIRES_AT=([0-9]+)/);
    if (!expiryMatch) return true;
    
    const expiryTime = parseInt(expiryMatch[1], 10);
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Generate new token if current one expires in less than 1 hour
    return (expiryTime - currentTime) < 3600;
  } catch (error) {
    console.error('Error checking token status:', error.message);
    return true; // Generate token on error to be safe
  }
};

console.log('Starting server...');

// Only generate token if needed
if (shouldGenerateToken()) {
  console.log('Mappls API token needs to be generated or refreshed...');
  
  try {
    // Get the absolute path to the script
    const scriptPath = path.resolve(__dirname, 'generate-mappls-token.js');
    
    // Check if the file exists
    if (!fs.existsSync(scriptPath)) {
      throw new Error(`Token generation script not found at: ${scriptPath}`);
    }
    
    console.log(`Running token generation script: ${scriptPath}`);
    
    // Run the token generation script directly using require
    require('./generate-mappls-token.js');
    
    console.log('Mappls API token generated successfully.');
    
  } catch (error) {
    console.error('Error during token generation:', error.message);
    // Don't exit the process, just log the error
    console.error('Continuing with server startup despite token generation error.');
  }
} else {
  console.log('Mappls API token is still valid, skipping generation.');
} 