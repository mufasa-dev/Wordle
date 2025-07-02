<script lang="ts">
  import {
    word,
    start,
    finish,
    finishSuccess,
    selectedIndex,
    actualAtempt,
    attempts,
    startGame,
    selectIndex,
    addLetter,
    restartGame
  } from '../game/gameManager';

  import Title from './Title.svelte';
  import Board from './Board.svelte';
  import Keyboard from './Keyboard.svelte';
  import ResultModal from './ResultModal.svelte';

</script>

<main>
  <div class="w-full h-screen flex flex-col items-center justify-center bg-gray-500">
    {#if $start}
      <h1 class="text-center text-white text-5xl font-bold mb-2">Wordle</h1>
      {#each $attempts as attempt, i}
        <Board secretWork={$word} word={attempt} selectedIndex={$selectedIndex} selectIndex={selectIndex} isActual={$actualAtempt == i} />
      {/each}

      <Keyboard addLetter={addLetter} />

      {#if $finish}
        <ResultModal word={$word} success={$finishSuccess} onClose={restartGame} />
      {/if}
    {:else}
      <Title onStart={startGame} />
    {/if}
  </div>
  
</main>
