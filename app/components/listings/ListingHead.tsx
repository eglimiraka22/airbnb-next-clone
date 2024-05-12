"use client";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({
  id,
  imageSrc,
  locationValue,
  title,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  //  Property 'region' does not exist on type 'never[]'.ts(2339)

 
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location && location?.region}, ${location?.label}`}
      />
      <div
        className='
      w-full
      h-[60vh]
      overflow-hidden
      rounded-xl
      relative
      '
      >
        <Image
          alt='Image'
          src={imageSrc}
          fill
          className='object-cover w-full  '
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority={true}
        />
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
