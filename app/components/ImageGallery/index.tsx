"use client";
import { urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { useState } from "react";

interface iAppProps {
  images: any;
  name: string;
}
export default function ImageGallery({ images, name }: iAppProps) {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
  };
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col ">
        {images.map((image: any, index: number) => (
          <div key={index} className="overflow-hidden rounded-lg bg-gray-100 ">
            <Image
              src={urlFor(image).url()}
              alt={name + index}
              width={200}
              height={200}
              className="h-full w-full cursor-pointer object-cover object-center"
              onClick={() => handleSmallImageClick(image)}
              onMouseEnter={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      <div className="lg relative col-span-4 overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={urlFor(bigImage).url()}
          alt={name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center "
        />
      <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 tex-sm uppercase tracking-wide text-white py-1.5 ">Sale</span>
      </div>
    </div>
  );
}
