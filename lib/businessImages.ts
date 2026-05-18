export const BUSINESS_CATEGORY_IMAGES: Record<string, string> = {
  "Food & Drink":
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85",
  Retail:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85",
  Services:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=85",
  Tech:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85",
  Manufacturing:
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=85",
  Sports:
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=85",
};

export const getBusinessCategoryImage = (category: string) => {
  return BUSINESS_CATEGORY_IMAGES[category] ?? BUSINESS_CATEGORY_IMAGES.Retail;
};
