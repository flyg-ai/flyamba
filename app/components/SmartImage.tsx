"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image that falls back to a placeholder if the source 404s.
 *
 * The fallback must stay a generic, landmark-free image: it previously pointed
 * at /images/barcelona/placeholder.webp, which is a photo of the Eiffel Tower,
 * so every destination without a hero on disk illustrated itself with Paris.
 */
export function SmartImage({
  src,
  fallback = "/images/destinations/placeholder.avif",
  alt,
  ...rest
}: Omit<ImageProps, "src"> & { src: string; fallback?: string }) {
  const [current, setCurrent] = useState(src);
  return <Image {...rest} alt={alt} src={current} onError={() => setCurrent(fallback)} />;
}
