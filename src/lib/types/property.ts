import type { PricingOption } from '$lib/api/apiAccommodation';

export interface SearchProperty extends Property {
  totalPrice: number;
  unitPrice: number;
}

export interface Property {
  id: string;
  name: string | null;
  location: string;
  amenities: string[];
  photos: string[];
  minGuests: number;
  maxGuests: number;
  pricingOption: PricingOption;
}

export interface PropertyForm {
  name: string;
  location: string;
  amenities: string;
  photos: string[];
  minGuests: string;
  maxGuests: string;
  pricingOption: PricingOption;
  [key: string]: string | number | string[] | PricingOption;
}
