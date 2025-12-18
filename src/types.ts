import type { ElementType } from "react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: ElementType;
};

export type Blog = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
};
