
export const formatPriceRange = (priceRange: string): string => {
  if (!priceRange) return '';
  
  const prices = priceRange.split(' - ');

  const formattedPrices = prices.map(price => {
    const numPrice = Math.floor(parseFloat(price));
    
    return '₦' + numPrice.toLocaleString('en-US');
  });
  
  return formattedPrices.join(' - ');
};

export const formatPrice = (price: string | number): string => {
  const numPrice = Math.floor(typeof price === 'string' ? parseFloat(price) : price);
  return numPrice.toLocaleString('en-US');
};