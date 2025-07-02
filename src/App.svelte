<script lang="ts">
  import { getRandomWord } from './game/words';
  import Title from './components/Title.svelte';
  import Board from './components/Board.svelte';
    import Keyboard from './components/Keyboard.svelte';

  let word: string;
  let start: boolean = false;
  let selectedIndex: number = 0;

  const maxAttempts = 5;
  let actualAtempt: number = 0;
  let attempts: string[] = [
    "_____",
    "_____",
    "_____",
    "_____",
    "_____"
  ];

  function  startGame() {
    word = getRandomWord();
    console.log('palavra', word)
    start = true;
  }

  function selectIndex(index: number) {
    selectedIndex = index;
  }
</script>

<main>
  <div class="w-full h-screen flex flex-col items-center justify-center bg-gray-500">
    {#if start}
      <h1 class="text-center text-white text-5xl font-bold mb-2">Wordle</h1>
      {#each attempts as attempt, i}
        <Board secretWork={word} word={attempt} selectedIndex={selectedIndex} selectIndex={selectIndex} isActual={actualAtempt == i} />
      {/each}

      <Keyboard />
    {:else}
      <Title onStart={startGame} />
    {/if}
  </div>
  
</main>
