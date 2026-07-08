type OptimizedImageProps = {
  src: string;
  alt?: string;
  className?: string;
  /** Hint for browser layout — does not resize CDN image */
  width?: number;
  height?: number;
};

/** Lazy-loaded image with async decode for smoother scrolling */
export function OptimizedImage({
  src,
  alt = '',
  className = '',
  width,
  height,
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      width={width}
      height={height}
    />
  );
}
