<script lang="ts">
  import { getRandomWord } from './game/words';
  import Title from './components/Title.svelte';
  import Board from './components/Board.svelte';
    import Keyboard from './components/Keyboard.svelte';

  let word: string;
  let start: boolean = false;

  const maxAttempts = 5;
  let actualAtempt: string = "";
  let attempts: string[] = [];

  function  startGame() {
    word = getRandomWord();
    console.log('palavra', word)
    start = true;
  }
</script>

<main>
  <div class="w-full h-screen flex items-center justify-center bg-gray-500">
    {#if start}
      {#each attempts as attempt}
        <Board secretWork={word} word={attempt} />
      {/each}

      <Keyboard />
    {:else}
      <Title onStart={startGame} />
    {/if}
  </div>
  
</main>
