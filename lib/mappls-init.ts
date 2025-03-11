"use client";

import MapplsApiClient from '@/components/mappls-api-client';

/**
 * Initialize the Mappls API client with credentials and token
 */
export async function initMapplsApi(): Promise<MapplsApiClient> {
  const apiClient = MapplsApiClient.getInstance();
  
  // Set API key from environment variable
  if (process.env.NEXT_PUBLIC_MAPPLS_API_KEY) {
    apiClient.setApiKey(process.env.NEXT_PUBLIC_MAPPLS_API_KEY);
  }
  
  // Set client credentials if available
  if (process.env.MAPPLS_CLIENT_ID && process.env.MAPPLS_CLIENT_SECRET) {
    apiClient.setClientCredentials(
      process.env.MAPPLS_CLIENT_ID,
      process.env.MAPPLS_CLIENT_SECRET
    );
  }
  
  // Set access token if available
  if (process.env.MAPPLS_ACCESS_TOKEN) {
    apiClient.setAccessToken(process.env.MAPPLS_ACCESS_TOKEN);
  } else if (process.env.MAPPLS_CLIENT_ID && process.env.MAPPLS_CLIENT_SECRET) {
    // Generate new token if credentials are available but no token
    try {
      await apiClient.generateToken();
    } catch (error) {
      console.error('Failed to generate Mappls API token:', error);
    }
  }
  
  return apiClient;
}

export default initMapplsApi; 