"use client";

import axios from 'axios';

/**
 * Mappls API Client
 * 
 * This class provides methods to interact with Mappls APIs.
 * It has the capability to make API calls using tokens.
 */
export class MapplsApiClient {
  private static instance: MapplsApiClient;
  private accessToken: string | null = null;
  private apiKey: string | null = null;
  private clientId: string | null = null;
  private clientSecret: string | null = null;

  private constructor() {
    // Private constructor for singleton pattern
    if (typeof window !== 'undefined') {
      this.apiKey = process.env.NEXT_PUBLIC_MAPPLS_API_KEY || null;
      
      // For server-side token generation
      if (typeof process !== 'undefined' && process.env) {
        this.clientId = process.env.MAPPLS_CLIENT_ID || null;
        this.clientSecret = process.env.MAPPLS_CLIENT_SECRET || null;
        this.accessToken = process.env.MAPPLS_ACCESS_TOKEN || null;
      }
    }
  }

  /**
   * Get instance of MapplsApiClient
   */
  public static getInstance(): MapplsApiClient {
    if (!MapplsApiClient.instance) {
      MapplsApiClient.instance = new MapplsApiClient();
    }
    return MapplsApiClient.instance;
  }

  /**
   * Set access token
   */
  public setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Set API key
   */
  public setApiKey(key: string): void {
    this.apiKey = key;
  }

  /**
   * Set client credentials
   */
  public setClientCredentials(clientId: string, clientSecret: string): void {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Get access token
   */
  public getAccessToken(): string | null {
    return this.accessToken;
  }

  /**
   * Get API key
   */
  public getApiKey(): string | null {
    return this.apiKey;
  }

  /**
   * Make authorized API call to Mappls API
   */
  public async callApi(endpoint: string, method: 'GET' | 'POST' = 'GET', data?: any): Promise<any> {
    if (!this.accessToken) {
      // Try to generate token if credentials are available
      if (this.clientId && this.clientSecret) {
        await this.generateToken();
      } else {
        throw new Error('Access token is not set and client credentials are not available');
      }
    }

    try {
      const response = await axios({
        method,
        url: `https://apis.mappls.com/api/${endpoint}`,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'User-Agent': 'new2'
        },
        data: method === 'POST' ? data : undefined,
        params: method === 'GET' ? data : undefined
      });

      return response.data;
    } catch (error: any) {
      // If token expired (401), try to regenerate and retry once
      if (error.response && error.response.status === 401 && this.clientId && this.clientSecret) {
        await this.generateToken();
        return this.callApi(endpoint, method, data);
      }
      
      console.error('Error calling Mappls API:', error);
      throw error;
    }
  }

  /**
   * Generate new access token for Mappls API
   */
  public async generateToken(clientId?: string, clientSecret?: string): Promise<string> {
    try {
      const url = 'https://outpost.mappls.com/api/security/oauth/token';
      
      const cId = clientId || this.clientId;
      const cSecret = clientSecret || this.clientSecret;
      
      if (!cId || !cSecret) {
        throw new Error('Client ID and Client Secret are required to generate token');
      }
      
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', cId);
      params.append('client_secret', cSecret);
      
      const response = await axios.post(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
          'User-Agent': 'new2'
        }
      });
      
      if (response.data && response.data.access_token) {
        this.accessToken = response.data.access_token;
        return response.data.access_token;
      } else {
        throw new Error('Failed to generate token: No access_token in response');
      }
    } catch (error) {
      console.error('Error generating Mappls API token:', error);
      throw error;
    }
  }
}

export default MapplsApiClient; 