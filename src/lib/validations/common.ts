import type { ZodIssue } from 'zod';

export const formatValidationErrors = (result: any) => {
  return result.error.flatten((result: ZodIssue) => ({
    message: result.message,
    field: result.path[result.path.length - 1],
  }));
};

export const ValidateField = (validationErrors: any, field: string): string | null => {
  if (validationErrors && Array.isArray(validationErrors)) {
    const arrayFieldError = validationErrors.find((o: any) => o.field === field);
    return arrayFieldError ? arrayFieldError.message : null;
  } else if (validationErrors) {
    const fieldError = validationErrors[field];
    return fieldError ? fieldError[0].message : null;
  }

  return null;
};

export const ValidateSingleFormField = (validationErrors: any, field: string): string | null => {
  if (validationErrors && validationErrors.fieldErrors[field]) {
    return validationErrors.fieldErrors[field][0].message;
  }
  return null;
};
