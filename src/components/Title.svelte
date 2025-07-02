<script lang="ts">
  export let onStart: () => void;
</script>

<div class="text-center">
    <h1 class="text-center text-white text-5xl font-bold">Wordle</h1>
    <h2 class="text-white text-2xl my-1">Get 6 chances to guess a 5-letter word.</h2>
    <button on:click={onStart} class="bg-blue-900 text-white rounded-full mt-2 px-10 py-2 hover:bg-blue-950">
        Play
    </button>
</div>