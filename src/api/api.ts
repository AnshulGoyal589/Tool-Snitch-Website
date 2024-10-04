// import axios from 'axios';

// export const api = axios.create({
//   // baseURL: 'https://toolsnitch.ninja',
//   baseURL: 'http://localhost:8000',
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });
 

import axios from 'axios';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getCognitoToken = async (): Promise<string | null> => {
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
  });
  
  const currentUser = userPool.getCurrentUser();
  
  if (!currentUser) {
    return null;
  }

  return new Promise((resolve, reject) => {
    currentUser.getSession((err: any, session: any) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (session.isValid()) {
        resolve(session.getIdToken().getJwtToken());
      } else {
        resolve(null);
      }
    });
  });
};

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getCognitoToken();
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    } catch (error) {
      console.error('Error getting authentication token:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login'; 
      }
    }
    return Promise.reject(error);
  }
);

export const getCognitoId = async (): Promise<string | null> => {
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
  });
  
  const currentUser = userPool.getCurrentUser();
  
  if (!currentUser) {
    return null;
  }

  return new Promise((resolve, reject) => {
    currentUser.getSession((err: any, session: any) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (session.isValid()) {
        const payload = session.getIdToken().payload;
        resolve(payload.sub);
      } else {
        resolve(null);
      }
    });
  });
};

export interface ApiError {
  message: string;
  status?: number;
}