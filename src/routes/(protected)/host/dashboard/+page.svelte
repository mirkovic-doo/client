<script lang="ts">
  import PhotoUpload from '$lib/components/common/PhotoUpload.svelte';
  import { getFileStorageUrl } from '$lib/utils/file';

  let imagesDownloadUrls: string[] = [];

  const handleUploaded = async (uploadedEvent: CustomEvent) => {
    const imageNames = uploadedEvent.detail;
    for (let i = 0; i < imageNames.length; i++) {
      const imageName = imageNames[i];
      const downloadUrl = await getFileStorageUrl(imageName);
      imagesDownloadUrls.push(downloadUrl);
    }
    imagesDownloadUrls = [...imagesDownloadUrls];
  };
</script>

<svelte:head>
  <title>Host Dashboard</title>
</svelte:head>

<div class="flex w-full items-center justify-center">
  <div class="mr-2 pb-1 text-2xl font-bold text-shiptest-midnight-black">Welcome to Host Dashboard</div>

  <PhotoUpload on:uploaded={handleUploaded} multiple={true} />
</div>

<div class="w-full flex flex-wrap gap-4">
  {#each imagesDownloadUrls as url}
    <img src={url} alt="uploaded" class="w-[200px] h-[200px]" />
  {/each}
</div>
