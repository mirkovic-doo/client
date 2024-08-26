<script lang="ts">
  import { uploadFileToStorage } from '$lib/utils/file';
  import { Spinner } from 'flowbite-svelte';
  import { createEventDispatcher } from 'svelte';

  export let multiple = false;
  export let autoUpload = false;
  const dispatch = createEventDispatcher();

  let files: FileList | null = null;
  let saving: boolean = false;

  async function handleUpload() {
    try {
      saving = true;
      if (files) {
        const imageNames: string[] = [];
        for (let i = 0; i < files.length; i++) {
          const imageName = await uploadFileToStorage(files[i]);
          imageNames.push(imageName);
        }
        dispatch('uploaded', imageNames);
      }
    } finally {
      saving = false;
      files = null;
      emptyFilesFromInput();
    }
  }

  const emptyFilesFromInput = () => {
    const target = document.getElementById('photo-input') as HTMLInputElement;
    target.files = null;
    target.value = '';
  };

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files !== null) {
      files = target.files;
      if (autoUpload) {
        handleUpload();
      }
    }
  };
</script>

<div class="flex gap-y-4 p-4 items-start w-[250px] {$$restProps.class}">
  <input
    type="file"
    id="photo-input"
    class="w-fit"
    on:change={handleChange}
    accept="image/png, image/jpeg"
    {multiple}
  />

  {#if !autoUpload}
    <div class="flex items-center gap-x-4 w-full">
      <button
        class="px-8 w-[110px] py-2 bg-orange-400 text-white rounded-sm disabled:bg-orange-900"
        on:click={handleUpload}
        disabled={saving}>Save</button
      >
      {#if saving}
        <Spinner color="white" size="8" />
      {/if}
    </div>
  {/if}
</div>
