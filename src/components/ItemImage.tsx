import React from "react";

interface ItemImageProps {
  imageUrl?: string;
  name: string;
  className?: string;
}

export const ItemImage = ({ imageUrl, name, className = "w-6 h-6" }: ItemImageProps) => {
  if (!imageUrl) return null;
  
  return (
    <img
      src={imageUrl}
      alt={name}
      className={`${className} object-contain`}
    />
  );
};