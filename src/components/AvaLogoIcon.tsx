import Image from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';

// No import for logoAsset needed when served from public

interface AvaLogoIconProps extends Omit<NextImageProps, 'src' | 'alt'> {
  width?: number;
  height?: number;
  className?: string;
}

export function AvaLogoIcon({ width = 75, height = 24, className, ...props }: AvaLogoIconProps) {
  return (
    <Image
      src="/ava_logo.png" // Path relative to the public directory
      alt="AgenteAVA Logo"
      width={width} // Explicit width and height are generally required for public images
      height={height}
      className={className}
      {...props}
    />
  );
}
