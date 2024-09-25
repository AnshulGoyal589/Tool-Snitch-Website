"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { use, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api/api";

import { set, z } from "zod";
import pincodes from "indian-pincodes";

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
  username: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().nonempty(),
  pincode: z.string().min(6).max(6),
});

export default function Profile() {
  const { toast } = useToast();

  const [disabled, setDisabled] = useState(true);
  const [userData, setUserData] = useState({});

  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: "Test",
      email: "test@test.com",
      phone: "1234567890",
      address: "Test Address",
      pincode: "123456",
    },
  });

  const getUserData = useCallback(async () => {
    try {
      setDisabled(true);
      const response = await api.get("/auth/getUserDetails");
      setUserData(response.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unable to fetch user",
        description: error.response?.data?.message || "Something went wrong",
      });
    }
    setDisabled(false);
  }, [toast]);

  //   useEffect(() => {
  //     getUserData();
  //   }, [getUserData]);

  useEffect(() => {
    form.reset(userData);
  }, [userData, form]);

  const onSubmit = async (data: z.infer<typeof ProfileSchema>) => {
    console.log(data);

    // Pincode validation
    const details = pincodes.getPincodeDetails(Number(data.pincode));
    if (!details) {
      form.setError("pincode", {
        type: "manual",
        message: "Invalid Pincode",
      });

      return;
    }

    setDisabled(true);

    try {
      await api.put("/auth/updateProfile", data);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setDisabled(true);
      getUserData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unable to update profile",
        description: error.response?.data?.message || "Something went wrong",
      });
      setDisabled(false);
    }
  };

  return (
    <div className="my-16 flex flex-col items-center justify-center">
      <section className="mt-8 flex max-w-5xl items-center justify-center rounded-xl border-2 border-[#D8BA74] shadow-md shadow-[#D8BA74]">
        <div className="">
          <div className="space-y-4 p-4">
            <h1 className="border-[#D8BA74]/ border-b-2 pb-3 text-2xl font-bold">
              My Profile
            </h1>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit((data) => onSubmit(data))}
                method="POST"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={disabled} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={true} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={disabled} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pincode</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={disabled} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={disabled} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <Button type="submit">Update</Button> */}
                </div>
                <div className="flex justify-end">
                  {!disabled && (
                    <Button
                      type="button"
                      onClick={() => setDisabled(true)}
                      className="m-4 bg-black px-4 py-2 text-white"
                    >
                      Cancel
                    </Button>
                  )}

                  {!disabled && (
                    <Button
                      type="submit"
                      className="m-4 bg-black px-4 py-2 text-white"
                    >
                      Update
                    </Button>
                  )}
                  {disabled && (
                    <Button
                      type="button"
                      onClick={() => setDisabled(false)}
                      className="m-4 bg-black px-4 py-2 text-white"
                    >
                      Edit
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
