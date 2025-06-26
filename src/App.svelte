<script lang="ts">
  import { getRandomWord } from './game/words';
  import Title from './components/Title.svelte';
  import Board from './components/Board.svelte';

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
      <Board word={word} />
    {:else}
      <Title onStart={startGame} />
    {/if}
  </div>
  
</main>
