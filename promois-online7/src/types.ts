export interface Product {
  id: string;
  name: string;
  badge: string;
  rating: number;
  reviewsCount: number;
  currentPrice: number;
  oldPrice: number;
  discount: number;
  savings: number;
  images: string[];
  sku?: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  image: string;
  rating: number;
  oldPrice: number;
  currentPrice: number;
  soldCount: number;
  discount: number;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}
