import { Product, Variant } from "@/types/product";

export const calculatePriceRange = (product: Product): string => {
  if (product.price_range) {
    return product.price_range;
  }

  if (!product.variants || product.variants.length === 0) {
    return "₦0";
  }

  const prices = product.variants.map((v) => parseFloat(v.current_price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (minPrice === maxPrice) {
    return `₦${minPrice.toLocaleString()}`;
  }

  return `₦${minPrice.toLocaleString()} - ₦${maxPrice.toLocaleString()}`;
};


export const getProductImage = (product: Product): string => {
  if (!product.images || product.images.length === 0) {
    return "/assets/images/placeholder.png";
  }

  const featured = product.images.find((img) => img.is_featured);
  return featured?.image || product.images[0].image;
};

export const calculatePriceLimits = (
  variants: Variant[]
): { min: number; max: number } => {
  if (!variants || variants.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = variants.map((v) => parseFloat(v.current_price));
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

export const hasMultiplePrices = (product: Product): boolean => {
  if (!product.variants || product.variants.length === 0) {
    return false;
  }

  const prices = new Set(
    product.variants.map((v) => parseFloat(v.current_price))
  );
  return prices.size > 1;
};

export const getTotalStock = (product: Product): number => {
  if (!product.variants || product.variants.length === 0) {
    return 0;
  }

  return product.variants.reduce((total, variant) => total + variant.stock, 0);
};

export const isProductAvailable = (product: Product): boolean => {
  if (!product.variants || product.variants.length === 0) {
    return false;
  }

  return product.variants.some(
    (v) => v.stock > 0 || v.allow_backorders
  );
};

export const getUniqueColors = (product: Product) => {
  if (!product.variants) return [];
  
  const colorsMap = new Map();
  product.variants.forEach((v) => {
    if (v.color && !colorsMap.has(v.color.id)) {
      colorsMap.set(v.color.id, v.color);
    }
  });
  
  return Array.from(colorsMap.values());
};

export const getUniqueSizes = (product: Product) => {
  if (!product.variants) return [];
  
  const sizesMap = new Map();
  product.variants.forEach((v) => {
    if (v.size && !sizesMap.has(v.size.id)) {
      sizesMap.set(v.size.id, v.size);
    }
  });
  
  return Array.from(sizesMap.values());
};


export const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) {
    return "₦0";
  }
  
  return `₦${numPrice.toLocaleString()}`;
};

export const calculateDiscount = (
  basePrice: string | number,
  discountPrice: string | number
): number => {
  const base = typeof basePrice === "string" ? parseFloat(basePrice) : basePrice;
  const discount =
    typeof discountPrice === "string"
      ? parseFloat(discountPrice)
      : discountPrice;

  if (isNaN(base) || isNaN(discount) || base === 0) {
    return 0;
  }

  return Math.round(((base - discount) / base) * 100);
};

export const normalizeProduct = (product: any): Product => {
  return {
    ...product,
    price_range: product.price_range || calculatePriceRange(product),
    min_price: product.min_price || calculatePriceLimits(product.variants).min.toString(),
    max_price: product.max_price || calculatePriceLimits(product.variants).max.toString(),
    care_description: product.care_description || "",
    sustainability_description: product.sustainability_description || "",
    dimensions: product.dimensions || "",
  };
};