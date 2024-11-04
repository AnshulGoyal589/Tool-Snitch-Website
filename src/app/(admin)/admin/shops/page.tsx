"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/api/api";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ModalBox from "@/components/private/ModalBox";

export interface ShopType {
  _id: string;
  cognitoId?: string;
  email: string;
  name: string;
  shopName: string;
  shopLocation: string;
  status: string;
  shopSpecs?: string;
  shopPhone?: string;
  openingTime?: string;
  closingTime?: string;
  images?: string[];
  price?: number;
  rating?: number;
  address?: string;
  desc?: string;
  yearofEstablishment?: string;
}

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
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        await fetchShopsData();
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  const fetchShopsData = async () => {
    try {
      const response = await api.get(`/read/shopsData`);
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
      console.error("Error approving the shop:", error);
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
            Please wait while we load your inventory.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <div className="py-10">
        <h1 className="mb-8 text-center text-4xl font-bold">All Shops</h1>

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
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
          <Card className="col-span-8 items-center justify-center">
            <CardContent className="py-5">
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S.No.</TableHead>
                      <TableHead>Shop</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Shop Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShops.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <span
                            className="cursor-pointer underline"
                            onClick={() => handleModalBoxOpen(item)}
                          >
                            {item.shopName}
                          </span>
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.shopLocation}</TableCell>
                        <TableCell>
                          <Badge
                            variant="destructive"
                            style={{
                              background:
                                item.status === "APPROVED" ? "#28a745" : "",
                            }}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                updateStatus(item._id, "APPROVED", index)
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                updateStatus(item._id, "PENDING", index)
                              }
                            >
                              Hide
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
    </>
  );
};

export default Shops;
