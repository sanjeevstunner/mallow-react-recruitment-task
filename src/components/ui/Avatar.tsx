import * as React from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, fallback, className }) => (
  <RadixAvatar.Root className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-muted ${className || ""}`} style={{ width: 40, height: 40 }}>
    {src ? (
      <RadixAvatar.Image src={src} alt={alt} className="object-cover w-full h-full" />
    ) : (
      <RadixAvatar.Fallback className="text-lg font-semibold text-muted-foreground">
        {fallback}
      </RadixAvatar.Fallback>
    )}
  </RadixAvatar.Root>
); 