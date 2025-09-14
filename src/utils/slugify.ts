import { Package } from "@/types/package";

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Replace multiple hyphens with single
    .trim()                       // Remove leading/trailing spaces
    .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens
};

export const findPackageBySlug = (packages: Package[], slug: string): Package | undefined => {
  return packages.find(pkg => createSlug(pkg.title) === slug);
};