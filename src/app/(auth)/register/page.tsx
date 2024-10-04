'use client'

import { CognitoUserPool, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { api } from "@/api/api";

const poolData = {
  UserPoolId: "ap-south-1_VKjbitmCA",
  ClientId: "26b9i0nbi58vcq7gqfcdnjt8qo",
};
const userPool = new CognitoUserPool(poolData);

const CUSTOMER_API = "/auth/customer-profile";
const SHOPKEEPER_API = "/auth/shopkeeper-profile";

function signUp(email: string, password: string, attributes: { [key: string]: string }) {
  return new Promise((resolve, reject) => {
    const attributeList = Object.entries(attributes).map(
      ([key, value]) => new CognitoUserAttribute({ Name: key, Value: value })
    );

    userPool.signUp(email, password, attributeList, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(false);
  const [shopName, setShopName] = useState("");
  const [shopLocation, setShopLocation] = useState("");
  const [shopSpecs, setShopSpecs] = useState("");
  const [shopPhone, setShopPhone] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !name) {
      alert("Please fill out all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const cognitoResult: any = await signUp(email, password, {
        "name": name,
        "email": email
      });

      const commonData = {
        cognitoId: cognitoResult.userSub,
        email,
        name
      };

      let mongoDbResult;

      console.log(commonData);

      if (selected) {
        mongoDbResult = await api.post(SHOPKEEPER_API, {
          ...commonData,
          shopName,
          shopLocation,
          shopSpecs,
          shopPhone,
        });
      } else {
        mongoDbResult = await api.post(CUSTOMER_API, commonData);
      }

      console.log("User signed up successfully:", cognitoResult);
      console.log("User data stored in MongoDB:", mongoDbResult.data);

      if (selected && typeof window !== 'undefined') {
        const shopData = {
          shopName: shopName,
          shopMail: email,
          address: shopLocation,
          shopPhone: shopPhone,
          services: shopSpecs,
        };
        localStorage.setItem("shopData", JSON.stringify(shopData));
      }

      router.push("/query");
    } catch (error: any) {
      console.error("Error during sign up:", error);
      if (error.response) {
        alert(`Error signing up: ${error.response.data.message || error.response.data}`);
      } else if (error.request) {
        alert("Error signing up: No response received from server");
      } else {
        alert(`Error signing up: ${error.message}`);
      }
    }
  };

  return (
    <div className="item-center flex flex-col justify-center pt-[3rem]">
      <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center lg:grid-cols-7 lg:items-start lg:gap-x-8 xl:gap-x-12">
          <div className="lg:col-span-3">
            <div className="">
              <h1 className="mb-4 pt-2 text-center text-4xl font-bold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-start lg:text-6xl">
                Sign up
              </h1>
            </div>
            <div className="">
              <p className="mb-6 text-center text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-start lg:text-lg">
                Sign up to make getting appointments easier
              </p>
            </div>

            <Input
              className="my-4 h-12 w-[20rem] rounded-3xl bg-[transparent] md:w-[30rem]"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              className="my-4 h-12 w-[20rem] rounded-3xl bg-[transparent] md:w-[30rem]"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              className="my-4 h-12 w-[20rem] rounded-3xl bg-[transparent] md:w-[30rem]"
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              className="my-4 h-12 w-[20rem] rounded-3xl bg-[transparent] md:w-[30rem]"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div
              className="flex items-center gap-2"
              onClick={() => setSelected(!selected)}
            >
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
                <Input
                  className="my-4 h-12 w-[20rem] rounded-3xl bg-[transparent] md:w-[30rem]"
                  placeholder="Enter your shop name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                />
                <Input
                  className="my-4 h-12 w-[20rem] rounded-3xl bg-[transparent] md:w-[30rem]"
                  placeholder="Enter your shop location"
                  value={shopLocation}
                  onChange={(e) => setShopLocation(e.target.value)}
                />
                <Input
                  className="my-4 h-12 w-[20rem] rounded-3xl bg-[transparent] md:w-[30rem]"
                  placeholder="Enter your shop's specifications"
                  value={shopSpecs}
                  onChange={(e) => setShopSpecs(e.target.value)}
                />
                <Input
                  className="my-4 h-12 w-[20rem] rounded-3xl bg-[transparent] md:w-[30rem]"
                  placeholder="Enter your phone number"
                  value={shopPhone}
                  onChange={(e) => setShopPhone(e.target.value)}
                />
              </div>
            )}

            <Button
              className="my-4 h-12 w-[20rem] rounded-2xl bg-[#C6A86B] hover:bg-black md:w-[30rem]"
              onClick={handleSignUp}
            >
              Continue with Email
            </Button>

            <div>
              <span className="text-neutral-500">
                Already have an account?{" "}
                <a className="text-[#C6A86B]" href="/login">
                  Login here
                </a>
              </span>
            </div>
          </div>

          <div className="mt-10 hidden lg:col-span-4 lg:mt-0 lg:flex">
            <img
              className="w-full rounded-xl"
              src="login.png"
              alt="Hero Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}