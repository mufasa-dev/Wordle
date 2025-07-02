<script lang="ts">
  import { getRandomWord } from '../game/words';
  import Title from './Title.svelte';
  import Board from './Board.svelte';
  import Keyboard from './Keyboard.svelte';
  import ResultModal from './ResultModal.svelte';

  let word: string;
  let start: boolean = false;
  let finish: boolean = false;
  let finishSuccess: boolean = false;
  let selectedIndex: number = 0;

  let actualAtempt: number = 0;
  let attempts: string[] = [];

  function  startGame() {
    word = getRandomWord();
    console.log('palavra', word)
    attempts = [
      "_____",
      "_____",
      "_____",
      "_____",
      "_____",
      "_____"
    ];
    start = true;
  }

  function selectIndex(index: number) {
    selectedIndex = index;
  }

  function addLetter(letter: string): void {
    if (finish) return;
    if (selectedIndex < 0 || selectedIndex >= word.length) {
      throw new Error('Índice fora do limite da string');
    }

    if (letter == "Enter") {
      nextAttempt();
      return;
    }
    if (letter == "Del") letter = "_";

    attempts[actualAtempt] = attempts[actualAtempt].slice(0, selectedIndex) + letter + attempts[actualAtempt].slice(selectedIndex + 1);
    if (selectedIndex < attempts[actualAtempt].length - 1) {
      selectedIndex++;
    }
  }
  
  function nextAttempt() {
    if (attempts[actualAtempt].includes("_")) return;

    if(attempts[actualAtempt].toUpperCase() == word.toUpperCase()) {
      finish = true;
      finishSuccess = true;
      return;
    }
    if (actualAtempt >= attempts.length - 1) {
      finish = true;
      finishSuccess = false;
      return;
    }
    
    selectedIndex = 0;
    actualAtempt++;
  }

  function restartGame() {
    finish = false;
    word = "";
    selectedIndex = 0;
    actualAtempt = 0;
    start = false;
    finishSuccess = false;
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

      {#if finish}
        <ResultModal word={word} success={finishSuccess} onClose={restartGame} />
      {/if}
    {:else}
      <Title onStart={startGame} />
    {/if}
  </div>
  
</main>
