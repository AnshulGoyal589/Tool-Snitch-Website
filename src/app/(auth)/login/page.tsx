'use client';

import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';   
import { api } from "@/api/api";
import { getJwtToken } from '@/action/cognitoUtils';
import Image from 'next/image';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
};

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);   
  const [loginSuccess, setLoginSuccess] = useState(false);
  const router = useRouter();
  
  const userPool = new CognitoUserPool(poolData);

  // Check authentication status on mount
  useEffect(() => {
    setMounted(true);
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
          setLoginSuccess(true);
          router.replace('/');
        }
      }
    };
    checkAuth();
  }, [router]);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Force a re-render of the navigation bar
        const event = new Event('storage');
        window.dispatchEvent(event);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  async function checkShopkeeper(email: string): Promise<boolean> {
    try {
      const shopkeeperResponse = await api.post("/read/shopkeeper-profile", { email });
      if (shopkeeperResponse.data.isShopkeeper) {
        return true;
      }
      
      const customerResponse = await api.post("/read/customer-profile", { email });
      if (!customerResponse.data.isShopkeeper) {
        return false;
      }

      throw new Error("User profile not found");
    } catch (error) {
      console.error("Error checking user profile:", error);
      throw error;
    }
  }

  async function checkAdmin(email: string): Promise<boolean> {
    try {
      const response = await api.post("/read/admin-profile", {
        cognitoId: null,
        email,
      });
      return response.data.isAdmin;
    } catch (error) {
      console.error("Error checking admin profile:", error);
      return false;
    }
  }

  function signIn(ID: string, password: string) {
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
          if (mounted) {
            localStorage.setItem('userSession', JSON.stringify(session));
            localStorage.setItem('isLoggedIn', 'true');
            // Trigger storage event for navbar update
            window.dispatchEvent(new Event('storage'));
          }
          resolve(session);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  const handleSignIn = async () => {
    if (!email || !password || isLoading) return;
    
    setIsLoading(true);
    try {
      const session: any = await signIn(email, password);
      const isShopkeeper = await checkShopkeeper(email);
      const isAdmin = await checkAdmin(email);
      
      const response = await api.post(`/auth/getProfile/`, {
        cognitoId: session.idToken.payload.sub
      });
      const profile = response.data;
      
      if (mounted && typeof window !== 'undefined') {
        // Store profile data
        localStorage.setItem('profile', JSON.stringify({ 
          name: profile.name, 
          profilePic: profile?.profilePic 
        }));
        
        // Handle JWT token
        const token = await getJwtToken(email, password);
        const jwt = token.accessToken;
        const farFuture = new Date(2099, 11, 31).toUTCString();
        
        // Set cookies
        document.cookie = `jwtToken=${jwt}; path=/; expires=${farFuture}; secure; samesite=strict`;
        document.cookie = `isShopkeeper=${isShopkeeper}; path=/; expires=${farFuture}; secure; samesite=strict`;
        document.cookie = `isAdmin=${isAdmin}; path=/; expires=${farFuture}; secure; samesite=strict`;
        
        // Set localStorage
        localStorage.setItem('JwtToken', jwt);
        localStorage.setItem('isShopkeeper', isShopkeeper ? 'true' : 'false');
        localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
        
        // Trigger storage event for navbar update
        window.dispatchEvent(new Event('storage'));
      }
      
      setLoginSuccess(true);
      
      // Use router for navigation instead of window.location
      if (isAdmin) {
        window.location.href='/admin';
      } else if (!isShopkeeper) {
        window.location.href='/home';
      } else {
        window.location.href='/dashboard';
      }
      // if (isAdmin) {
      //   router.push('/admin');
      // } else if (!isShopkeeper) {
      //   router.push('/home');
      // } else {
      //   router.push('/dashboard');
      // }
    } catch (err) {
      console.error("Login failed", err);
      const errorMessage = (err as Error).message;
      if (errorMessage === "User is not confirmed.") {
        alert("Login failed: Please verify your E-Mail from the link sent to your E-Mail address.");
      } else {
        alert("Login failed: " + errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

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
            <Image
              src="/login.png"
              alt="Hero Image"
              width={500}
              height={300}
              className="rounded-xl w-full h-auto" 
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}