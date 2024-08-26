import { z } from 'zod';

export const propertyFormSchema = z
  .object({
    name: z.string().trim().nonempty({ message: 'Name is required.' }),
    location: z.string().trim().nonempty({ message: 'Location is required.' }),
    amenities: z.string().trim().nonempty({ message: 'Amenities are required.' }),
    minGuests: z
      .string()
      .refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: 'Minimum guests must be a number.',
      })
      .refine((val) => parseInt(val, 10) > 0, { message: 'Minimum guests must be greater than 0.' }),
    maxGuests: z
      .string()
      .refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: 'Maximum guests must be a number.',
      })
      .refine((val) => parseInt(val, 10) > 0, { message: 'Maximum guests must be greater than 0.' }),
  })
  .refine((data) => parseInt(data.minGuests, 10) <= parseInt(data.maxGuests, 10), {
    message: 'Minimum guests must be less than or equal to maximum guests.',
  });
