export type ListProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number; // 1-5
  image: string;
};

export type ProductQuery = {
  q?: string; // name search
  category?: string | string[];
  min?: number;
  max?: number;
  rating?: number; // minimum
};

export const CATEGORIES: string[] = [
  "Raspberry Pi",
  "Arduino",
  "Sensors",
  "Modules",
  "Digital ICs",
];

export const MOCK_PRODUCTS: ListProduct[] = [
  {
    id: "p1",
    name: "Raspberry Pi 4 Model B (4GB)",
    category: "Raspberry Pi",
    price: 7500,
    rating: 5,
    image: "https://placehold.co/400x300?text=Raspberry+Pi",
  },
  {
    id: "p2",
    name: "Arduino UNO R3",
    category: "Arduino",
    price: 850,
    rating: 4.5,
    image: "https://placehold.co/400x300?text=Arduino+UNO",
  },
  {
    id: "p3",
    name: "HC-SR04 Ultrasonic Sensor",
    category: "Sensors",
    price: 120,
    rating: 4,
    image: "https://placehold.co/400x300?text=Ultrasonic+Sensor",
  },
  {
    id: "p4",
    name: "16x2 LCD Display Module",
    category: "Modules",
    price: 220,
    rating: 3.5,
    image: "https://placehold.co/400x300?text=LCD+Display",
  },
  {
    id: "p5",
    name: "IC 7400 Quad 2-Input NAND",
    category: "Digital ICs",
    price: 30,
    rating: 4.2,
    image: "https://placehold.co/400x300?text=IC+7400",
  },
  {
    id: "p6",
    name: "DHT22 Temperature & Humidity Sensor",
    category: "Sensors",
    price: 350,
    rating: 4.1,
    image: "https://placehold.co/400x300?text=DHT22+Sensor",
  },
  {
    id: "p7",
    name: "OLED 0.96'' I2C Display",
    category: "Modules",
    price: 280,
    rating: 4.3,
    image: "https://placehold.co/400x300?text=OLED+Display",
  },
];

export function filterProducts(
  products: ListProduct[],
  query: ProductQuery
): ListProduct[] {
  const categories = Array.isArray(query.category)
    ? query.category
    : query.category
    ? [query.category]
    : [];

  return products.filter((p) => {
    if (query.q && !p.name.toLowerCase().includes(query.q.toLowerCase())) {
      return false;
    }

    if (categories.length > 0 && !categories.includes(p.category)) {
      return false;
    }

    if (typeof query.min === "number" && p.price < query.min) {
      return false;
    }
    if (typeof query.max === "number" && p.price > query.max) {
      return false;
    }
    if (typeof query.rating === "number" && p.rating < query.rating) {
      return false;
    }
    return true;
  });
}


