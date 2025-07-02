<script lang="ts">
    export let success: boolean = false;
    export let word: string = "";
    export let onClose = () => {};

    function modalColor(): string {
        if (success) return "text-green-600";
        return "text-red-600";
    }
</script>

<!-- Overlay escuro -->
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<!-- Modal -->
<div class="bg-white rounded-lg shadow-lg p-6 w-96 text-center animate-fade-in">
    <h2 class="text-2xl font-bold {modalColor()} mb-4">Wordle</h2>
    {#if success}
        <p class="text-gray-700 mb-6">Você conseguiu. Parabéns. <br />
            A palavra era: <b>{word}</b>
        </p>
    {:else}
        <p class="text-gray-700 mb-6">Você fracassou. <br />
            A palavra era: <b>{word}</b>
        </p>
    {/if}
    <button on:click={onClose}
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
        Fechar
    </button>
</div>
</div>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }
</style>
