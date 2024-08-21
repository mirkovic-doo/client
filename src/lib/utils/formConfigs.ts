import type { InputType } from 'flowbite-svelte/dist/types';

const defaultInputClass = 'mt-2 min-h-[10vh]';

export const CONFIG_TYPES: Record<string, string> = {
  INPUT: 'Input',
};

export type Config = {
  id: string;
  name: string;
  label: string;
  labelColor: 'red' | 'gray' | 'green' | 'disabled' | undefined;
  class: string;
  disabled: boolean;
  configType: string;
  type?: InputType;
  error?: string | null;
  color?: 'red' | 'green' | 'base' | undefined;
  placeholder?: string;
  validationKey?: string;
  icon?: string;
  required?: boolean;
  extenseClass?: string;
  index?: number;
  minValue?: string;
  imageKey?: string;
};

export const loginFormConfig: Config[] = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    color: 'base',
    label: 'Email',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
  {
    name: 'password',
    id: 'password',
    type: 'password',
    color: 'base',
    label: 'Password',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
];

export const userFormConfig: Config[] = [
  {
    name: 'fullName',
    id: 'fullName',
    type: 'text',
    color: 'base',
    label: 'Full name',
    labelColor: 'gray',
    disabled: false,
    class: `${defaultInputClass} w-full`,
    configType: CONFIG_TYPES.INPUT,
  },
];

export const signUpFormConfig: Config[] = [
  {
    name: 'email',
    id: 'email',
    type: 'email',
    color: 'base',
    label: 'Email',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
  {
    name: 'firstName',
    id: 'firstName',
    type: 'text',
    color: 'base',
    label: 'First Name',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
  {
    name: 'lastName',
    id: 'lastName',
    type: 'text',
    color: 'base',
    label: 'Last Name',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
  {
    name: 'country',
    id: 'country',
    type: 'text',
    color: 'base',
    label: 'Country',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
  {
    name: 'city',
    id: 'city',
    type: 'text',
    color: 'base',
    label: 'City',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
  {
    name: 'postCode',
    id: 'postCode',
    type: 'text',
    color: 'base',
    label: 'Post Code',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
  {
    name: 'street',
    id: 'street',
    type: 'text',
    color: 'base',
    label: 'Street',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
  {
    name: 'houseNumber',
    id: 'houseNumber',
    type: 'text',
    color: 'base',
    label: 'House Number',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
  {
    name: 'password',
    id: 'password',
    type: 'password',
    color: 'base',
    label: 'Password',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
  {
    name: 'confirmPassword',
    id: 'confirmPassword',
    type: 'password',
    color: 'base',
    label: 'Confirm password',
    labelColor: 'gray',
    disabled: false,
    class: defaultInputClass,
    configType: CONFIG_TYPES.INPUT,
  },
];
