export type ProductImage = {
  url: string;
  alt: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  availability: string;
  highlight: string;
  images: ProductImage[];
  specs: string[];
  rating: number;
  reviewsCount: number;
  reviews: Review[];
};

export async function fetchMockProduct(): Promise<Product> {
  // Pretend SSR/data fetching delay
  await new Promise((r) => setTimeout(r, 10));

  const images: ProductImage[] = [
    {
      url:
        "https://images.unsplash.com/photo-1581093588401-16b1b3b48a28?q=80&w=1200&auto=format&fit=crop",
      alt: "IC 7400 main",
    },
    {
      url:
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop",
      alt: "IC close-up 1",
    },
    {
      url:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      alt: "IC close-up 2",
    },
  ];

  const reviews: Review[] = [
    {
      id: "r1",
      author: "M Hasan",
      rating: 5,
      comment:
        "Solid NAND gate IC for quick logic labs. Worked flawlessly on breadboard.",
      date: "2025-09-12",
    },
    {
      id: "r2",
      author: "R Khan",
      rating: 4,
      comment: "Good quality. Pins were straight and easy to solder.",
      date: "2025-10-03",
    },
  ];

  const product: Product = {
    id: "ic-7400",
    name: "IC 7400",
    category: "Digital ICs",
    price: 29.59,
    currency: "৳",
    availability: "Available",
    highlight: "Quad 2-Input NAND Gate",
    images,
    specs: [
      "Technology: TTL",
      "Supply voltage: 4.75 V – 5.25 V",
      "Inputs: 2 per gate, 4 gates total",
      "Package: DIP-14 (mock)",
    ],
    rating: 4.5,
    reviewsCount: reviews.length,
    reviews,
  };

  return product;
}


