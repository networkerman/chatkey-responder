
import React, { useState } from "react";
import { CarouselItem as CarouselItemType } from "@/lib/types/whatsapp-template";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PreviewButtons from "./PreviewButtons";

interface PreviewCarouselProps {
  items: CarouselItemType[];
}

const PreviewCarousel: React.FC<PreviewCarouselProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>
            <Card className="border-0 shadow-none">
              <CardContent className="p-0">
                {item.imageUrl && (
                  <img 
                    src={item.imageUrl || "/placeholder.svg"} 
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-2">
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                </div>
              </CardContent>
              {item.buttons && item.buttons.length > 0 && (
                <CardFooter className="p-2 pt-0">
                  <PreviewButtons buttons={item.buttons} />
                </CardFooter>
              )}
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-4" />
      <CarouselNext className="-right-4" />
    </Carousel>
  );
};

export default PreviewCarousel;
