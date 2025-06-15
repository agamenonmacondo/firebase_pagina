import Image from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';

interface AvaLogoIconProps extends Omit<NextImageProps, 'src' | 'alt'> {
  width?: number;
  height?: number;
  className?: string;
}

export function AvaLogoIcon({ width = 75, height = 24, className, ...props }: AvaLogoIconProps) {
  return (
    <Image
      src="/ava_logo.png" // This path is relative to the public directory
      alt="AgenteAVA Logo"
      width={width} // Default width if not overridden by className or specific props
      height={height} // Default height if not overridden by className or specific props
      className={className}
      priority // Add priority if this is a critical LCP element, e.g., in the header
      {...props}
    />
  );
}
