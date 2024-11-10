'use client'

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link"; 
import { useRouter } from "next/navigation";
import { api } from "@/api/api";

interface ShopType {
  _id: string;
  shopName: string;
  status: string;
}

const Shops = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [shops, setShops] = useState<ShopType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    e: React.MouseEvent,
    shopId: string,
    status: string,
    index: number
  ) => {
    e.preventDefault(); // Prevent navigation when clicking buttons
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
      console.error("Error updating shop status:", error);
      setErrorMessage("Failed to update shop status");
    }
  };

  const filteredShops = shops.filter((item) =>
    item.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShopClick = (shopId: string) => {
    router.push(`/admin/${shopId}`);
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

      <div className="m-auto my-5 w-3/4">
        <Card>
          <CardContent className="py-5">
            <Input
              className="mb-4"
              placeholder="Search shops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="space-y-2">
              {filteredShops.map((shop, index) => (
                <div
                  key={shop._id}
                  className="p-4 border rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/admin/${shop._id}`}
                      className="flex-grow cursor-pointer"
                    >
                      <span className="font-medium">{shop.shopName}</span>
                      <span className={`ml-4 text-sm ${
                        shop.status === "APPROVED" ? "text-green-600" : "text-yellow-600"
                      }`}>
                        {shop.status}
                      </span>
                    </Link>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={(e) => updateStatus(e, shop._id, "APPROVED", index)}
                        disabled={shop.status === "APPROVED"}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => updateStatus(e, shop._id, "PENDING", index)}
                        disabled={shop.status === "PENDING"}
                      >
                        Hide
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shops;