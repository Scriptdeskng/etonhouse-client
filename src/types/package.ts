import { StaticImageData } from "next/image";

export interface Product {
  id: string;
  image: StaticImageData | string;
  name: string;
  description: string;
  amount: number;
  status: 'In stock' | 'out of stock';
  quantity: number;
}

export interface Package {
  id: string;
  image: StaticImageData | string;
  title: string;
  description: string;
  amount: number;
  discount: number;
  bundlesInStock: number;
  products: Product[];
}