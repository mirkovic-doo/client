<script lang="ts">
  export let rating = 0;
  export let maxStars = 5;
  export let readonly = false;

  let hoveredRating = 0;

  const setRating = (value: number) => {
    if (!readonly) {
      rating = value;
    }
  };

  const resetHover = () => {
    if (!readonly) {
      hoveredRating = 0;
    }
  };
</script>

<div class="flex items-center space-x-1" on:mouseleave={resetHover}>
  {#each Array(maxStars) as _, index}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <span
      class="text-4xl cursor-pointer transition-colors duration-300 {index < (hoveredRating || rating)
        ? 'text-yellow-400'
        : 'text-gray-300'} {readonly ? 'cursor-default' : ''}"
      on:click={() => setRating(index + 1)}
    >
      ★
    </span>
  {/each}
</div>
