import packageImage from "./../../public/assets/png/enlarged.png";
import productImage from "./../../public/assets/webp/big-product.webp";
import { Package, Product } from "@/types/package";

export const mockProducts: Product[] = [
  {
    id: 'p1',
    image: productImage,
    name: '3-Seater Sofa',
    description: 'Upholstered fabric, wooden legs',
    amount: 1299.99,
    status: 'In stock',
    quantity: 15
  },
  {
    id: 'p2',
    image: productImage,
    name: 'Coffee Table',
    description: 'Wooden table with storage compartment',
    amount: 449.99,
    status: 'In stock',
    quantity: 25
  },
  {
    id: 'p3',
    image: productImage,
    name: 'Dining Table',
    description: 'Solid dining table that seats 6 people',
    amount: 899.99,
    status: 'In stock',
    quantity: 12
  },
  {
    id: 'p4',
    image: productImage,
    name: 'Dining Chairs (Set of 4)',
    description: 'Matching chairs with cushioned seats',
    amount: 599.99,
    status: 'In stock',
    quantity: 20
  },
  {
    id: 'p5',
    image: productImage,
    name: 'Bookshelf',
    description: 'Bookshelf perfect for living room',
    amount: 349.99,
    status: 'In stock',
    quantity: 18
  },
  {
    id: 'p6',
    image: productImage,
    name: 'TV Stand',
    description: 'Modern TV stand with cable management',
    amount: 279.99,
    status: 'In stock',
    quantity: 22
  },
  {
    id: 'p7',
    image: productImage,
    name: 'Accent Chair',
    description: 'Stylish chair perfect for reading corner',
    amount: 399.99,
    status: 'In stock',
    quantity: 30
  },
  {
    id: 'p8',
    image: productImage,
    name: 'Side Table',
    description: 'Compact side table with drawer for bedside',
    amount: 179.99,
    status: 'In stock',
    quantity: 35
  },
  {
    id: 'p9',
    image: productImage,
    name: 'Floor Lamp',
    description: 'Modern floor lamp with adjustable brightness',
    amount: 199.99,
    status: 'In stock',
    quantity: 28
  },
  {
    id: 'p10',
    image: productImage,
    name: 'Area Rug',
    description: 'Area rug 8x10 ft with modern geometric pattern',
    amount: 329.99,
    status: 'In stock',
    quantity: 16
  }
];

export const mockPackages: Package[] = [
  {
    id: 'pkg1',
    image: packageImage,
    title: 'Modern Living Room Set',
    description: 'Complete modern living room with sofa, coffee table, and accent pieces',
    amount: 1979.96,
    discount: 25,
    bundlesInStock: 8,
    products: [mockProducts[0], mockProducts[1], mockProducts[6], mockProducts[9]]
  },
  {
    id: 'pkg2',
    image: packageImage,
    title: 'Elegant Dining Experience',
    description: 'Transform your dining space with this complete dining set',
    amount: 1499.98,
    discount: 20,
    bundlesInStock: 12,
    products: [mockProducts[2], mockProducts[3]]
  },
  {
    id: 'pkg3',
    image: packageImage,
    title: 'Cozy Reading Corner',
    description: 'Create the perfect reading nook with comfortable seating and lighting',
    amount: 929.97,
    discount: 18,
    bundlesInStock: 15,
    products: [mockProducts[6], mockProducts[7], mockProducts[8], mockProducts[4]]
  },
  {
    id: 'pkg4',
    image: packageImage,
    title: 'Entertainment Center Bundle',
    description: 'Complete entertainment setup for your living room',
    amount: 1329.97,
    discount: 22,
    bundlesInStock: 10,
    products: [mockProducts[0], mockProducts[5], mockProducts[8]]
  },
  {
    id: 'pkg5',
    image: packageImage,
    title: 'Minimalist Home Office',
    description: 'Clean and functional furniture for your home workspace',
    amount: 729.97,
    discount: 15,
    bundlesInStock: 18,
    products: [mockProducts[4], mockProducts[7], mockProducts[8]]
  },
  {
    id: 'pkg6',
    image: packageImage,
    title: 'Complete Home Makeover',
    description: 'Everything you need to furnish your entire living space',
    amount: 4359.91,
    discount: 30,
    bundlesInStock: 5,
    products: mockProducts.slice(0, 8)
  }
];