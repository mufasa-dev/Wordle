<script lang="ts">
    import Keyboard from "./Keyboard.svelte";
    
    export let secretWork: string = "     ";
    export let word: string = "     ";

    function evaluateLetter(letter: string, index: number): string {
        const correctLetter = secretWork[index];
        if (letter == correctLetter) return "bg-green-500 text-white";
        if (secretWork.includes(letter)) return "bg-yellow-500 text-white";
        return "bg-gray-500"
    }
</script>

<div class="flex">
    {#each word.split("") as letter, i }
        <div class={`p-1 ${evaluateLetter(letter, i)}`}>
            {letter}
        </div>
    {/each}
</div>

<Keyboard />