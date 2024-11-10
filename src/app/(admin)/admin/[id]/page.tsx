'use client'

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { api } from "@/api/api";

interface ReviewType {
  star: number;
  review: string;
  body: string;
  name: string;
  user: string;
  createdAt?: string;
}

interface ShopType {
  _id: string;
  shopName: string;
  name: string;
  email: string;
  shopLocation: string;
  address: string;
  pincode: string;
  status: string;
  shopSpecs: string;
  yearofEstablishment: string;
  shopPhone: string;
  openingTime: string;
  closingTime: string;
  price: number;
  images: string[];
  reviews: ReviewType[];
  rating: number;
}

const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-6 w-6 cursor-pointer ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  );
};

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
      <div className="h-64 w-full bg-gray-100 flex items-center justify-center text-gray-500">
        No images available
      </div>
    );
  }

  return (
    <div className="relative h-64 w-full">
      <Image
        src={images[currentImageIndex]}
        alt={`Shop image ${currentImageIndex + 1}`}
        fill
        className="object-cover rounded-lg"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
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

const ShopDetail = () => {
  const {id} = useParams();
  const router = useRouter();
  const [shop, setShop] = useState<ShopType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [newReview, setNewReview] = useState({
    star: 0,
    review: "",
    body: "",
    name: "",
  });
//   console.log("params of slug: ",params.slug);
  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/read/shop/${id}`);
        setShop(response.data);
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setErrorMessage("Failed to load shop details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchShopDetails();
    }
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.star === 0) {
      setErrorMessage("Please select a rating");
      return;
    }
    
    try {
      const response = await api.post(`/shop/${id}/reviews`, newReview);
      setShop(response.data);
      setNewReview({ star: 0, review: "", body: "", name: "" });
      setErrorMessage("");
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrorMessage("Failed to submit review");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Alert>
          <AlertTitle>Loading...</AlertTitle>
          <AlertDescription>
            Please wait while we load the shop details.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Shop not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => router.push("/admin")}
      >
        <ChevronLeft className="h-4 w-4 mr-2" /> Back to Shops
      </Button>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{shop.shopName}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={shop.status === "APPROVED" ? "default" : "secondary"}>
                {shop.status}
              </Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{shop.rating?.toFixed(1) || "No rating"}</span>
                <span className="text-sm text-gray-500 ml-1">
                  ({shop.reviews?.length || 0} reviews)
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <ImageGallery images={shop.images} />

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Owner:</strong> {shop.name}</p>
                <p><strong>Email:</strong> {shop.email}</p>
                <p><strong>Phone:</strong> {shop.shopPhone}</p>
                <p><strong>Established:</strong> {shop.yearofEstablishment}</p>
                <p><strong>Price:</strong> ₹{shop.price}/hr</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Location & Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Location:</strong> {shop.shopLocation}</p>
                <p><strong>Address:</strong> {shop.address}</p>
                <p><strong>PIN:</strong> {shop.pincode}</p>
                <p><strong>Hours:</strong> {shop.openingTime} - {shop.closingTime}</p>
                <p><strong>Specifications:</strong> {shop.shopSpecs}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {shop.reviews && shop.reviews.length > 0 ? (
                  shop.reviews.map((review, index) => (
                    <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <div className="flex items-center">
                            <StarRating rating={review.star} onRatingChange={() => {}} />
                            <span className="ml-2 text-sm text-gray-500">
                              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-medium mb-1">{review.review}</h4>
                      <p className="text-gray-600">{review.body}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No reviews yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block mb-2">Rating</label>
                  <StarRating
                    rating={newReview.star}
                    onRatingChange={(rating) =>
                      setNewReview({ ...newReview, star: rating })
                    }
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Your Name</label>
                  <Input
                    value={newReview.name}
                    onChange={(e) =>
                      setNewReview({ ...newReview, name: e.target.value })
                    }
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Review Title</label>
                  <Input
                    value={newReview.review}
                    onChange={(e) =>
                      setNewReview({ ...newReview, review: e.target.value })
                    }
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2">Review Details</label>
                  <Textarea
                    value={newReview.body}
                    onChange={(e) =>
                      setNewReview({ ...newReview, body: e.target.value })
                    }
                    required
                  />
                </div>

                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit">Submit Review</Button>
              </form>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopDetail;