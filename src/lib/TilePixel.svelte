<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let readonly = false;
    export let color

    function onClick(e) {
        dispatch('click');
    }
</script>

<span style="background-color: {color}" class="inline-block flex-grow outline-2 outline-black {readonly ? '' : 'hover:brightness-75'}" on:click={onClick}></span>

