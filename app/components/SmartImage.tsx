"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image that falls back to a placeholder if the source 404s — used for the
 * ~60 ported destinations that have no hero image on disk yet.
 */
export function SmartImage({
  src,
  fallback = "/images/barcelona/placeholder.webp",
  alt,
  ...rest
}: Omit<ImageProps, "src"> & { src: string; fallback?: string }) {
  const [current, setCurrent] = useState(src);
  return <Image {...rest} alt={alt} src={current} onError={() => setCurrent(fallback)} />;
}
