<script lang="ts">
    import { EnumLetters, validateLetter } from "../game/gameManager";

    export let secretWork: string = "_____";
    export let word: string = "_____";
    export let selectedIndex: number = 0;
    export let isActual: boolean = false;

    export let selectIndex: (i: number) => void;

    function evaluateLetter(letter: string, index: number): string {
        const correctLetter = secretWork[index];
        if (letter == correctLetter) return "bg-green-500 text-white";
        if (secretWork.includes(letter)) return "bg-yellow-500 text-white";
        if (!isActual && letter != "_") return colorLetterByStatus(letter, index);
        return "bg-gray-200"
    }

    function evaluateIndex(index: number): string {
        if (isActual && index == selectedIndex) return "scale-110";
        return "";
    }

    function colorLetterByStatus(letter: string, index: number) {
        letter = letter.toUpperCase();
        const status = validateLetter(letter, index);
        if (status == EnumLetters.Correct) return "bg-green-500";
        if (status == EnumLetters.InAnotherPlace) return "bg-yellow-500";
        return "bg-gray-400"
    }
</script>

<div class="flex mb-2">
    {#each word.split("") as letter, i }
        <button class={`py-2 px-5 mr-1 border border-black rounded text-center cursor-pointer ${evaluateIndex(i)} ${evaluateLetter(letter, i)}`}
                on:click={() => selectIndex(i)} disabled={!isActual}>
            {letter}
        </button>
    {/each}
</div>