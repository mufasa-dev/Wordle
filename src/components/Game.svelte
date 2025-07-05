<script lang="ts">
  import {
    word,
    start,
    finish,
    finishSuccess,
    selectedIndex,
    actualAtempt,
    attempts,
    selectIndex,
    addLetter,
    restartGame,
    language
  } from '../game/gameManager';

  import Title from './Title.svelte';
  import Board from './Board.svelte';
  import Keyboard from './Keyboard.svelte';
  import ResultModal from './ResultModal.svelte';

  import { translations } from '../i18n';

  $: t = translations[$language];

</script>

<main>
  <div class="w-full h-screen flex flex-col items-center justify-center bg-gray-500">
    {#if $start}
      <h1 class="text-center text-white text-5xl font-bold mb-2">{t.title}</h1>
      {#each $attempts as attempt, i}
        <Board secretWork={$word} word={attempt} selectedIndex={$selectedIndex} selectIndex={selectIndex} isActual={$actualAtempt == i} />
      {/each}

      <Keyboard addLetter={addLetter} />

      {#if $finish}
        <ResultModal word={$word} success={$finishSuccess} onClose={restartGame} />
      {/if}
    {:else}
      <Title />
    {/if}
  </div>
  
</main>
