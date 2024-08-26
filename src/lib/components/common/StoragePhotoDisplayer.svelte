<script lang="ts">
  import { getFileStorageUrl } from '$lib/utils/file';
  import { Spinner } from 'flowbite-svelte';
  import { createEventDispatcher, onMount } from 'svelte';
  import { TrashCanSolid } from 'svelte-awesome-icons';

  export let photo: string;
  export let alt = 'alt_text';
  export let deletable = false;

  const dispatch = createEventDispatcher();

  let loading = true;
  let photoUrl: string | null = null;

  onMount(() => {
    getPhoto();
  });

  const getPhoto = async () => {
    loading = true;
    photoUrl = await getFileStorageUrl(photo);
    loading = false;
  };

  const handleDelete = () => {
    dispatch('delete');
  };
</script>

{#if loading}
  <div class="{$$restProps.class} flex items-center justify-center">
    <Spinner size="14" color="white" />
  </div>
{:else if deletable}
  <div class="relative">
    <button class="absolute top-2 right-2 bg-grayscale-800 text-white rounded-full p-2" on:click={handleDelete}>
      <TrashCanSolid size="16" class="focus:outline-none" />
    </button>
    <img src={photoUrl} {alt} class={$$restProps.class} />
  </div>
{:else}
  <img src={photoUrl} {alt} class={$$restProps.class} />
{/if}
