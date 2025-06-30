<script lang="ts">
    import Key from "./Key.svelte";
    
    let letters: string[] = [
        "A", "B", "C", "D", "E", "F", "G", "H","I","J", "K", "L", "M", "N",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "Ç", "Enter", "Del"
    ]
</script>

<div class="grid grid-cols-10 gap-1 ">
    {#each letters as letter}
        <Key letter={letter} />
    {/each}
</div>