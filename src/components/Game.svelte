<script lang="ts">
  import { getRandomWord } from '../game/words';
  import Title from './Title.svelte';
  import Board from './Board.svelte';
  import Keyboard from './Keyboard.svelte';

  let word: string;
  let start: boolean = false;
  let selectedIndex: number = 0;

  let actualAtempt: number = 0;
  let attempts: string[] = [
    "_____",
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

  function addLetter(letter: string): void {
    if (selectedIndex < 0 || selectedIndex >= word.length) {
      throw new Error('Índice fora do limite da string');
    }

    if (letter == "Enter") return;
    if (letter == "Del") letter = "_";

    attempts[actualAtempt] = attempts[actualAtempt].slice(0, selectedIndex) + letter + attempts[actualAtempt].slice(selectedIndex + 1);
    if (selectedIndex < attempts[actualAtempt].length - 1) {
      selectedIndex++;
    }
  }
</script>

<main>
  <div class="w-full h-screen flex flex-col items-center justify-center bg-gray-500">
    {#if start}
      <h1 class="text-center text-white text-5xl font-bold mb-2">Wordle</h1>
      {#each attempts as attempt, i}
        <Board secretWork={word} word={attempt} selectedIndex={selectedIndex} selectIndex={selectIndex} isActual={actualAtempt == i} />
      {/each}

      <Keyboard addLetter={addLetter} />
    {:else}
      <Title onStart={startGame} />
    {/if}
  </div>
  
</main>
