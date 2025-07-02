<script lang="ts">
    export let addLetter: (letter: string) => void;
    
    let letters: string[] = [
        "A", "B", "C", "D", "E", "F", "G", "H","I","J", "K", "L", "M", "N",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ç", "Enter", "Del"
    ]
</script>

<div class="grid grid-cols-10 gap-1 ">
    {#each letters as letter}
        <button class="p-2 bg-blue-200 rounded text-center cursor-pointer hover:bg-blue-400"
            on:click={() => addLetter(letter)}>
            {letter}
        </button>
    {/each}
</div>