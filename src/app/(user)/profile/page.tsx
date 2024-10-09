"use client";

import { api } from "@/api/api";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { CldUploadWidget } from "next-cloudinary";
import { z } from "zod";
import { getUserSession } from '@/utils/auth'


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/react";

const ProfileSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string().length(10, "Phone number is Required").regex(/^\d+$/),
  address: z.string().min(3, "Address is Required").max(255),
  profilePic: z.string().optional(),
});

export default function Profile() {
  const { toast } = useToast();

  const [disabled, setDisabled] = useState(true);
  const [userData, setUserData] = useState<z.infer<typeof ProfileSchema> | null>(null);

  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      profilePic: "",
    },
  });

  const getUserData = useCallback(async () => {
    try {
      const cognitoId = await getUserSession();
      if (!cognitoId) {
         throw new Error("User not authenticated");
      }
      const response = await api.post(`/auth/getProfile/`, {
        cognitoId : cognitoId
      });

      console.log(response);
      setUserData(response.data);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Unable to fetch user",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
    // setDisabled(false);
  }, [toast, setUserData, setDisabled, api]);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        profilePic: userData.profilePic,
      });
    }
  }, [userData, form]);

  const onSubmit = async (data: z.infer<typeof ProfileSchema>) => {
    console.log(data);
    try {
      const cognitoId = await getUserSession();
      if (!cognitoId) {
         throw new Error("User not authenticated");
      }
      const PUT_DATA = {
        cognitoId: cognitoId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        profilePic: data.profilePic,
      }
      await api.put("/auth/updateProfile", PUT_DATA);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setDisabled(true);
      getUserData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Unable to update profile",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="mx-4 my-4 sm:mx-8 md:mx-16 md:my-8 lg:mx-24 xl:mx-32">
      <section className="mx-auto max-w-5xl">
        <div className="">
          <div className="space-y-4 p-4">
            <h1 className="pb-3 text-2xl font-bold md:text-4xl">Profile</h1>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit((data) => onSubmit(data))}
                method="POST"
              >
                <div className="mt-2 flex items-center justify-start gap-2 md:mt-4 md:gap-4">
                  <Avatar
                    src={form.watch("profilePic")}
                    size="lg"
                    name={form.watch("name")}
                  />
                  <div className="space-y-2">
                    <h2 className="text-base font-semibold md:text-2xl">
                      Proflie Picture
                    </h2>
                    <div className="flex items-center gap-2">
                      <CldUploadWidget
                        uploadPreset={
                          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                        }
                        signatureEndpoint="/api/sign-cloudinary-params"
                        onSuccess={(result: any) => {
                          console.log(result);
                          if (
                            typeof result.info === "object" &&
                            "secure_url" in result.info
                          ) {
                            form.setValue("profilePic", result.info.secure_url);
                          }
                        }}
                        options={{
                          maxFiles: 1,
                          sources: ["local", "url"],
                          multiple: false,
                          autoMinimize: false,
                          maxFileSize: 2 * 1024 * 1024, // 2MB
                          clientAllowedFormats: ["jpeg", "png"],
                        }}
                      >
                        {({ open }) => {
                          return (
                            <button
                              type="button"
                              className="rounded-full bg-[#D8BA74] px-3 py-1 text-sm text-white transition-colors duration-300 hover:bg-[#D8BA74]/80 disabled:cursor-not-allowed disabled:bg-[#D8BA74]/70"
                              disabled={disabled}
                              onClick={() => open()}
                            >
                              Upload
                            </button>
                          );
                        }}
                      </CldUploadWidget>
                      <button
                        type="button"
                        className="rounded-full bg-red-500 px-3 py-1 text-sm text-white transition-colors duration-300 hover:bg-red-500/80 disabled:cursor-not-allowed disabled:bg-red-500/70"
                        disabled={disabled}
                        onClick={() => form.setValue("profilePic", "")}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="max-w-96 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={disabled}
                            className="rounded-full border-2 border-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={true}
                            className="rounded-full border-2 border-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={disabled}
                            className="rounded-full border-2 border-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={disabled}
                            className="rounded-full border-2 border-gray-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <Button type="submit">Update</Button> */}
                </div>
                <div className="flex justify-start gap-4">
                  {!disabled && (
                    <Button
                      type="button"
                      onClick={() => setDisabled(true)}
                      className="rounded-full bg-red-500 px-4 py-2 text-white"
                    >
                      Cancel
                    </Button>
                  )}

                  {!disabled && (
                    <Button
                      type="submit"
                      className="rounded-full bg-[#D8BA74] px-4 py-2 text-white"
                    >
                      Update
                    </Button>
                  )}
                  {disabled && (
                    <Button
                      type="button"
                      onClick={() => setDisabled(false)}
                      className="rounded-full bg-[#D8BA74] px-4 py-2 text-white"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
