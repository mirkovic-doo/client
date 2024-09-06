<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { PricingOption } from '$lib/api/apiAccommodation';
  import api from '$lib/auth/http';
  import Input from '$lib/components/common/Input.svelte';
  import PhotoUpload from '$lib/components/common/PhotoUpload.svelte';
  import StoragePhotoDisplayer from '$lib/components/common/StoragePhotoDisplayer.svelte';
  import { mapPropertyFormToPropertyRequest, mapPropertyResponseToPropertyForm } from '$lib/mappers/property';
  import type { PropertyForm } from '$lib/types/property';
  import { propertyFormConfig } from '$lib/utils/formConfigs';
  import { formatValidationErrors, ValidateSingleFormField } from '$lib/validations/common';
  import { propertyFormSchema } from '$lib/validations/property';
  import { Checkbox, Radio } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';

  let id: string | null = $page.url?.searchParams.get('id') ?? null;

  let form: PropertyForm = {
    name: '',
    location: '',
    amenities: '',
    photos: [],
    pricingOption: PricingOption.PerGuest,
    minGuests: '1',
    maxGuests: '20',
    autoConfirmReservation: true,
  };

  let isSubmitting = false;
  let validationErrors: object | null = null;

  let formConfig = structuredClone(propertyFormConfig);

  onMount(async () => {
    if (id) {
      const response = await api.accommodationService.property.getProperty(id);
      form = mapPropertyResponseToPropertyForm(response.data);
    }
  });

  $: errorMessage = (field: string): string | null => {
    return ValidateSingleFormField(validationErrors, field);
  };

  const submit = async () => {
    isSubmitting = true;

    try {
      const result = propertyFormSchema.safeParse(form);
      validationErrors = result.success ? null : formatValidationErrors(result);
      if (validationErrors === null) {
        const request = mapPropertyFormToPropertyRequest(form);
        if (id) {
          await toast.promise(api.accommodationService.property.updateProperty({ ...request, id: id }), {
            loading: 'Updating property...',
            success: 'Successfully updated property',
            error: (e) => e.message,
          });
        } else {
          await toast.promise(api.accommodationService.property.createProperty(request), {
            loading: 'Creating property...',
            success: 'Successfully created property',
            error: (e) => e.message,
          });
        }

        goto('/host');
      }
    } finally {
      isSubmitting = false;
    }
  };

  const handleInputValidation = () => {
    const result = propertyFormSchema.safeParse(form);
    validationErrors = result.success ? null : formatValidationErrors(result);
  };

  const handleImagesUploaded = (uploadedImagesEvent: CustomEvent) => {
    form.photos = [...form.photos, ...uploadedImagesEvent.detail];
  };

  const handleRemovePhoto = (photo: string) => {
    form.photos = [...form.photos.filter((p) => p !== photo)];
  };
</script>

<div class="flex flex-col w-full h-full items-center justify-center mt-4">
  <form
    on:submit|preventDefault
    class="w-[70%] dark:text-black p-8 bg-white rounded-xl flex flex-col gap-2 overflow-y-auto"
  >
    <div class="text-2xl mx-auto font-bold text-black">{id ? 'Update property' : 'Add new property'}</div>

    <div class="dark:text-black flex flex-col gap-y-1 w-full">
      <div class="font-semibold text-xl">Property photos</div>
      <PhotoUpload multiple={true} autoUpload={true} on:uploaded={handleImagesUploaded} />
      <div class="flex flex-wrap gap-2 items-center">
        {#each form.photos as photo (photo)}
          <StoragePhotoDisplayer
            {photo}
            alt={photo}
            class="w-[300px] h-[200px] rounded-xl"
            deletable={true}
            on:delete={() => handleRemovePhoto(photo)}
          />
        {/each}
      </div>
    </div>

    <div class="grid gap-4 grid-cols-2">
      {#each formConfig as propertyConfig}
        <Input
          class="mt-2 min-h-[10vh]"
          id={propertyConfig.id}
          bind:value={form[propertyConfig.name]}
          on:input={handleInputValidation}
          on:enter={submit}
          placeholder={`${propertyConfig.placeholder ?? propertyConfig.label}`}
          labelClass={`${errorMessage(propertyConfig.name) !== null ? '!text-red-500' : '!text-light-black'} !mb-2`}
          error={errorMessage(propertyConfig.name)}
          label={propertyConfig.label}
          type={propertyConfig.type ?? 'text'}
          disabled={propertyConfig.disabled}
          iconType={propertyConfig.icon}
        />
      {/each}
      <div class="flex flex-row items-center">
        <div class="flex flex-col gap-1 my-auto w-full">
          <div class="text-black">Pricing option:</div>
          <div class="flex items-center gap-x-10">
            <Radio name="perGuest" value={PricingOption.PerGuest} bind:group={form.pricingOption} color="purple">
              <span class="text-light-black min-w-fit">Per guest</span>
            </Radio>
            <Radio
              name="perUnit"
              value={PricingOption.PerUnit}
              bind:group={form.pricingOption}
              color="purple"
              class="w-fit"
            >
              <span class="text-light-gray min-w-fit">Per unit</span>
            </Radio>
          </div>
        </div>
        <div class="flex flex-col gap-1 my-auto w-full">
          <div class="text-black">Auto confirm reservation:</div>
          <Checkbox bind:checked={form.autoConfirmReservation} color="purple" />
        </div>
      </div>
      {#if Number(form.minGuests) > Number(form.maxGuests)}
        <div>
          <span class="text-red-500">Min guests cannot be greater than max guests</span>
        </div>
      {/if}
    </div>
    <button
      type="submit"
      aria-disabled={validationErrors !== null || isSubmitting}
      disabled={validationErrors !== null || isSubmitting}
      class="mx-auto py-2 px-8 bg-grayscale-800 rounded-xl text-white w-fit"
      on:click={submit}
    >
      {id ? 'Update' : 'Create'}
    </button>
  </form>
</div>
