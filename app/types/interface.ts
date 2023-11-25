export interface simplifiedProduct {
  _id: string;
  imagesUrl: string;
  price: number;
  name: string;
  slug: string;
  categoryName: string;
}
export interface fullProduct {
  _id: string;
  images: any;
  description: string;
  price: number;
  name: string;
  slug: string;
  categoryName: string;
  price_id: string;
}
