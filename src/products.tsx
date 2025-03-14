// products.ts
export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    isFavorite?: boolean;
  };
  
  // products.ts
  export const products: Product[] = [
    { 
      id: 1, 
      name: 'Product 1', 
      price: 9.97, 
      description: 'This is product 1', 
      imageUrl: 'https://images.vintagebrand.com/pi?p=MD112-R_ROYAL_Front&geom=553%2C817%2C1190%2C803%2C536%2C1167%2C1207%2C1173&meshType=flat&h=600&a=9dd3041f239bfbf7d404256f09e3f4e7%240.5413884670484232%2C0.2878912789481027%2C-0.30973451327433627%2C-0.1498319327731092%2C0' 
    },
    { 
      id: 2, 
      name: 'Product 2', 
      price: 19.98, 
      description: 'This is product 2',
      imageUrl: 'https://fanatics.frgimages.com/seattle-seahawks/mens-mitchell-and-ness-steve-largent-white-seattle-seahawks-legacy-replica-jersey_pi3610000_ff_3610466-df26d88aaa6dbca87300_full.jpg?_hv=2&w=600' 
    },
    { 
      id: 3, 
      name: 'Product 3', 
      price: 29.99, 
      description: 'This is product 3',
      imageUrl: 'https://fanatics.frgimages.com/seattle-seahawks/mens-starter-college-navy/neon-green-seattle-seahawks-enforcer-satin-varsity-full-snap-jacket_pi3980000_altimages_ff_3980485-5c7e0933eb3c974f346aalt5_full.jpg?_hv=2&w=900' 
    },
    { 
      id: 4, 
      name: 'Keychain', 
      price: 5.57, 
      description: 'A high-quality keychain with a sleek design.', 
      imageUrl: 'https://images.jewelers.services/qgrepo/GM28528-SEA.jpg?w=566&h=566' 
    }
  ];
  