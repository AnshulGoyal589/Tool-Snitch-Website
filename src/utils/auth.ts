import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';

// Configure Cognito User Pool
const userPoolConfig = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!
};

const userPool = new CognitoUserPool(userPoolConfig);

export const getUserSession = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const currentUser = userPool.getCurrentUser();
    
    if (!currentUser) {
      reject(new Error('No current user found'));
      return;
    }

    currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err) {
        reject(err);
        return;
      }

      if (!session) {
        reject(new Error('No session found'));
        return;
      }

      if (session.isValid()) {
        const payload = session.getIdToken().payload;
        resolve(payload.sub); // sub is the Cognito User ID
      } else {
        reject(new Error('Session is invalid'));
      }
    });
  });
};


export const forgotPassword = (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        resolve(data);
      },
      onFailure: (err) => {
        reject(err);
      }
    });
  });
};

export const confirmNewPassword = (
  email: string,
  verificationCode: string,
  newPassword: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool
    });

    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        resolve('Password confirmed successfully');
      },
      onFailure: (err) => {
        reject(err);
      }
    });
  });
};

export interface CognitoSessionPayload {
  sub: string;
  email: string;
  email_verified: boolean;
  auth_time: number;
  token_use: string;
  [key: string]: any;
}


export const isAuthenticated = async (): Promise<boolean> => {
  try {
    await getUserSession();
    return true;
  } catch (error) {
    return false;
  }
};