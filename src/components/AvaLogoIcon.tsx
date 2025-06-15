import Image from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';
import logoAsset from '../lib/ava_logo.png'; // Import the logo using a relative path

interface AvaLogoIconProps extends Omit<NextImageProps, 'src' | 'alt'> {
  // width and height will be passed directly to NextImageProps
  // If you provide width/height directly in the component usage, they will override these defaults.
  // If className specifies width/height (e.g., h-6 w-6), those might take precedence depending on CSS specificity.
  width?: number;
  height?: number;
  className?: string;
}

export function AvaLogoIcon({ width = 75, height = 24, className, ...props }: AvaLogoIconProps) {
  return (
    <Image
      src={logoAsset} // Use the imported asset
      alt="AgenteAVA Logo"
      width={width} // Default width, can be overridden
      height={height} // Default height, can be overridden
      className={className}
      priority // Add priority if this is a critical LCP element, e.g., in the header
      {...props}
    />
  );
}
