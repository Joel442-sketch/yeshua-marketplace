export const formatPrice = (price: number, currency = "ETB"): string => {
  return `${currency} ${price.toLocaleString("en-US")}`;
};

export const getDiscount = (price: number, originalPrice?: number): number | null => {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const renderStars = (rating: number): string[] => {
  const stars: string[] = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push("full");
    else if (i - rating < 1) stars.push("half");
    else stars.push("empty");
  }
  return stars;
};
