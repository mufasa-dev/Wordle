<script lang="ts">
  import './styles/TailwindCSS.svelte'
  import { getRandomWord } from './game/words';

  let palavraSecreta: string;
  let start: boolean = false;


  function  startGame() {
    palavraSecreta = getRandomWord();
  }
</script>

<main>
  <button>
    Play
  </button>
</main>
