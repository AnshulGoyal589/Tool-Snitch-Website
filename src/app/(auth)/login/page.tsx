'use client';

import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';   

import { getJwtToken } from '@/action/cognitoUtils';

const poolData = {
  UserPoolId: 'ap-south-1_VKjbitmCA',
  ClientId: '26b9i0nbi58vcq7gqfcdnjt8qo',
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
      onSuccess:   
 (session) => {
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        localStorage.setItem('userSession', JSON.stringify(session));
        localStorage.setItem('isLoggedIn', 'true'); 
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
  const [isLoading, setIsLoading] = useState(false);   
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isLoggedIn')) {
      setLoginSuccess(true);
      router.replace('/');
    }
  }, [router]);

  const handleSignIn = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const session = await signIn(email, password);
        console.log("Login successful!", session);

        const token = await getJwtToken(email, password);
        if (typeof window !== 'undefined') {
          const jwt = token.accessToken;
          
          document.cookie = `jwtToken=${jwt}; path=/; max-age=3600; secure; samesite=strict`;
          localStorage.setItem('JwtToken', jwt);
        }

        setLoginSuccess(true);
        window.location.href = '/'; 
      } catch (err) {
        console.error("Login failed", err);
        alert("Login failed: " + (err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center item-center pt-[3rem] mb-10">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 items-center lg:items-start">
          <div className="lg:col-span-3 my-4">
            <div>
              <h1 className="mb-4 text-4xl pt-2 font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center lg:text-start">Login</h1>
            </div>
            <div>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-lg dark:text-gray-400 text-center lg:text-start">
                Welcome back, login to get your device fixed quick
              </p>
            </div>

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
                  className={`hover:bg-black rounded-2xl h-12 w-[20rem] md:w-[25rem] xl:w-[30rem] bg-[#C6A86B] ${!email || !password || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleSignIn}
                  disabled={!email || !password || isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Continue with Email'}
                </Button>
              </div>
              
              {loginSuccess && (
                <div className="text-green-500 font-semibold mt-2">
                  Login successful! Redirecting...
                </div>
              )}
            </div>
            <div>
              <span>Looking to register as a shop? <a className="text-[#C6A86B]" href="/register">Register here</a></span>
            </div>
          </div>

          <div className="lg:col-span-4 mt-10 lg:mt-0 hidden lg:flex">
            <img className="w-full rounded-xl" src="login.png" alt="Hero Image" />
          </div>
        </div>
      </div>
    </div>
  );
}
