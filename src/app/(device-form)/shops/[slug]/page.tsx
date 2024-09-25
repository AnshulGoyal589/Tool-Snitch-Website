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

    const shop = await getShopDetails(params.slug);
    console.log(shop);

    return (
        
        <>
        <ShopHero {...shop}/>
        <ReviewSection/>
        </>
    )
}