import { ReviewSection, ShopHero } from "@/components";
import { api } from "@/api/api";

export default async function ShopDetailsPage({params} : {params: {slug: string}}) {

    async function getShopDetails(slug: string) {
        try {
            const response = await api.get(`/read/shopData/${slug}`);
            return response.data;
        } catch (error) {
            // console.error(error.message);
            return null;
        }
    }

    const data = await getShopDetails(params.slug);

    if(!data) {
        return <div className="min-h-[40vh] flex justify-center items-center">
            <h1 className="text-8xl font-black text-gray-200 dark:text-gray-700">Shop Not Found</h1>
        </div>
    }

    
    const shop =  {
            id : data._id,
            shopName: data.shopName,
            rating: data.rating,
            address: data.location,
            timings: {
                open: data.openTime || "10:00 AM",
                close: data.closeTime || "8:00 PM"
            },
            services: data.devicesDeal,
            description: data.desc,
            images: data.images.map((image:string, index:number) => ({id: index, url: image, name: `image-${index}`})),
            city: data.shopKeeper.state
        }

    return (
        
        <>
        <ShopHero {...shop}/>
        <ReviewSection/>
        </>
    )
}