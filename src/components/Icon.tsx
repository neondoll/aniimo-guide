import { assetUrl } from "../lib/assets";

interface IconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function Icon({ src, alt, size = 16, className }: IconProps) {
  if (!src) return null;

  return (
    <img
      src={assetUrl(src)}
      alt={alt}
      title={alt}
      width={size}
      height={size}
      className={`inline-block align-text-bottom ${className ?? ""}`}
    />
  );
}