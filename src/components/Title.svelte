<script lang="ts">
  export let onStart: () => void;
</script>

<div class="text-center">
    <h1>Wordle</h1>
    <h2>Get 6 chances to guess a 5-letter word.</h2>
    <button on:click={onStart} class="bg-blue-900 text-white rounded px-4 py-2 hover:bg-blue-950">
        Play
    </button>
</div>