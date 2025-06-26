import * as React from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "lead"
  | "large"
  | "small"
  | "muted"
  | "blockquote"
  | "inlineCode"
  | "list"
  | "code";

type VariantDefinition<T extends keyof React.JSX.IntrinsicElements> = {
  tag: T;
  className: string;
};

const variantMap: Record<Variant, VariantDefinition<keyof React.JSX.IntrinsicElements>> = {
  h1: {
    tag: "h1",
    className: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  },
  h2: {
    tag: "h2",
    className: "scroll-m-20 text-3xl font-semibold tracking-tight",
  },
  h3: {
    tag: "h3",
    className: "scroll-m-20 text-2xl font-semibold tracking-tight",
  },
  h4: {
    tag: "h4",
    className: "scroll-m-20 text-xl font-semibold tracking-tight",
  },
  h5: {
    tag: "h5",
    className: "scroll-m-20 text-lg font-semibold tracking-tight",
  },
  h6: {
    tag: "h6",
    className: "scroll-m-20 text-base font-medium tracking-tight",
  },
  p: { tag: "p", className: "leading-7 [&:not(:first-child)]:mt-6" },
  lead: { tag: "p", className: "text-xl text-muted-foreground" },
  large: { tag: "div", className: "text-lg font-semibold" },
  small: { tag: "small", className: "text-sm font-medium leading-none" },
  muted: { tag: "p", className: "text-sm text-muted-foreground" },
  blockquote: { tag: "blockquote", className: "mt-6 border-l-2 pl-6 italic" },
  inlineCode: {
    tag: "code",
    className:
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  },
  list: { tag: "ul", className: "my-6 ml-6 list-disc [&>li]:mt-2" },
  code: {
    tag: "pre",
    className:
      "mt-6 mb-4 overflow-x-auto rounded-lg bg-black py-4 px-4 text-sm text-white",
  },
} as const;

type VariantKey = keyof typeof variantMap;
type VariantTag<K extends VariantKey> = (typeof variantMap)[K]["tag"];
type PropsOf<K extends keyof React.JSX.IntrinsicElements> = React.JSX.IntrinsicElements[K];

type TypographyProps<K extends VariantKey = "p"> = {
  variant?: K;
  className?: string;
  children: React.ReactNode;
} & PropsOf<VariantTag<K>>;

export const Typography = <K extends VariantKey = "p">({
  variant = "p" as K,
  className,
  children,
  ...props
}: TypographyProps<K>) => {
  const { tag, className: variantClassName } = variantMap[variant];
  const Component = tag;

  return (
    <Component className={cn(variantClassName, className)} {...(props as object)}>
      {children}
    </Component>
  );
};
