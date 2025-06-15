import Image from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';

interface AvaLogoIconProps extends Omit<NextImageProps, 'src' | 'alt'> {
  // width and height will be passed directly to NextImageProps
  // but we default them here for the specific logo.
  // className is part of NextImageProps
}

export function AvaLogoIcon({ width = 75, height = 24, className, ...props }: AvaLogoIconProps) {
  return (
    <Image
      src="/images/ava-logo.png" // User must create public/images/ava-logo.png
      alt="AgenteAVA Logo"
      width={width} // Intrinsic width for aspect ratio, can be overridden via props
      height={height} // Intrinsic height for aspect ratio, can be overridden via props
      className={className} // Applied to the Next.js Image component for display sizing
      data-ai-hint="AVA logo"
      {...props} // Spread other valid NextImageProps
    />
  );
}
