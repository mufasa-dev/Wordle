<script lang="ts">
  import { language, startGame } from "../game/gameManager";
  import { translations } from '../i18n';

  $: t = translations[$language];

  const languages = [
    { code: 'en', label: 'English', flag: '/Wordle/flags/usa.png' },
    { code: 'pt', label: 'Português', flag: '/Wordle/flags/brasil.png' }
  ];

  let openDropLanguae: boolean = false;

  function selectLanguage(code: string) {
    language.set(code as 'pt' | 'en');
    openDropLanguae = false;
  }
</script>

<div class="text-center">
    <h1 class="text-center text-white text-5xl font-bold">{t.title}</h1>
    <h2 class="text-white text-2xl my-1">{t.subtitle}</h2>
    <div class="flex justify-center mt-2">
      <div class="relative w-40 mr-2">
        <button class="bg-white rounded-full w-full border p-2 px-4 flex items-center justify-between" 
          on:click={() => openDropLanguae = !openDropLanguae}>
          <img src={languages.find(l => l.code === $language)?.flag} alt="flag" class="w-5 h-5 mr-2" />
          <span>{languages.find(l => l.code === $language)?.label}</span>
          <svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
        </button>
  
        {#if openDropLanguae}
          <ul class="absolute w-full bg-white border mt-1 z-10 rounded">
            {#each languages as lang}
              <button
                class="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
                on:click={() => selectLanguage(lang.code)}
              >
                <img src={lang.flag} alt={lang.label} class="w-5 h-5 mr-2" />
                {lang.label}
              </button>
            {/each}
          </ul>
        {/if}
      </div>
      <button on:click={startGame} class="bg-blue-900 text-white rounded-full px-10 py-2 hover:bg-blue-950">
          {t.play}
      </button>
    </div>
</div>