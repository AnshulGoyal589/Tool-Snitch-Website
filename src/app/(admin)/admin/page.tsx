"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/api/api";
import { useRouter } from "next/navigation";
import ModalBox from "@/components/private/ModalBox";

export interface ReviewType {
  star: number;
  review: string;
  body: string;
  name: string;
  user: string;
}

export interface ClosingDateRange {
  startDate: Date;
  endDate: Date;
  notice: string;
}

export interface Order {
  message: string;
  createdAt: Date;
  createdBy: string;
  device: string;
  issue: string;
  status: string;
  appointmentDetails: {
    date: Date;
    time: string;
  };
}

export interface SalesData {
  month: string;
  sales: number;
}

export interface ShopType {
  _id: string;
  cognitoId: string;
  email: string;
  name: string;
  shopName: string;
  shopLocation: string;
  address: string;
  pincode: string;
  status: string;
  shopSpecs: string;
  desc: string;
  yearofEstablishment: string;
  shopPhone: string;
  openingTime: string;
  closingTime: string;
  closingDateRanges: ClosingDateRange[];
  notifications: Order[];
  price: number;
  salesData: SalesData[];
  images: string[];
  reviews: ReviewType[];
  rating: number;
}

const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="h-32 w-full bg-gray-100 flex items-center justify-center text-gray-500">
        No images available
      </div>
    );
  }

  return (
    <div className="relative h-32 w-full">
      <Image
        src={images[currentImageIndex]}
        alt={`Shop image ${currentImageIndex + 1}`}
        width={900}
        height={900}
        className="h-full w-full object-cover rounded-md"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 px-2 py-1 rounded-full text-white text-xs">
            {currentImageIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

const Shops = () => {
  const categories = ["Approved", "Pending"];
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [shops, setShops] = useState<ShopType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedShop, setSelectedShop] = useState<ShopType>();

  useEffect(() => {
    const initializeShops = async () => {
      try {
        setIsLoading(true);
        await fetchShopsData();
      } catch (error) {
        console.error("Error while fetching shops data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeShops();
  }, []);

  const fetchShopsData = async () => {
    try {
      const response = await api.get(`/read/allshopsData`);
      setShops(response.data);
    } catch (error) {
      console.error("Error fetching shops:", error);
      setErrorMessage("Failed to load shops data");
    }
  };

  const updateStatus = async (
    shopId: string,
    status: string,
    index: number
  ) => {
    try {
      const response = await api.post(`/shops/updateStatus`, {
        shopId,
        status,
      });

      setShops((prev) =>
        prev.map((shop, ind) => {
          return index === ind ? response.data.shop : shop;
        })
      );
    } catch (error) {
      console.error("Error updating the shop status:", error);
      setErrorMessage("Failed to update the shop status");
    }
  };

  const filteredShops = shops.filter((item) => {
    const matchesSearch =
      item.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedCategory === "all" ||
      item.status === selectedCategory.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  const handleModalBoxOpen = (item: ShopType) => {
    setSelectedShop(item);
    setOpenModal(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Alert>
          <AlertTitle>Loading...</AlertTitle>
          <AlertDescription>
            Please wait while we load the shops data.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="py-10">
      <h1 className="mb-8 text-center text-4xl font-bold">All Shops</h1>
      
      {errorMessage && (
        <Alert variant="destructive" className="mb-4 mx-auto w-3/4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <ModalBox
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={selectedShop}
      />

      <div className="m-auto my-5 grid w-3/4 grid-cols-8 gap-4">
        <Card className="col-span-8">
          <CardContent className="py-5">
            <div className="mb-4 flex gap-4">
              <Input
                className="flex-1"
                placeholder="Search shops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Images</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Stats</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredShops.map((shop, index) => (
                    <TableRow key={shop._id}>
                      <TableCell className="w-48">
                        <ImageGallery images={shop.images} />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div 
                            className="font-medium cursor-pointer hover:underline"
                            onClick={() => handleModalBoxOpen(shop)}
                          >
                            {shop.shopName}
                          </div>
                          <div className="text-sm text-gray-500">{shop.name}</div>
                          <div className="text-sm">{shop.shopLocation}</div>
                          <div className="text-sm">{shop.address}</div>
                          <div className="text-sm">PIN: {shop.pincode}</div>
                          <Badge variant={shop.status === "APPROVED" ? "default" : "secondary"}>
                            {shop.status}
                          </Badge>
                          <div className="text-sm text-gray-500">{shop.shopSpecs}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>{shop.email}</div>
                          <div>{shop.shopPhone}</div>
                          <div className="text-sm text-gray-500">Est. {shop.yearofEstablishment}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>{shop.openingTime} - {shop.closingTime}</div>
                          {shop.closingDateRanges?.map((range, i) => (
                            <div key={i} className="text-sm text-red-500">
                              Closed: {new Date(range.startDate).toLocaleDateString()} - 
                              {new Date(range.endDate).toLocaleDateString()}
                              <div className="text-xs">{range.notice}</div>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1">{shop.rating?.toFixed(1) || "No rating"}</span>
                            <span className="ml-2">({shop.reviews?.length || 0} reviews)</span>
                          </div>
                          <div>₹{shop.price}/hr</div>
                          <div>{shop.notifications?.length || 0} orders</div>
                          <div>{shop.salesData?.length || 0} months sales data</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Button 
                            size="sm"
                            onClick={() => updateStatus(shop._id, "APPROVED", index)}
                            disabled={shop.status === "APPROVED"}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm"
                            variant="destructive"
                            onClick={() => updateStatus(shop._id, "PENDING", index)}
                            disabled={shop.status === "PENDING"}
                          >
                            Disable
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shops;