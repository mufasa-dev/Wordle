<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { EnumLetters, validateKey, attempts, actualAtempt, word, moveCursorLeft, moveCursorRight, finish, restartGame } from "../game/gameManager";

    export let addLetter: (letter: string) => void;
    
    let letters: string[] = [
        "A", "B", "C", "D", "E", "F", "G", "H","I","J", "K", "L", "M", "N",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ç", "Enter", "Del"
    ];

    let keyColors: Record<string, string> = {}

    $: {
        const _ = $attempts + $word + $actualAtempt;
        const newColor: Record<string, string> = {};
        for (const letter of letters) {
        const status = validateKey(letter);
        if (status == EnumLetters.NotFound)
            newColor[letter] = "bg-blue-200 hover:bg-blue-400 opacity-40";
        else if (status == EnumLetters.Correct)
            newColor[letter] = "bg-green-200 hover:bg-green-400";
        else if (status == EnumLetters.InAnotherPlace)
            newColor[letter] = "bg-yellow-200 hover:bg-yellow-400";
        else
            newColor[letter] = "bg-blue-200 hover:bg-blue-400";
        }
        keyColors = newColor;
    }

    function handleKeydown(event: KeyboardEvent) {
        const key = event.key.toUpperCase();

        if ($finish) {
            if (key === 'ENTER') {
                restartGame();
            }
            return;
        }
        if (key === 'ENTER') {
            addLetter('Enter');
        } else if (key === 'BACKSPACE') {
            addLetter('Del');
        } else if (/^[A-ZÇ]$/.test(key)) {
            addLetter(key);
        } else if (key == 'ARROWLEFT') {
            moveCursorLeft();
        } else if (key == 'ARROWRIGHT') {
            moveCursorRight();
        } 
    }

    onMount(() => {
        window.addEventListener('keydown', handleKeydown);
    });

    onDestroy(() => {
        window.removeEventListener('keydown', handleKeydown);
    });
</script>

<div class="grid grid-cols-10 gap-1 ">
    {#each letters as letter}
        <button class="p-2 rounded text-center cursor-pointer {keyColors[letter]}"
            on:click={() => addLetter(letter)}>
            {letter}
        </button>
    {/each}
</div>