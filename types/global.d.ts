interface Window {
  mappls: any;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_MAPPLS_API_KEY: string;
    MAPPLS_CLIENT_ID: string;
    MAPPLS_CLIENT_SECRET: string;
    MAPPLS_ACCESS_TOKEN: string;
  }
} 