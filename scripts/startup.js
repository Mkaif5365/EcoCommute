#!/usr/bin/env node

/**
 * This script is used to generate a Mappls API token on server startup.
 * It can be run as part of the server startup process.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Starting server with Mappls API token generation...');

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
  console.log('Starting the server...');
  
} catch (error) {
  console.error('Error during startup:', error.message);
  // Don't exit the process, just log the error
  console.error('Continuing with server startup despite token generation error.');
} 