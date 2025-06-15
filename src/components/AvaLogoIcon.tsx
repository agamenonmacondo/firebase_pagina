import Image from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';

interface AvaLogoIconProps extends Omit<NextImageProps, 'src' | 'alt'> {
  // Default width and height for this specific logo, can be overridden by props.
  width?: number;
  height?: number;
  className?: string;
}

export function AvaLogoIcon({ width = 75, height = 24, className, ...props }: AvaLogoIconProps) {
  return (
    <Image
      src="/images/ava_logo.png" // Expects ava_logo.png in public/images/
      alt="AgenteAVA Logo"
      width={width}
      height={height}
      className={className}
      {...props} // Spread other valid NextImageProps
    />
  );
}
