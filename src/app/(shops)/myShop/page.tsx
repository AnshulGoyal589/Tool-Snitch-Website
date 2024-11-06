"use client";
import { Upload } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { api } from "@/api/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserSession } from "@/utils/auth";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import pincodes from "indian-pincodes";

const ShopProfileSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  shopLocation: z.string().min(1, "Shop location is required"),
  address: z.string().min(1, "Address is required"),
  shopSpecs: z.string(),
  desc: z.string(),
  pincode: z.string()
    .min(6, "Pincode must be 6 digits")
    .max(6, "Pincode must be 6 digits")
    .regex(/^[1-9][0-9]{5}$/, "Invalid pincode format"),
  shopPhone: z.string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[6-9]\d{9}$/, "Invalid phone number format"),
  images: z.array(z.string()).nullable().optional(),
  status: z.string().optional(),
  yearofEstablishment: z.string()
    .regex(/^\d{4}$/, "Must be a 4-digit year")
    .refine((val) => {
      const year = parseInt(val);
      const currentYear = new Date().getFullYear();
      return year >= 1900 && year <= currentYear;
    }, "Year must be between 1900 and current year")
    .optional(),
});

const MyShop = () => {
  const { toast } = useToast();

  const [disabled, setDisabled] = useState(true);
  const [shopDetails, setShopDetails] = useState<
    null | z.infer<typeof ShopProfileSchema> | undefined
  >(null);
  const [activeImage, setActiveImage] = useState<string | undefined | null>(
    null
  );
  const [image, setImage] = useState<string[] | undefined | null>([]);

  const form = useForm({
    resolver: zodResolver(ShopProfileSchema),
    defaultValues: {
      shopName: "",
      email: "",
      name: "",
      shopLocation: "",
      address: "",
      shopSpecs: "",
      desc: "",
      pincode: "",
      shopPhone: "",
      images: [] as string[],
      status: "PENDING",
      yearofEstablishment: "",
    },
  });

  const fetchShopDetails = useCallback(async () => {
    try {
      const cognitoId = await getUserSession();
      if (!cognitoId) {
        throw new Error("User not authenticated");
      }
      const response = await api.get(`/shop/${cognitoId}`);
      console.log("Shop Profile Data: ", response.data);
      setShopDetails(response.data);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Unable to fetch shop details",
        description: error.response?.data?.message || "Please try again later",
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchShopDetails();
  }, [fetchShopDetails]);

  useEffect(() => {
    if (shopDetails) {
      form.reset({
        shopName: shopDetails.shopName,
        email: shopDetails.email,
        name: shopDetails.name,
        shopLocation: shopDetails.shopLocation,
        address: shopDetails.address,
        shopSpecs: shopDetails.shopSpecs,
        desc: shopDetails.desc,
        pincode: shopDetails.pincode,
        shopPhone: shopDetails.shopPhone,
        images: shopDetails.images || [],
        status: shopDetails.status,
        yearofEstablishment: shopDetails.yearofEstablishment,
      });
      setImage(shopDetails.images || []);
    }
  }, [shopDetails, form]);

  useEffect(() => {
    if (image) {
      setActiveImage(image.at(0));
    }
  }, [image]);

  const onSubmit = async (data: z.infer<typeof ShopProfileSchema>) => {
    const isValid = await form.trigger();
    const ImageValid =
      image &&
      image.length > 0 &&
      image.length <= 5 &&
      image.every((img) => typeof img === "string") &&
      image.length >= 3;
    if (!ImageValid || !isValid) {
      return;
    }
    try{
      const pincodeDetails = pincodes.getPincodeDetails(parseInt(data.pincode));
      if (!pincodeDetails) {
        form.setError("pincode", {
          type: "manual",
          message: "Please enter a valid Indian pincode",
        });
        return;
      }
    } catch (error) {
      form.setError("pincode", {
        type: "manual",
        message: "Error validating pincode. Please try again.",
      });
      return;
    }


    try {
      setDisabled(true);
      const cognitoId = await getUserSession();
      if (!cognitoId) {
        throw new Error("User not authenticated");
      }
      const POST_DATA = {
        shopName: data.shopName,
        name: data.name,
        shopLocation: data.shopLocation,
        address: data.address,
        shopSpecs: data.shopSpecs,
        desc: data.desc,
        pincode: data.pincode,
        shopPhone: data.shopPhone,
        images: image,
      };
      await api.put(`/shop/${cognitoId}`, POST_DATA);
      setDisabled(true);
      fetchShopDetails();
      toast({
        title: "Shop details updated successfully",
      });
    } catch (error) {
      console.error(error);
      setDisabled(false);
      toast({
        variant: "destructive",
        title: "Unable to update shop details",
        description: "Please try again later",
      });
    }
  };

  return (
    <div className="mt-4 flex min-h-screen w-full flex-col bg-muted/40 md:mt-8">
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
          method="POST"
        >
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>My Shop</CardTitle>
                        {/* <CardDescription>
                        Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription> */}
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="shopName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Shop Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Shop Name"
                                      {...field}
                                      disabled={disabled}
                                    />
                                  </FormControl>
                                  <FormDescription></FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="gird gap-3">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Owner Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Owner Name"
                                      {...field}
                                      disabled={disabled}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div>
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Email"
                                        {...field}
                                        disabled={true}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div>
                              <FormField
                                control={form.control}
                                name="shopPhone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Phone"
                                        {...field}
                                        disabled={disabled}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="desc"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      className="h-32 resize-none"
                                      {...field}
                                      disabled={disabled}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Please provide a brief description of your
                                    shop.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="shopSpecs"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Specialities</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Specialities"
                                      {...field}
                                      disabled={disabled}
                                    />
                                  </FormControl>
                                  <FormDescription>
                                    Please provide the specialities of your
                                    shop.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Address"
                                      {...field}
                                      disabled={disabled}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="shopLocation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Location"
                                      {...field}
                                      disabled={disabled}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div className="grid gap-3">
                              <FormField
                                control={form.control}
                                name="pincode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Pincode</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Pincode"
                                        {...field}
                                        disabled={disabled}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="yearofEstablishment"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year of Establishment</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Year of Establishment"
                                      {...field}
                                      disabled={disabled}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                      <CardHeader>
                        <CardTitle>Shop Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="status">Status</Label>
                            <span className="rounded-md border-1 border-y-gray-300 px-2 py-1 text-muted-foreground">
                              {form.getValues("status")?.toUpperCase() ||
                                "Not Available"}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            {!disabled && (
                              <Button type="submit" variant={"default"}>
                                Save Changes
                              </Button>
                            )}
                            {disabled && (
                              <Button
                                type="button"
                                onClick={() => setDisabled(false)}
                                variant={"secondary"}
                              >
                                Edit Shop
                              </Button>
                            )}
                            <Button variant={"destructive"} type="button">
                              Hide Shop
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Shop Images</CardTitle>
                        <CardDescription>
                          Please upload images of your Shop. Make sure the
                          images are clear and high quality.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <button
                            className="relative aspect-square w-full rounded-md border border-dashed"
                            disabled={disabled}
                            type="button"
                            onClick={() => {
                              if (activeImage) {
                                setImage((prev: any) =>
                                  prev?.filter(
                                    (img: any) => img !== activeImage
                                  )
                                );
                              }
                            }}
                          >
                            {!disabled && (
                              <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/80 opacity-0 transition-opacity duration-200 hover:opacity-100">
                                <MdDelete className="h-6 w-6 text-muted-foreground" />
                                <span className="sr-only">Delete</span>
                              </div>
                            )}
                            <Image
                              alt="Product image"
                              className="aspect-square w-full rounded-md object-cover"
                              height="300"
                              src={
                                activeImage ||
                                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                              }
                              width="300"
                              unoptimized
                            />
                          </button>
                          <div className="grid grid-cols-3 gap-2">
                            {image &&
                              image.map((img, index) => (
                                <button
                                  key={index}
                                  onClick={() => setActiveImage(img)}
                                  className="group relative aspect-square w-full rounded-md border border-dashed hover:border-primary"
                                  type="button"
                                >
                                  <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/20 opacity-0 transition-opacity duration-200 hover:opacity-100"></div>
                                  <Image
                                    alt="Product image"
                                    className="aspect-square w-full rounded-md object-cover"
                                    height="84"
                                    src={img}
                                    width="84"
                                    unoptimized
                                  />
                                </button>
                              ))}

                            {!disabled && (!image || image?.length < 5) && (
                              <CldUploadWidget
                                uploadPreset={
                                  process.env
                                    .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                                }
                                signatureEndpoint="/api/sign-cloudinary-params"
                                onSuccess={(result: any) => {
                                  console.log(result);
                                  if (
                                    typeof result.info === "object" &&
                                    "secure_url" in result.info
                                  ) {
                                    setImage((prev: any) => {
                                      if (prev) {
                                        return [
                                          ...prev,
                                          result.info.secure_url,
                                        ];
                                      }
                                      return [result.info.secure_url];
                                    });
                                  }
                                }}
                                options={{
                                  maxFiles: image?.length
                                    ? 5 - image.length
                                    : 5,
                                  sources: ["local", "url"],
                                  multiple: true,
                                  maxFileSize: 2 * 1024 * 1024, // 2MB
                                  clientAllowedFormats: ["jpeg", "png"],
                                }}
                              >
                                {({ open }) => {
                                  return (
                                    <button
                                      className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                                      onClick={() => open()}
                                      type="button"
                                    >
                                      <Upload className="h-4 w-4 text-muted-foreground" />
                                      <span className="sr-only">Upload</span>
                                    </button>
                                  );
                                }}
                              </CldUploadWidget>
                            )}
                            {/* <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                              <Upload className="h-4 w-4 text-muted-foreground" />
                              <span className="sr-only">Upload</span>
                            </button> */}
                          </div>

                          {!disabled &&
                            (!image ||
                              image?.length < 3 ||
                              image?.length > 5) && (
                              <FormMessage>
                                Please upload atleast 3 and atmost 5 images
                              </FormMessage>
                            )}

                          <span className="text-xs text-muted-foreground">
                            <span className="text-red-600">*</span> Minimum 3
                            images required
                          </span>
                          <span className="text-xs text-muted-foreground">
                            <span className="text-red-600">*</span> Maximum 5
                            images allowed, 2MB each
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="grid gap-4">
                  {/* <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle>Serive Details</CardTitle>
                  <CardDescription>
                    Add the details of the service you provide, including the
                    Device Model No, Service Type, Service Description, and
                    Price.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Device</TableHead>
                        <TableHead className="w-[200px]">Repair Type</TableHead>
                        <TableHead className="w-[200px]">
                          Repair Description
                        </TableHead>
                        <TableHead className="">Repair Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold">
                          Redmi Note 9 Pro
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="repair-type-1" className="sr-only">
                            Repair Type
                          </Label>
                          <Input
                            id="repair-type-1"
                            type="text"
                            defaultValue="Screen Replacement"
                          />
                        </TableCell>
                        <TableCell>
                          <Label
                            htmlFor="repair-description-1"
                            className="sr-only"
                          >
                            Price
                          </Label>
                          <Input
                            id="price-1"
                            type="text"
                            defaultValue="Screen Replacement"
                          />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="price-1" className="sr-only">
                            Price
                          </Label>
                          <Input
                            id="price-1"
                            type="text"
                            defaultValue="₹ 5000"
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="justify-center border-t p-4">
                  <Button size="sm" variant="ghost" className="gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    Add Variant
                  </Button>
                </CardFooter>
              </Card> */}
                </div>
              </div>
            </main>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MyShop;
