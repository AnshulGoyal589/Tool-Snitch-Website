"use client";

import { useRouter } from 'next/navigation';
import { CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

// Cognito pool data
const poolData = {
  UserPoolId: 'ap-south-1_VKjbitmCA', // Replace with your Cognito User Pool ID
  ClientId: '26b9i0nbi58vcq7gqfcdnjt8qo', // Replace with your Cognito Client ID
};
const userPool = new CognitoUserPool(poolData);

// Sign-up function
function signUp(ID: string, password: string, Name:string = "abc") {
  console.log("Signing up");

  return new Promise((resolve, reject) => {
    userPool.signUp(
      ID,
      password,
      [
        new CognitoUserAttribute({
          Name: 'name',
          Value: Name,
        }),
      ],
      [],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

export default function RegisterPage() {
  const router = useRouter(); // Next.js router for navigation
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password input
  const [selected, setSelected] = useState(false); // State for shop registration checkbox

  // Handle sign-up process
  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill out all required fields.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    signUp(email, password, "abc")
      .then(result => {
        console.log("User signed up successfully:", result);
        alert("Sign-up successful! Redirecting...");
        router.push('/query'); // Redirect to /query after successful sign-up
      })
      .catch(error => {
        console.error("Error signing up:", error);
        alert(`Error signing up: ${error.message}`);
      });
  };

  return (
    <div className="flex flex-col justify-center item-center pt-[3rem]">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 items-center lg:items-start">
          <div className="lg:col-span-3">
            <div className="">
              <h1 className="mb-4 text-4xl pt-2 font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center lg:text-start">Sign up</h1>
            </div>
            <div className="">
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-lg dark:text-gray-400 text-center lg:text-start">Sign up to make getting appointments easier</p>
            </div>
{/*             <div className="flex justify-center items-center lg:justify-start">
              <Button className="rounded-3xl bg-[transparent] text-gray-500 border h-12 w-[12rem] xl:w-[16rem] hover:bg-[#C6A86B] hover:text-white">
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
 */}
            {/* Input for email */}
            <Input
              className="my-4 bg-[transparent] rounded-3xl h-12 w-[20rem] md:w-[30rem]"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Input for password */}
            <Input
              className="my-4 bg-[transparent] rounded-3xl h-12 w-[20rem] md:w-[30rem]"
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Input for confirm password */}
            <Input
              className="my-4 bg-[transparent] rounded-3xl h-12 w-[20rem] md:w-[30rem]"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="flex items-center gap-2" onClick={() => setSelected(!selected)}>
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Want to Register as a Shop?
              </label>
            </div>

            {selected && (
              <div>
                <Input className="my-4 bg-[transparent] rounded-3xl h-12 w-[20rem] md:w-[30rem]" placeholder="Enter your shop name" />
                <Input className="my-4 bg-[transparent] rounded-3xl h-12 w-[20rem] md:w-[30rem]" placeholder="Enter your shop location" />
                <Input className="my-4 bg-[transparent] rounded-3xl h-12 w-[20rem] md:w-[30rem]" placeholder="Enter your shop's specifications" />
                <Input className="my-4 bg-[transparent] rounded-3xl h-12 w-[20rem] md:w-[30rem]" placeholder="Enter your phone number" />
              </div>
            )}

            {/* Continue with email button */}
            <Button
              className="my-4 hover:bg-black rounded-2xl h-12 w-[20rem] md:w-[30rem] bg-[#C6A86B]"
              onClick={handleSignUp}
            >
              Continue with Email
            </Button>

            <div>
              <span className="text-neutral-500">
                Looking to register as a shop? <a className="text-[#C6A86B]" href="/register">Register here</a>
              </span>
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
