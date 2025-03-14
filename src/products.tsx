// products.ts
export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isFavorite?: boolean;
  inventory: number;
};

// products.ts
export const products: Product[] = [
  { 
    id: 1, 
    name: 'Seahawks Hat', 
    price: 29.99, 
    description: 'Official Seattle Seahawks cap featuring team colors and logo.', 
    imageUrl: 'https://images.vintagebrand.com/pi?p=MD112-R_ROYAL_Front&geom=553%2C817%2C1190%2C803%2C536%2C1167%2C1207%2C1173&meshType=flat&h=600&a=9dd3041f239bfbf7d404256f09e3f4e7%240.5413884670484232%2C0.2878912789481027%2C-0.30973451327433627%2C-0.1498319327731092%2C0',
    inventory: 10
  },
  { 
    id: 2, 
    name: 'Steve Largent Throwback Jersey', 
    price: 119.95, 
    description: 'Vintage Seattle Seahawks jersey honoring NFL legend Steve Largent.',
    imageUrl: 'https://fanatics.frgimages.com/seattle-seahawks/mens-mitchell-and-ness-steve-largent-white-seattle-seahawks-legacy-replica-jersey_pi3610000_ff_3610466-df26d88aaa6dbca87300_full.jpg?_hv=2&w=600',
    inventory: 5 
  },
  { 
    id: 3, 
    name: 'Seahawks Jacket', 
    price: 89.99, 
    description: 'Stylish Seattle Seahawks jacket featuring team colors and embroidered logo.',
    imageUrl: 'https://fanatics.frgimages.com/seattle-seahawks/mens-starter-college-navy/neon-green-seattle-seahawks-enforcer-satin-varsity-full-snap-jacket_pi3980000_altimages_ff_3980485-5c7e0933eb3c974f346aalt5_full.jpg?_hv=2&w=900',
    inventory: 15
  },
  { 
    id: 4, 
    name: 'Keychain', 
    price: 5.57, 
    description: 'A high-quality keychain with a sleek design.', 
    imageUrl: 'https://images.jewelers.services/qgrepo/GM28528-SEA.jpg?w=566&h=566',
    inventory: 50
  }
];