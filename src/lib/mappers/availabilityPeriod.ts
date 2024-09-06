import type { AvailabilityPeriodRequest, AvailabilityPeriodResponse } from '$lib/api/apiAccommodation';
import type { AvailabilityPeriod } from '$lib/types/availabilityPeriod';

export const mapAvailabilityPeriodResponseToAvailabilityPeriod = (
  response: AvailabilityPeriodResponse
): AvailabilityPeriod => {
  return {
    id: response.id ?? '',
    propertyId: response.propertyId ?? '',
    startDate: response.startDate ?? '',
    endDate: response.endDate ?? '',
    pricePerDay: response.pricePerDay ?? 100,
  } as AvailabilityPeriod;
};

export const mapAvailabilityPeriodToRequest = (period: AvailabilityPeriod): AvailabilityPeriodRequest => {
  return {
    endDate: period.endDate,
    pricePerDay: period.pricePerDay,
    propertyId: period.propertyId,
    startDate: period.startDate,
    id: period.id !== '' ? period.id : undefined,
  };
};
