<script lang="ts">
    import Tile from "./Tile.svelte";
    import Keyboard from "./Keyboard.svelte";
    
    export let word: string = "";

    let [l1, l2, l3, l4, l5] = word;
</script>

<div class="flex">
    <Tile letter={l1} />
    <Tile letter={l2} />
    <Tile letter={l3} />
    <Tile letter={l4} />
    <Tile letter={l5} />
</div>

<Keyboard />