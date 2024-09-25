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
  shopName: z
    .string()
    .min(3, "Shop name must be at least 3 characters long")
    .max(50, "Shop name must be at most 50 characters long"),
  shopDescription: z
    .string()
    .min(3, "Shop description must be at least 3 characters long")
    .max(500, "Shop description must be at most 500 characters long"),
  shopMail: z.string().email(),
  shopPhone: z.string().min(10).max(10),
  address: z.string().min(3, "Address Required"),
  pincode: z.string().min(6).max(6),
  images: z.array(z.string()).max(5).optional(),
  status: z.string().optional(),
});

export const description =
  "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images.";

const MyShop = () => {
  const { toast } = useToast();

  const [disabled, setDisabled] = useState(true);
  const [shopDetails, setShopDetails] = useState<
    null | z.infer<typeof ShopProfileSchema> | undefined
  >(null);
  const [activeImage, setActiveImage] = useState<string | undefined | null>(
    null
  );
  const [image, setImage] = useState<string[] | undefined | null>([
    "https://images.unsplash.com/photo-1719937206255-cc337bccfc7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1719937206255-cc337bccfc7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]);
  const form = useForm({
    resolver: zodResolver(ShopProfileSchema),
    defaultValues: {
      shopName: "Test Shop",
      shopDescription: "Test Description",
      shopMail: "test@test.com",
      shopPhone: "1234567890",
      address: "Test Address",
      pincode: "123456",
      status: "review",
      images: [],
    },
  });
  const fetchShopDetails = useCallback(async () => {
    try {
      const response = await api.get("/read/read/shopProfile'");
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
      form.setValue("shopName", shopDetails.shopName);
      form.setValue("shopMail", shopDetails.shopMail);
      form.setValue("shopDescription", shopDetails.shopDescription);
      form.setValue("shopPhone", shopDetails.shopPhone);
      form.setValue("address", shopDetails.address);
      form.setValue("pincode", shopDetails.pincode);
      form.setValue("status", shopDetails.status || "review");
      setImage(shopDetails.images);
    }
  }, [shopDetails, form]);

  useEffect(() => {
    if (image) {
      setActiveImage(image.at(0));
    }
  }, [image]);

  const onSubmit = async (data: z.infer<typeof ShopProfileSchema>) => {
    // Validate the form data
    const isValid = await form.trigger();
    // Image validation
    const ImageValid =
      image &&
      image.length > 0 &&
      image.length <= 5 &&
      image.every((img) => typeof img === "string") &&
      image.length >= 3;
    if (!ImageValid || !isValid) {
      return;
    }

    // Validate the pincode
    const details = pincodes.getPincodeDetails(Number(data.pincode));
    if (!details) {
      form.setError("pincode", {
        type: "manual",
        message: "Invalid Pincode",
      });
      return;
    }

    // Submit the form data
    try {
      setDisabled(true);
      const POST_DATA = {
        shopName: data.shopName,
        shopMail: data.shopMail,
        shopPhone: data.shopPhone,
        address: data.address,
        pincode: data.pincode,
        shopDescription: data.shopDescription,
        // status: form.getValues("status"),
        images: image,
      };
      console.log(data);
      await api.post("/auth/shopData", POST_DATA);
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
          onSubmit={form.handleSubmit(onSubmit)}
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
                          <div className="grid gap-3">
                            <FormField
                              control={form.control}
                              name="shopDescription"
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
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            <div>
                              <FormField
                                control={form.control}
                                name="shopMail"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Email"
                                        {...field}
                                        disabled={disabled}
                                      />
                                    </FormControl>
                                    {/* <FormDescription>
                                    Please provide a valid email address.
                                  </FormDescription> */}
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
                                    {/* <FormDescription>
                                      Please provide a valid phone number.
                                    </FormDescription> */}
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
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
                                  {/* <FormDescription>
                                    Please provide a valid address.
                                  </FormDescription> */}
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
                                    {/* <FormDescription>
                                      Please provide a valid pincode.
                                    </FormDescription> */}
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
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
                              {form.getValues("status").toLocaleUpperCase()}
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
                                setImage((prev) =>
                                  prev.filter((img) => img !== activeImage)
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
                                "https://images.unsplash.com/photo-1719937206255-cc337bccfc7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                                onSuccess={(result) => {
                                  console.log(result);
                                  if (
                                    typeof result.info === "object" &&
                                    "secure_url" in result.info
                                  ) {
                                    setImage((prev) => {
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
}



export default MyShop;