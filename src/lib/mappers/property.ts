import { PricingOption, type SearchPropertyResponse } from '$lib/api/apiAccommodation';
import type { SearchProperty } from '$lib/types/property';
import { getImageUrlsFromNames } from '$lib/utils/file';

export const mapPropertyResponseToSearchProperty = async (
  property: SearchPropertyResponse
): Promise<SearchProperty> => {
  const imagesUrls = await getImageUrlsFromNames(property.photos || []);
  return {
    id: property.id || '',
    name: property.name || null,
    location: property.location || '',
    amenities: property.amenities || [],
    photos: imagesUrls,
    minGuests: property.minGuests ?? 0,
    maxGuests: property.maxGuests ?? 0,
    pricingOption: property.pricingOption || PricingOption.PerUnit,
    totalPrice: property.totalPrice || 0,
    unitPrice: property.unitPrice || 0,
  };
};
