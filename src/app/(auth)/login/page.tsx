'use client';

import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const poolData = {
  UserPoolId: 'ap-south-1_VKjbitmCA', // Replace with your Cognito User Pool ID
  ClientId: '26b9i0nbi58vcq7gqfcdnjt8qo', // Replace with your Cognito Client ID
};
const userPool = new CognitoUserPool(poolData);

function signIn(ID: string, password: string) {
  console.log("Signing in");
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
        // Keep the session alive for at least 1 month
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

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Use Next.js router

  const handleSignIn = () => {
    if (email && password) {
      signIn(email, password)
        .then((session) => {
          console.log("Login successful!", session);
          // Redirect to /query upon success
          router.push('/query');
        })
        .catch((err) => {
          console.error("Login failed", err);
          alert("Login failed: " + err.message); // Show error in alert
        });
    }
  };

  return (
    <div className="flex flex-col justify-center item-center pt-[3rem] mb-10">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 items-center lg:items-start">
          <div className="lg:col-span-3 my-4">
            <div className="">
              <h1 className="mb-4 text-4xl pt-2 font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center lg:text-start">Login</h1>
            </div>
            <div className="">
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-lg dark:text-gray-400 text-center lg:text-start">
                Welcome back, login to get your device fixed quick
              </p>
            </div>

            <div className="flex justify-center items-center lg:justify-start">
              <Button className="rounded-3xl bg-[transparent] text-gray-500 border h-12 w-[16rem] hover:bg-[#C6A86B] hover:text-white">
                <svg className="w-4 mr-2 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                  <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4" />
                  <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853" />
                  <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05" />
                  <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335" />
                </svg>
                Continue with Google
              </Button>
            </div>

            <div className="flex justify-center"><span>or</span></div>
            <div className="flex flex-col justify-center items-center lg:items-start gap-5 my-5">
              <Input
                className="bg-[transparent] rounded-3xl h-12 w-[20rem] md:w-[25rem] xl:w-[30rem]"
                placeholder="Enter Email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                className="bg-[transparent] rounded-3xl h-12 w-[20rem] md:w-[25rem] xl:w-[30rem]"
                placeholder="Enter Password here"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <Button
                  className={`hover:bg-black rounded-2xl h-12 w-[20rem] md:w-[25rem] xl:w-[30rem] bg-[#C6A86B] ${!email || !password ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleSignIn}
                  disabled={!email || !password}
                >
                  Continue with Email
                </Button>
              </div>
            </div>
            <div><span>Looking to register as a shop? <a className="text-[#C6A86B]" href="/register">Register here</a></span></div>
          </div>

          <div className="lg:col-span-4 mt-10 lg:mt-0 hidden lg:flex">
            <img className="w-full rounded-xl" src="login.png" alt="Hero Image" />
          </div>
        </div>
      </div>
    </div>
  );
}
