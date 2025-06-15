import type { LucideProps } from 'lucide-react';

export function AvaLogoIcon(props: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 75 24" // Adjusted viewBox slightly for "AVA" text
      fill="currentColor"
      {...props} // Spread props to allow overriding size, className, etc.
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif" // Using the project's headline font
        fontSize="22" // Adjusted font size to fit well
        fontWeight="bold"
      >
        AVA
      </text>
    </svg>
  );
}
