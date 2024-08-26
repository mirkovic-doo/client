import {
  PricingOption,
  type PropertyRequest,
  type PropertyResponse,
  type SearchPropertyResponse,
} from '$lib/api/apiAccommodation';
import type { Property, PropertyForm, SearchProperty } from '$lib/types/property';
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
    autoConfirmReservation: property.autoConfirmReservation ?? true,
  };
};

export const mapPropertyResponseToProperty = async (response: PropertyResponse): Promise<Property> => {
  const imagesUrls = await getImageUrlsFromNames(response.photos || []);
  return {
    id: response.id || '',
    name: response.name || null,
    location: response.location || '',
    amenities: response.amenities || [],
    photos: imagesUrls,
    minGuests: response.minGuests ?? 0,
    maxGuests: response.maxGuests ?? 0,
    pricingOption: response.pricingOption || PricingOption.PerUnit,
    autoConfirmReservation: response.autoConfirmReservation ?? true,
  };
};

export const mapPropertyResponseToPropertyForm = (response: PropertyResponse): PropertyForm => {
  return {
    amenities: response.amenities ? response.amenities.join(', ') : '',
    location: response.location ?? '',
    maxGuests: response.maxGuests ? response.maxGuests.toString() : '20',
    minGuests: response.minGuests ? response.minGuests.toString() : '1',
    name: response.name || '',
    photos: response.photos || [],
    pricingOption: response.pricingOption || PricingOption.PerUnit,
    autoConfirmReservation: response.autoConfirmReservation ?? true,
  };
};

export const mapPropertyFormToPropertyRequest = (form: PropertyForm): PropertyRequest => {
  return {
    amenities: form.amenities.split(',').map((amenity) => amenity.trim()),
    location: form.location,
    maxGuests: parseInt(form.maxGuests, 10),
    minGuests: parseInt(form.minGuests, 10),
    name: form.name,
    photos: form.photos,
    pricingOption: form.pricingOption,
    autoConfirmReservation: form.autoConfirmReservation,
  };
};
