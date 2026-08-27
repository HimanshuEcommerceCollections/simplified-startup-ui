"use client";

import { createElement, type CSSProperties, type ElementType, type HTMLAttributes } from "react";
import { useInView } from "@/lib/useInView";

type RevealProps = {
  /** Element to render (default: div) */
  as?: ElementType;
  /**
   * When set, renders the about-page `data-anim` variant (e.g. "rise", "pop")
   * instead of the `.reveal` class.
   */
  anim?: string;
  /** Stagger index — becomes the `--i` custom property. */
  index?: number;
  threshold?: number;
  [dataAttr: `data-${string}`]: unknown;
} & HTMLAttributes<HTMLElement>;

/** Scroll-reveal wrapper: adds the `in` class once the element enters the viewport. */
export default function Reveal({
  as = "div",
  anim,
  index,
  threshold = 0.16,
  className = "",
  style,
  children,
  ...rest
}: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>({ threshold });

  const classes = [anim ? "" : "reveal", className, inView ? "in" : ""]
    .filter(Boolean)
    .join(" ");

  const mergedStyle: CSSProperties | undefined =
    index !== undefined ? ({ ...style, "--i": index } as CSSProperties) : style;

  return createElement(
    as,
    {
      ref,
      className: classes,
      style: mergedStyle,
      ...(anim ? { "data-anim": anim } : {}),
      ...rest,
    },
    children
  );
}
