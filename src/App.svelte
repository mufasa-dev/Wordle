<script lang="ts">
  import { getRandomWord } from './game/words';

  let word: string;
  let start: boolean = false;

  function  startGame() {
    word = getRandomWord();
    console.log('palavra', word)
    start = true;
  }
</script>

<main>
  <div class="w-full h-screen flex items-center justify-center bg-gray-500">
    {#if start}
      <div>
        <b>Palavra secreta: {word}</b>
      </div>
    {:else}
      <div class="text-center">
        <h1>Wordle</h1>
        <h2>Get 6 chances to guess a 5-letter word.</h2>
        <button on:click={startGame} class="bg-blue-900 text-white rounded px-4 py-2 hover:bg-blue-950">
          Play
        </button>
      </div>
    {/if}
  </div>
  
</main>
