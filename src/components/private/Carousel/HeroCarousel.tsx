"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ClassNames from 'embla-carousel-class-names';
import { cn } from "@/lib/utils";

const HeroCarousel = ({name,className, list, orientation="vertical"}: {name: string, className?: string, list: {id: number, name?: string, url: string}[], orientation?: "horizontal" | "vertical"}) => {
    const Carname = name?.replace(/\s/g, "-").toLowerCase();
    const productImages = list || [];
    const autoscroll  = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true})
      );
    const [thumbRef, setthumbRef] = useState();
    const [imageRef, setImageRef] = useState();
    const [viewOrientation, setViewOrientation] = useState(orientation);
    const [index , setIndex] = useState(0);

    useEffect(() => {
        if(!thumbRef || !imageRef) return;
        thumbRef.scrollTo(index);

    }, [index, thumbRef, imageRef]);

    useEffect(() => {
        if(!thumbRef || !imageRef) return;
        imageRef.on("select", (api) => {
            setIndex(api.selectedScrollSnap());
        });
        return () => {
            imageRef.off("select");
        }
    }, [thumbRef, imageRef]);

    const onThumbClick = useCallback((index) => {
        console.log(thumbRef, imageRef);
        if(!imageRef || !thumbRef) return;
        imageRef.scrollTo(index);
        thumbRef.scrollTo(index);
    }
    , [thumbRef, imageRef]);

    const mobileHander = useCallback(() => {
        if(window.innerWidth < 768){
            setViewOrientation("horizontal");
        }else{
            setViewOrientation(orientation);
        }
    }, [orientation]);
        

    useEffect(() => {
        window.addEventListener("resize", mobileHander);
        return () => {
            window.removeEventListener("resize", mobileHander);
        }
    }, [mobileHander]);

  return (
    <div className={cn("mx-auto flex justify-center items-center gap-4 w-full h-full",
    viewOrientation==="vertical"? "flex-row" : "flex-col-reverse",
         className)}>
        <div>
        <Carousel className=""
                orientation={viewOrientation}
                setApi={setthumbRef}
                axis={viewOrientation==="vertical"? "y" : "x"}
                plugins={[ClassNames({
                    snapped : "thumbCarousel__snapped",
                    inView: "",
                  })]}
                opts={{
                    align: "center",
                    loop: true,
                }}>
                
                <CarouselContent className={cn("",
                    viewOrientation==="vertical"? "max-h-[400px] mx-2" : "my-2 w-full max-w-[400px]"
                )}>
                    {productImages && productImages.map((product,index) => (
                        <CarouselItem key={`thum-${Carname}-${product.id}`} className={cn(
                            "my-1 mx-2 ",
                            viewOrientation==="vertical"? "" :"basis-1/4 h-24 w-24 "
                        )}>
                            <Button variant="ghost" className="aspect-square rounded-xl bg-gray-100/80  w-24 h-20 transition-all ease-in-out duration-300 ring-4 ring-gray-300 " onClick={() => onThumbClick(index)}>
                            <Avatar className="aspect-square rounded-xl w-24 h-20">
                                <AvatarImage src={product.url} alt={product.name} className="bg-gray-100 w-full aspect-[24/20] rounded-xl object-contain" />
                                <AvatarFallback className="text-black bg-gray-100/80 text-sm w-full h-full rounded-xl">
                                    {product.name}
                                </AvatarFallback>
                            </Avatar>
                            </Button>
                        </CarouselItem>
                    ))}
                      
                </CarouselContent>
            </Carousel>
        </div>
        <div className="flex justify-center items-center ">
            <Carousel className="w-full max-w-md "
                setApi={setImageRef}
                onMouseEnter={() => autoscroll.current.stop()}
                onMouseLeave={() => autoscroll.current.play()}
                plugins={[autoscroll.current]}
                opts={{
                    align: "center",
                    loop: true,
                }}>
                <CarouselContent className=" ">
                 
                    {productImages && productImages.map((product) => (
                        <CarouselItem key={`image-${Carname}-${product.id}`} className="w-full aspect-[6/4]">
                            <Avatar className="w-full h-full rounded-xl">
                                <AvatarImage src={product.url} alt={product.name} className="bg-gray-100/80 w-full h-full rounded-xl object-contain" />
                                <AvatarFallback className="text-black bg-gray-100/80 text-sm w-full h-full rounded-xl">
                                    {product.name}
                                </AvatarFallback>
                            </Avatar>
                        </CarouselItem>
                    ))}
                      
                </CarouselContent>
            </Carousel>
        </div>
    </div>
  )
};



export default HeroCarousel;
// ProductCarousel.propTypes = {
//     name: PropTypes.string,
//     className: PropTypes.string,
//     list: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number,
//             name: PropTypes.string,
//             image: PropTypes.string
//         })
//     ),
//     orientation: PropTypes.oneOf(["horizontal", "vertical"])
// }