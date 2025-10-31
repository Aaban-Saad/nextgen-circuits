"use client";

import { useState } from "react";
import type { ProductImage } from "../data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ImageGallery({ images }: { images: ProductImage[] }) {
  const [index, setIndex] = useState(0);
  const active = images[index] ?? images[0];

  return (
    <div>
      <Card className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-white flex items-center justify-center">
        <Image
          src={active.url}
          alt={active.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain"
          unoptimized
        />
      </Card>
      <div className="mt-4 flex gap-4 overflow-x-auto">
        {images.map((img, i) => (
          <Button
            key={img.url}
            type="button"
            variant="outline"
            onClick={() => setIndex(i)}
            className={
              "h-20 w-28 flex-none p-0 rounded-lg overflow-hidden " +
              (i === index ? "border-primary" : "border-primary/20 hover:border-primary")
            }
            aria-label={`Thumbnail ${i + 1}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              width={112}
              height={80}
              className="h-full w-full object-cover"
              unoptimized
            />
          </Button>
        ))}
      </div>
    </div>
  );
}


