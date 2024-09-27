'use client';

import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-south-1_VKjbitmCA', // Replace with your Cognito User Pool ID
  ClientId: '26b9i0nbi58vcq7gqfcdnjt8qo', // Replace with your Cognito Client ID
};
const userPool = new CognitoUserPool(poolData);

function signIn(ID, password) {
  console.log("Signing in")
  const authenticationDetails = new AuthenticationDetails({
    Username: ID,
    Password: password,
  });

  const userData = {
    Username: ID,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        localStorage.setItem('userSession', JSON.stringify(session));
        resolve(session);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
}

function signUp(ID, password, Name) {
  console.log("Signing up");

  return new Promise((resolve, reject) => {
    userPool.signUp(ID, password, [
      new CognitoUserAttribute({
        Name: 'name',
        Value: Name,
      }),
    ], null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


function getJwtToken(ID, password) {
  const authenticationDetails = new AuthenticationDetails({
    Username: ID,
    Password: password,
  }); 

  const userData = {
    Username: ID,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        // The ID token, Access token, and Refresh token
        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();

        resolve({ idToken, accessToken, refreshToken });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
}

export { signIn, signUp, getJwtToken };