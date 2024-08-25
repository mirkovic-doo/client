import type { PricingOption } from '$lib/api/apiAccommodation';

export interface SearchProperty {
  id: string;
  name: string | null;
  location: string;
  amenities: string[];
  photos: string[];
  minGuests: number;
  maxGuests: number;
  pricingOption: PricingOption;
  totalPrice: number;
  unitPrice: number;
}
