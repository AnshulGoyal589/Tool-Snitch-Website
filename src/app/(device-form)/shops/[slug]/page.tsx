'use client'

import { ReviewSection, ShopHero } from "@/components";
import { api } from "@/api/api";
import { useEffect } from 'react';

export default async function ShopDetailsPage({params} : {params: {slug: string}}) {

    async function getShopDetails(slug: string) {
        try {
            const response = await api.get(`/read/shopData/${slug}`);
            return response.data;
        } catch (error) {
            return null;
        }
    }
    useEffect(() => {
        localStorage.setItem("shopID", params.slug);
    }, [params.slug]);

    const data = await getShopDetails(params.slug);

    if(!data && params.slug !== "ab-rb-er-21") {
        return <div className="min-h-[40vh] flex justify-center items-center">
            <h1 className="text-8xl font-black text-gray-200 dark:text-gray-700">Shop Not Found</h1>
        </div>
    }
    console.log("Data of images: ",data.images);
    let shop;
    if(params.slug !== "ab-rb-er-21") {
        shop =  {
            id : data._id,
            shopName: data.shopName,
            rating: data.rating,
            location: data.location,
            address: data.address,
            openingTime : data.openingTime,
            closingTime : data.closingTime,
            services: [data.devicesDeal],
            description: data.desc,
            images: data.images.map((image:string, index:number) => ({id: index, url: image, name: `image-${index}`})),
        }
        return (
            <>
            <ShopHero {...shop} path = {`${params.slug}`}/>
            <ReviewSection/>
            </>
        )
    }

    return (
        
        <>
        <ShopHero  path = {`${params.slug}`}/>
        <ReviewSection/>
        </>
    )
}